const { Product } = require("../classes");
const { userInput, displayProductHeader, displayFooter, isFloatValid, isNumberValid } = require("../helpers");

const productsMenu = async (db, products) => {

    let selection;

    do {

        console.log("- - - - - - - - - - - - - - - -");
        console.log(`${"| ".padEnd(10)}` + `${"Product Menu".padEnd(19)}` + " |");
        console.log("- - - - - - - - - - - - - - - -");
        console.log("| 1.  | " + `${"View Products".padEnd(21)}` + " |");
        console.log("| 2.  | " + `${"Add Products".padEnd(21)}` + " |");
        console.log("| 3.  | " + `${"Edit Products".padEnd(21)}` + " |");
        console.log("| 4.  | " + `${"Remove Products".padEnd(21)}` + " |");
        console.log("- - - - - - - - - - - - - - - -");
        console.log("| 0.  | " + `${"Return".padEnd(21)}` + " |");
        console.log("- - - - - - - - - - - - - - - -");
        console.log("\r");
        
        q = "[ Selection | 0-4 ]: ";
        selection = await userInput(q);

        console.log("\r");

        if (selection === "1") await viewProductsMenu(products);
        else if (selection === "2") await addProducts(db, products);
        else if (selection === "3") await editProducts(db, products);
        else if (selection === "4") await removeProducts(db, products);

    } while (selection != "0");

}

const viewProductsMenu = async (products) => {

    let selection;

    do {

        console.log("- - - - - - - - - - - - - - - -");
        console.log(`${"| ".padEnd(7)}` + `${"View Products Menu"}` + `${" |".padStart(6)}`);
        console.log("- - - - - - - - - - - - - - - -");
        console.log("| 1.  | " + `${"View All Products".padEnd(21)}` + " |");
        console.log("| 2.  | " + `${"View Product by Id".padEnd(21)}` + " |");
        console.log("| 3.  | " + `${"Sort Products".padEnd(21)}` + " |");
        console.log("- - - - - - - - - - - - - - - -");
        console.log("| 0.  | " + `${"Return".padEnd(21)}` + " |");
        console.log("- - - - - - - - - - - - - - - -");
        console.log("\r");
        
        q = "[ Selection | 0-3 ]: ";
        selection = await userInput(q);

        console.log("\r");

        if (selection === "1") await viewAllProducts(products);
        else if (selection === "2") await viewProductbyId(products);
        else if (selection === "3") await sortMenu(products);

    } while (selection != "0");

}

const viewAllProducts = async (products) => {

    console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
    console.log("| " + `${"View All Products".padStart(39)}` + `${" |".padStart(24)}`);
    
    displayProductHeader();
    products.display();

    console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
    console.log("\r");

}

const viewProductbyId = async (products) => {

    let selection, index = -1;

    do {

        console.log("- - - - - - - - - - - - - - - -");
        console.log(`${"| ".padEnd(7)}` + `${"View Product by Id"}` + `${" |".padStart(6)}`);
        console.log("- - - - - - - - - - - - - - - -");
        console.log("| 0.  | " + `${"Return".padEnd(21)}` + " |");
        console.log("- - - - - - - - - - - - - - - -");
        console.log("\r");
        
        let max = products.findMax();
        q = `[ Selection | 0-${max} ]: `;
        selection = await userInput(q);

        console.log("\r");

        if (isNumberValid(selection) && selection !== "0") selection = parseInt(selection);

        index = products.verify(selection);
        
        if (index > -1) {

            displayProductHeader();
            products.items[index].display();
        
            console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");

        } else console.log("Error: Invalid Input");

        console.log("\r");

    } while (selection != "0");

}

const sortMenu = async (products) => {

    let selection;

    do {

        console.log("- - - - - - - - - - - - - - - -");
        console.log(`${"| ".padEnd(7)}` + `${"Sort Products Menu"}` + `${" |".padStart(6)}`);
        console.log("- - - - - - - - - - - - - - - -");
        console.log("| 1.  | " + `${"Sort Alphabetically".padEnd(21)}` + " |");
        console.log("| 2.  | " + `${"Sort by Quantity".padEnd(21)}` + " |");
        console.log("| 3.  | " + `${"Sort by Price".padEnd(21)}` + " |");
        console.log("- - - - - - - - - - - - - - - -");
        console.log("| 0.  | " + `${"Return".padEnd(21)}` + " |");
        console.log("- - - - - - - - - - - - - - - -");
        console.log("\r");
        
        q = "[ Selection | 0-3 ]: ";
        selection = await userInput(q);

        console.log("\r");

        if (selection === "1") { products.sort(1); sortProductsDisplay(products, 1); }
        else if (selection === "2") {products.sort(2); sortProductsDisplay(products, 2); }
        else if (selection === "3") { products.sort(3); sortProductsDisplay(products, 3); }

        products.sort(0);

    } while (selection != "0");

}

const sortProductsDisplay = async (products, type) => {

    console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");

    switch (type) {

        case 1: console.log("| " + `${"Sort Products Alphabetically".padStart(45)}` + `${" |".padStart(18)}`); break;
        case 2: console.log("| " + `${"Sort Products by Quantity".padStart(43)}` + `${" |".padStart(20)}`); break;
        case 3: console.log("| " + `${"Sort Products by Price".padStart(42)}` + `${" |".padStart(21)}`); break;

    }

    displayProductHeader();
    products.display();

    console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
    console.log("\r");


}

