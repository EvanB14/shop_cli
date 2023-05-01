const fs = require("fs");

class Product {

    constructor(id, name, price, quantity) {

        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;

    }

    display() {

        console.log("| " + `${this.id.toString().padEnd(4)}` + " | " + `${this.name.padEnd(30)}` + " | " + `${this.quantity.toString().padStart(8)}` + " | $" + `${parseFloat(this.price).toFixed(2).toString().padStart(9)}` +" |");

    }

}

class Products {

    items = [];

    // General Stuff

    display = () => { for (let i = 0; i < this.items.length; i++) this.items[i].display(); }
    resetIndexes = () => { for (let i = 0; i < this.items.length; i++) this.items[i].id = i + 1; }
    verify = (id) => { let index = -1; for (let i = 0; i< this.items.length; i++) if (this.items[i].id === id) index = i; return index; }
    findMax = () => { let max = 0; for (let i = 0; i< this.items.length; i++) max = this.items[i].id > max ? this.items[i].id : max; return max; }

    sort = (type) => {

        let temp = new Product;

        for (let i = this.items.length - 1; i > 0; i--) for (let j = 0; j < i; j++) {

            if (type === 0 && this.items[j].id > this.items[j + 1].id) { temp = this.items[j]; this.items[j] = this.items[j + 1]; this.items[j + 1] = temp; }
            else if (type === 1 && this.items[j].name > this.items[j + 1].name) { temp = this.items[j]; this.items[j] = this.items[j + 1]; this.items[j + 1] = temp; }
            else if (type === 2 && this.items[j].quantity < this.items[j + 1].quantity) { temp = this.items[j]; this.items[j] = this.items[j + 1]; this.items[j + 1] = temp; }
            else if (type === 3 && parseFloat(this.items[j].price) < parseFloat(this.items[j + 1].price)) { temp = this.items[j]; this.items[j] = this.items[j + 1]; this.items[j + 1] = temp; }

        }

    }

    // Databse Stuff

    queryProducts = async (db, product, type) => {
 
        var input;

        // SQL raw code: SELECT ALL, SELECY by ID, DELETE by ID, INSERT, UPDATE by ID
        switch (type) {
            case 1: input = `SELECT * from products`; break;
            case 2: input = `SELECT from products WHERE id=${product.id}`; break;
            case 3: input = `DELETE from products WHERE id=${product.id}`; break;
            case 4: input = `INSERT INTO products (name, price, quantity) VALUES ('${product.name}', ${product.price}, ${product.quantity})`; break;
            case 5: input = `UPDATE products SET name='${product.name}', price=${product.price}, quantity=${product.quantity} WHERE id=${product.id}`; break;
        }

        let [ results, info] = await db.query(input);
        return results;

    }

    // Full reset on products

    resetProducts = async (db) => {

        var input;

        // Nuke the table
        input = "DROP TABLE products";
        await db.query(input);

        // Recreate it
        input = "CREATE TABLE products (id INTEGER AUTO_INCREMENT PRIMARY KEY, name VARCHAR(30), price DECIMAL(6,2), quantity INTEGER);"
        await db.query(input);

        this.items = [];

    }

    // Seeds the products table from .txt

    seedProducts = async (db, type) => {

        await this.resetProducts(db);

        let txt_file;

        if (type === 1) txt_file = "../products.txt";
        else if (type === 2) txt_file = "../database/backup_products.txt";

        let file = fs.readFileSync(txt_file).toString().split("\n");

        for (let i = 0; i < file.length; i++) {

            let productId = file[i].split(",")[0];
            productId = parseInt(productId);

            let productName = file[i].split(",")[1];
        
            let productPrice = file[i].split(",")[2];
            productPrice = parseFloat(productPrice).toFixed(2)

            let productQuantity = file[i].split(",")[3];
            productQuantity = parseInt(productQuantity);

            let product = new Product(productId, productName, productPrice, productQuantity);
            this.items.push(product);

        }

        for (let i = 0; i < this.items.length; i++) await this.queryProducts(db, this.items[i], 4);

    }

    // File write functions

    writeProduct = async (db, product) => {

        let file = "../products.txt";

        this.items.push(product);

        fs.appendFileSync(file, `\n${product.id},${product.name},${product.price},${product.quantity}`);

        await this.queryProducts(db, product, 4);

    }

    reWriteProducts = async () => {

        let file = "../products.txt";
        fs.writeFileSync(file, "");

        for (let i = 0; i < this.items.length; i++) {

            fs.appendFileSync(file, `${this.items[i].id},${this.items[i].name},${this.items[i].price},${this.items[i].quantity}`);
            if (i != this.items.length - 1) fs.appendFileSync(file, "\n");

        }

    }

}

module.exports = {
    Product,
    Products
}