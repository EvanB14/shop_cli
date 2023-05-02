const { Product, Products, User, Users, Cart } = require("./classes");
const { usersMenu, productsMenu, cartMenu } = require('./src');
const { userInput, isNumberValid } = require("./helpers");

//
// GENERAL FUNCTIONS
//

const initDB = async (db) => {

    let data;
    let products = new Products;
    let users = new Users;

    data = await products.queryProducts(db, 0, 1);
    
    for (i = 0; i < data.length; i++) {
        
        let product = new Product(data[i].id, data[i].name, data[i].price, data[i].quantity);
        products.items.push(product);
        
    }

    data = await users.queryUsers(db, 0, 1);

    for (i = 0; i < data.length; i++) { 

        let user = new User(data[i].id, data[i].name, data[i].email, data[i].password);
        users.items.push(user);

    }

    return [ products, users ];

}

//
// GENERAL MENUS
//

const loadMenu = async (db, products, users, cart) => {

    let selection, results;

    do {

        console.log("- - - - - - - - - - - - - - - -");
        console.log(`${"| ".padEnd(11)}` + `${"Load Menu".padEnd(18)}` + " |");
        console.log("- - - - - - - - - - - - - - - -");
        console.log("| 1.  | " + `${"Use Existing DB".padEnd(21)}` + " |");
        console.log("| 2.  | " + `${"Seed CURRENT .txt".padEnd(21)}` + " |");
        console.log("| 3.  | " + `${"Seed BACKUP .txt".padEnd(21)}` + " |");
        console.log("| 4.  | " + `${"Check tables".padEnd(21)}` + " |");
        console.log("| 5.  | " + `${"Delete tables".padEnd(21)}` + " |");
        console.log("- - - - - - - - - - - - - - - -");
        console.log("| 0.  | " + `${"Exit Program".padEnd(21)}` + " |");
        console.log("- - - - - - - - - - - - - - - -");
        console.log("\r");
        
        q = "[ Selection | 0-5 ]: ";
        selection = await userInput(q);

        console.log("\r");

        if (selection === "1") { [ products, users ] = await initDB(db); await loginMenu(db, products, users, cart); }
        else if (selection === "2") { await products.seedProducts(db, 1); await users.seedUsers(db, 1); await loginMenu(db, products, users, cart); }
        else if (selection === "3") { await products.seedProducts(db, 2); await users.seedUsers(db, 2); await loginMenu(db, products, users, cart); }

        else if (selection === "4") {

            results = await products.queryProducts(db, 0, 1); 
            console.table(results);
            console.log("\r");

            results = await users.queryUsers(db, 0, 1);
            console.table(results);
            console.log("\r");

        }
        
        else if (selection === "5") { await products.resetProducts(db); await users.resetUsers(db); }

    } while (selection != "0");

}

const loginMenu = async (db, products, users, cart) => {

    let selection, verify = 0, attempts = 0;

    do {

        console.log("- - - - - - - - - - - - - - - -");
        console.log(`${"| ".padEnd(13)}` + `${"Login".padEnd(16)}` + " |");
        console.log("- - - - - - - - - - - - - - - -");
        console.log("\r");
        
        q = "[ Username ]: ";
        selection = await userInput(q);
        
        let [ index, sql_id ] = await users.verifyUser(db, selection);

        if (index > -1 && sql_id > -1) {

            q = "[ Password ]: ";
            selection = await userInput(q);

            verify = await users.verifyLogin(db, users.items[index]);

        } else {
            console.log("\r");
            console.log("Error: Invalid Input\r"); 
        }

        console.log("\r");

        attempts++;

    } while (verify === 0 && attempts < 2);

    if (verify === 1) await shopMenu(db, products, users, cart);

}

const shopMenu = async (db, products, users, cart) => {

    let selection;

    do {

        console.log("- - - - - - - - - - - - - - - -");
        console.log(`${"| ".padEnd(11)}` + `${"Shop Menu".padEnd(18)}` + " |");
        console.log("- - - - - - - - - - - - - - - -");
        console.log("| 1.  | " + `${"User Menu".padEnd(21)}` + " |");
        console.log("| 2.  | " + `${"Product Menu".padEnd(21)}` + " |");
        console.log("| 3.  | " + `${"Cart Menu".padEnd(21)}` + " |");
        console.log("- - - - - - - - - - - - - - - -");
        console.log("| 0.  | " + `${"Return".padEnd(21)}` + " |");
        console.log("- - - - - - - - - - - - - - - -");
        console.log("\r");
        
        q = "[ Selection | 0-3 ]: ";
        selection = await userInput(q);

        console.log("\r");

        if (selection === "1") await usersMenu(users);
        else if (selection === "2") await productsMenu(db, products);
        else if (selection === "3") await cartMenu(db, products, cart);

    } while (selection != "0");

}

module.exports = {
    loadMenu
}