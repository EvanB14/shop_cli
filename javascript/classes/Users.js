const fs = require("fs");

class User {

    constructor(id, name, email, password) {

        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;

    }

}

class Users {

    items = [];

    queryUsers = async (db, user, type) => {

        var input;

        switch (type) {
            case 1: input = `SELECT * from users`; break;
            case 2: input = `SELECT * from users WHERE id=${user.id}`; break;
            case 3: input = `DELETE from users WHERE id=${user.id}`; break;
            case 4: input = `INSERT INTO users (name, email, password) VALUES ('${user.name}', '${user.email}', '${user.password}')`; break;
            case 5: input = `UPDATE users SET name='${user.name}', email=${user.email}, password=${user.password} WHERE id=${user.id}`; break;
        }

        let [ results, info] = await db.query(input);
        return results;

    }

    resetUsers = async (db) => {

        var input;

        // Nuke the table
        input = "DROP TABLE users";
        await db.query(input);

        // Recreate it
        input = "CREATE TABLE users (id INTEGER AUTO_INCREMENT PRIMARY KEY,name VARCHAR(30),email VARCHAR(50),password VARCHAR(255));"
        await db.query(input);

        this.items = [];

    }

    seedUsers = async (db, type) => {

        let txt_file;

        await this.resetUsers(db);

        if (type === 1) txt_file = "../users.txt";
        else if (type === 2) txt_file = "../database/backup_users.txt";

        let file = fs.readFileSync(txt_file).toString().split("\n");

        for (let i = 0; i < file.length; i++) {

            let userId = file[i].split(",")[0];
            userId = parseInt(userId);

            let userName = file[i].split(",")[1];
            let userEmail = file[i].split(",")[2];

            let userPassword = file[i].split(",")[3];
            userPassword = userPassword.replace(/(\r\n|\n|\r)/gm, "");

            let user = new User(userId, userName, userEmail, userPassword);
            this.items.push(user);

        }

        for (let i = 0; i < this.items.length; i++) await this.queryUsers(db, this.items[i], 4);

    }

    verifyUser = async (db, user) => {

        let index = -1, sql_id = -1;

        for (let i = 0; i < this.items.length; i++) if (user === this.items[i].name) index = i;

        if (index !== -1) {

            let results = await this.queryUsers(db, this.items[index], 2);
            sql_id = results[0].id;

        }

        return [ index, sql_id ];

    }

    async verifyLogin(db, user) {

        let results = await this.queryUsers(db, user, 2);

        if (results[0].password === user.password) return 1;
        else return 0;

    }

}

module.exports = { User, Users }