const fs = require("fs");

class Cart {

    constructor() {

        this.products = [];
        this.sub_total = 0;
        this.taxes = 0;
        this.total = 0;

    }

    display = () => { for (let i = 0; i < this.products.length; i++) this.products[i].display();  }
    verify = (id) => { let index = -1; for (let i = 0; i< this.products.length; i++) if (this.products[i].id === id) index = i; return index; }
    findMax = () => { let max = 0; for (let i = 0; i< this.products.length; i++) max = this.products[i].id > max ? this.products[i].id : max; return max; }
    
    sortById = async () => {

        for (let i = this.products.length - 1; i > 0; i--) for (let j = 0; j < i; j++) {

            if (this.products[j].id > this.products[j + 1].id) {
                    
                let temp = this.products[j];
                this.products[j] = this.products[j + 1];
                this.products[j + 1] = temp;
    
            }
    
        }

    }

    calculate = () => {

        this.sub_total = 0;
        this.taxes = 0;
        this.total = 0;

        for (let i = 0; i < this.products.length; i++) this.sub_total += parseFloat(this.products[i].price);

        this.taxes = this.sub_total * 0.13;
        this.total = this.sub_total + this.taxes;

    }

    printReceipt = () => {

        let file = "../receipt.txt";

        fs.writeFileSync(file, "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n");
        fs.appendFileSync(file, "| " +  `${"*** Receipt ***".padStart(38)}` + `${" |".padStart(25)}` + "\n");
        fs.appendFileSync(file, "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n");
        fs.appendFileSync(file, `| ${"ID".padEnd(4)} | ${"Product Name".padEnd(30)} | ${"Quantity".padEnd(8)} | ${"Price".padEnd(10)} |\n`);
        fs.appendFileSync(file, "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n");

        for (let i = 0; i < this.products.length; i++)
            fs.appendFileSync(file, `| ${this.products[i].id.toString().padEnd(4)} | ${this.products[i].name.padEnd(30)} | ${this.products[i].quantity.toString().padStart(8)} | $${this.products[i].price.toString().padStart(9)} |\n`);

        fs.appendFileSync(file, "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n");
        fs.appendFileSync(file, `| ${"Sub-Total".padEnd(48)} | $${this.sub_total.toFixed(2).toString().padStart(9)} |\n`);
        fs.appendFileSync(file, `| ${"Taxes".padEnd(48)} | $${this.taxes.toFixed(2).toString().padStart(9)} |\n`);
        fs.appendFileSync(file, "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n");
        fs.appendFileSync(file, `| ${"Total".padEnd(48)} | $${this.total.toFixed(2).toString().padStart(9)} |\n`);
        fs.appendFileSync(file, "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n");

        let date = new Date();

        fs,fs.appendFileSync(file, `| Printed: ${date.getDate().toString().padStart(2, "0")} / ${(date.getMonth() + 1).toString().padStart(2, "0")} / ${date.getFullYear()} - ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}` + `${" |".padStart(32)}\n`);
        fs.appendFileSync(file, "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");

    }

}

module.exports = Cart;