const { Product } = require("../classes");
const { userInput, displayFooter, isNumberValid, displayProductHeader } = require("../helpers");

const cartMenu = async (db, products, cart) => {

    let selection;

    do {

        console.log("- - - - - - - - - - - - - - - -");
        console.log(`${"| ".padEnd(11)}` + `${"Cart Menu".padEnd(18)}` + " |");
        console.log("- - - - - - - - - - - - - - - -");
        console.log("| 1.  | " + `${"View Cart".padEnd(21)}` + " |");
        console.log("| 2.  | " + `${"Add to Cart".padEnd(21)}` + " |");
        console.log("| 3.  | " + `${"Remove from Cart".padEnd(21)}` + " |");
        console.log("| 4.  | " + `${"Checkout".padEnd(21)}` + " |");
        console.log("- - - - - - - - - - - - - - - -");
        console.log("| 0.  | " + `${"Return".padEnd(21)}` + " |");
        console.log("- - - - - - - - - - - - - - - -");
        console.log("\r");
        
        q = "[ Selection | 0-4 ]: ";
        selection = await userInput(q);

        console.log("\r");

        if (selection === "1") await viewCart(cart);
        else if (selection === "2") await addToCart(products, cart);
        else if (selection === "3") await removeFromCart(products, cart);
        else if (selection === "4") await checkOut(db, products, cart);

    } while (selection != "0");

}

const viewCart = async (cart) => {

    console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
    console.log("| " + `${"View Shopping Cart".padStart(39)}` + `${" |".padStart(24)}`);

    if (cart.products.length > 0) { 

        displayProductHeader();
        cart.calculate();
        cart.display();

        console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
        console.log("| " + `${"Sub-Total".padEnd(48)}` + " | $" + `${cart.sub_total.toFixed(2).padStart(9)}` + " |");
        console.log("| " + `${"Taxes".padEnd(48)}` + " | $" + `${cart.taxes.toFixed(2).padStart(9)}` + " |");
        console.log("| " + `${"Total".padEnd(48)}` + " | $" + `${cart.total.toFixed(2).padStart(9)}` + " |");
        console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");

        console.log("\r");

    } else {

        console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
        console.log("| " + `${"*** No Products in Cart ***".padStart(44)}` + `${" |".padStart(19)}`);
        console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
        console.log("\r");

    }

}

const addToCart = async (products, cart) => {
 
    let selection, index = -1, quantity;

    do {

        console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
        console.log("| " + `${"Add to Cart".padStart(36)}` + `${" |".padStart(27)}`);

        displayProductHeader();
        products.display();
        displayFooter();

        let max = products.findMax();

        q = `[ Selection | 0-${max} ]: `;
        selection = await userInput(q);

        console.log("\r");

        if (isNumberValid(selection)) index = products.verify(parseInt(selection));
        else index = -1;

        if (index !== -1) {

            if (products.items[index].quantity > 0) {

                quantity = -1;

                do {
                    
                    displayProductHeader();
                    products.items[index].display();
                    displayFooter();

                    q = `[ Quantity | 0-${products.items[index].quantity} ]: `;
                    quantity = await userInput(q);

                    console.log("\r");

                    if (isNumberValid(quantity)) quantity = parseInt(quantity);
                    else quantity = -1;

                    if (quantity === -1 || quantity > products.items[index].quantity) { console.log("Error: Invalid Input"); console.log("\r"); }

                } while (quantity < 0);

                if (quantity > 0 && quantity <= products.items[index].quantity) {

                    let cart_index = cart.verify(products.items[index].id);

                    if (cart_index === -1) {

                        let product = new Product(products.items[index].id, products.items[index].name, products.items[index].price, quantity);
                        products.items[index].quantity -= quantity;
                        cart.products.push(product);

                        console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
                        console.log("| " + `${"*** Added Product to Cart ***".padStart(45)}` + `${" |".padStart(18)}`);
                        console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
                        console.log("\r");

                    }

                    else if (cart_index !== -1) {

                        cart.products[cart_index].quantity += quantity;
                        products.items[index].quantity -= quantity;

                        console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
                        console.log("| " + `${"*** Added Product to EXISTING Cart Item ***".padStart(52)}` + `${" |".padStart(11)}`);
                        console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
                        console.log("\r");

                    }

                }

            }

        }
        
    } while (selection != "0");

}

const removeFromCart = async (products, cart) => {

    let selection, index = -1;

    do {
        
        console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
        console.log("| " + `${"Remove from Cart".padStart(38)}` + `${" |".padStart(25)}`);

        if (cart.products.length > 0) { displayProductHeader(); cart.display(); }
        else {

            console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
            console.log("| " + `${"*** No Products in Cart ***".padStart(44)}` + `${" |".padStart(19)}`);

        }

        displayFooter();

        let max = cart.findMax();

        q = `[ Selection | 0-${max} ]: `;
        selection = await userInput(q);

        console.log("\r");

        if (isNumberValid(selection)) index = cart.verify(parseInt(selection));
        else index = -1;

        if (index != -1) {

            displayProductHeader();
            cart.products[index].display();

            console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
            console.log("\r");

            console.log("- - - - - - - - - - - - - - - -");
            console.log(`${"| ".padEnd(11)}` + `${"Confirm ?"}` + `${" |".padStart(11)}`);
            console.log("- - - - - - - - - - - - - - - -");
            console.log("| 1.  | " + `${"Remove Product".padEnd(21)}` + " |");
            console.log("| 0.  | " + `${"Return".padEnd(21)}` + " |");
            console.log("- - - - - - - - - - - - - - - -");
            console.log("\r");

            q = "[ Confirm | 0-1 ]: ";
            let confirm = await userInput(q);

            console.log("\r");

            if (confirm === "1") {

                let product_index = products.verify(parseInt(selection));

                if (cart.products[index].id === products.items[product_index].id) {

                    products.items[product_index].quantity += cart.products[index].quantity;
                    cart.products.splice(index, 1);

                }

            }

        }

    } while (selection != "0");

}

const checkOut = async (db, products, cart) => {

    console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
    console.log("| " + `${"Checkout".padStart(35)}` + `${" |".padStart(28)}`);
    console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");

    if (cart.products.length > 0) {

        await cart.sortById();
        await cart.calculate();
        await cart.printReceipt();

        for (let i = 0; i < cart.products.length; i++) for (let j = 0; j < products.items.length; j++) {

            if (cart.products[i].id === products.items[j].id) await products.queryProducts(db, products.items[j], 5);

        }

        cart.products = [];
        await products.reWriteProducts();

        console.log("| " + `${"*** Receipt printed to ./receipt.txt"}` + `${" |".padStart(27)}`);
        console.log("| " + `${"*** MySQL database updated quantity for products"}` + `${" |".padStart(15)}`);
        console.log("| " + `${"*** products.txt updated to reflect changes to database"}` + `${" |".padStart(8)}`);
        console.log("| " + `${"*** Cart cleared of all products"}` + `${" |".padStart(31)}`);
        console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
        console.log("\r");

    } else {

        console.log("| " + `${"*** No Products in Cart ***".padStart(44)}` + `${" |".padStart(19)}`);
        console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
        console.log("\r");

    }

}

module.exports = cartMenu;