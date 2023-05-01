const { User } = require("../classes");
const { userInput, isEmailValid } = require("../helpers");

const usersMenu = async (users) => {

    let selection;

    do {

        console.log("- - - - - - - - - - - - - - - -");
        console.log(`${"| ".padEnd(11)}` + `${"User Menu".padEnd(18)}` + " |");
        console.log("- - - - - - - - - - - - - - - -");
        console.log("| 1.  | " + `${"View Users".padEnd(21)}` + " |");
        console.log("| 2.  | " + `${"Add Users".padEnd(21)}` + " |");
        console.log("| 3.  | " + `${"Edit Users".padEnd(21)}` + " |");
        console.log("| 4.  | " + `${"Remove Users".padEnd(21)}` + " |");
        console.log("- - - - - - - - - - - - - - - -");
        console.log("| 0.  | " + `${"Return".padEnd(21)}` + " |");
        console.log("- - - - - - - - - - - - - - - -");
        console.log("\r");
        
        q = "[ Selection | 0-4 ]: ";
        selection = await userInput(q);

        console.log("\r");

        if (selection === "1") await viewUsers(users);
        else if (selection === "2") await addUsers(users);
        else if (selection === "3") await editUsers(users);
        else if (selection === "4") await removeUsers(users);

    } while (selection != "0");

}

const viewUsers = async () => {}

const addUsers = async () => {}

const editUsers = async () => {}

const removeUsers = async () => {}

module.exports = usersMenu;