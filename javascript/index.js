const mysql = require('mysql2/promise');
const { loadMenu } = require('./shop');
const { Products, Cart, Users } = require('./classes');

const main = async () => {

    const db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'shopping_cli' 
    }, 

    console.log("- - - - - - - - - - - - - - - -"),
    console.log(`${"| ".padEnd(5)}` + `${"Connected to Database"}` + `${" |".padStart(5)}`),
    console.log("- - - - - - - - - - - - - - - -"),
    console.log("\r")

    );

    var cart = new Cart;
    var products = new Products;
    var users = new Users;

    await loadMenu(db, products, users, cart);
    db.end();

    return process.exit();

}

main();