const addProducts = async (db, products) => {

    let verify;

    do {

        verify = 0;

        console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
        console.log("| " + `${"Add to Products".padStart(39)}` + `${" |".padStart(24)}`);
        console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
        console.log("\r");

        let product = new Product;

        product.id = products.findMax() + 1;

        q = "[ Enter Product Name ]     : ";
        selection = await userInput(q);

        product.name = selection;

        q = "[ Enter Product Price ]    : ";
        selection = await userInput(q);

        if(isFloatValid(selection)) { product.price = parseFloat(selection); verify++ }
        
        q = "[ Enter Product Quantity ] : ";
        selection = await userInput(q);

        if(isNumberValid(selection)) { product.quantity = parseInt(selection); verify++ }

        console.log("\r");

        if (verify === 2) {

            products.writeProduct(db, product);

            displayProductHeader();
            product.display();

            console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
            console.log("| " + `${"*** Added to Products ***".padStart(44)}` + `${" |".padStart(19)}`);
            console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
            console.log("\r");

            console.log("- - - - - - - - - - - - - - - -");
            console.log(`${"| ".padEnd(11)}` + `${"Continue ?"}` + `${" |".padStart(10)}`);
            console.log("- - - - - - - - - - - - - - - -");
            console.log("| 1.  | " + `${"Add Product".padEnd(21)}` + " |");
            console.log("| 0.  | " + `${"Return".padEnd(21)}` + " |");
            console.log("- - - - - - - - - - - - - - - -");
            console.log("\r");

            q = "[ Selection | 0-1 ]: ";
            selection = await userInput(q);

            if (selection === "1") verify = 0;

        } else { console.log("Error: Invalid Input"); verify = 0; }

        console.log("\r");

    } while (verify != 2);

}

const editProducts = async (db, products) => {

    let selection;

    do {

        console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
        console.log("| " + `${"Edit Products".padStart(37)}` + `${" |".padStart(26)}`);

        displayProductHeader();
        products.display();
        displayFooter();

        let max = products.findMax();
        q = `[ Selection | 0-${max} ]: `;
        selection = await userInput(q);

        console.log("\r");

        if(isNumberValid(selection)) { index = products.verify(parseInt(selection)); }

        if (index > -1) {

            let sub_select;

            do {

                let input;

                displayProductHeader();
                products.items[index].display();

                console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
                console.log("\r");

                console.log("- - - - - - - - - - - - - - - -");
                console.log(`${"| ".padEnd(9)}` + `${"Value to Edit"}` + `${" |".padStart(9)}`);
                console.log("- - - - - - - - - - - - - - - -");
                console.log("| 1.  | " + `${"Product Name".padEnd(21)}` + " |");
                console.log("| 2.  | " + `${"Product Quantity".padEnd(21)}` + " |");
                console.log("| 3.  | " + `${"Product Price".padEnd(21)}` + " |");
                console.log("- - - - - - - - - - - - - - - -");
                console.log("| 0.  | " + `${"Return".padEnd(21)}` + " |");
                console.log("- - - - - - - - - - - - - - - -");
                console.log("\r");

                q = `[ Selection | 0-3 ]: `;
                sub_select = await userInput(q);

                console.log("\r");

                if (sub_select === "1") {

                    q = `[ Edit Product Name ]: `;
                    input = await userInput(q);

                    console.log("\r");

                    products.items[index].name = input;
                    await products.queryProducts(db, products.items[index], 5);
                    await products.reWriteProducts();

                }

                else if (sub_select === "2") {

                    q = `[ Edit Product Quantity ]: `;
                    input = await userInput(q);

                    console.log("\r");

                    if (isNumberValid(input)) {

                        products.items[index].quantity = parseInt(input);
                        await products.queryProducts(db, products.items[index], 5);
                        await products.reWriteProducts();

                    } else { 
                        console.log("Error: Invalid Input");
                        console.log("\r");
                    }

                }

                else if (sub_select === "3") {

                    q = `[ Edit Product Price ]: `;
                    input = await userInput(q);

                    console.log("\r");

                    if (isFloatValid(input)) {

                        products.items[index].price = parseFloat(input);
                        await products.queryProducts(db, products.items[index], 5);
                        await products.reWriteProducts();

                    } else { 
                        console.log("Error: Invalid Input");
                        console.log("\r");
                    }

                }
                
            } while (sub_select != "0");

        }

    } while (selection != "0");

}

const removeProducts = async (db, products) => {

    let selection, index = -1;

    do {

        console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
        console.log("| " + `${"Remove from Products".padStart(41)}` + `${" |".padStart(22)}`);

        displayProductHeader();
        products.display();
        displayFooter();

        let max = products.findMax();
        q = `[ Selection | 0-${max} ]: `;
        selection = await userInput(q);

        console.log("\r");

        if(isNumberValid(selection)) { index = products.verify(parseInt(selection)); }

        if (index > -1) {

            displayProductHeader();
            products.items[index].display();

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
            selection = await userInput(q);

            console.log("\r");

            if (selection === "1") {

                products.items.splice(index, 1);

                await products.resetIndexes();
                await products.reWriteProducts();
                await products.seedProducts(db);

                console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
                console.log("| " + `${"*** Removed from Products ***".padStart(45)}` + `${" |".padStart(18)}`);
                console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
                console.log("\r");

            }

        }

    } while (selection != "0");

}

module.exports = productsMenu;