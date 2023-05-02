<?php

    function initDB() {

        $db = mysqli_connect('localhost','root','','shopping_cli');

        $sql = "SELECT * FROM products";
        $results = $db->query($sql);

        $products = new Products;

        foreach($results as $result) {

            $product = new Product;

            $product->id = $result['id'];
            $product->name = $result['name'];
            $product->price = $result['price'];
            $product->quantity = $result['quantity'];

            array_push($products->items, $product);

        }

        $sql = "SELECT * FROM users";
        $results = $db->query($sql);

        $users = new Users;

        foreach($results as $result) {

            $user = new User;

            $user->id = $result['id'];
            $user->name = $result['name'];
            $user->email = $result['email'];
            $user->password = $result['password'];

            array_push($users->items, $user);

        }

        mysqli_close($db);

        return [ $products, $users ];

    }

    function loadMenu($products, $users, $cart) {

        do {

            echo "- - - - - - - - - - - - - - - -\n";
            echo str_pad("| ", 11) . str_pad("Load Menu", 18) . " |\n";
            echo "- - - - - - - - - - - - - - - -\n";
            echo "| 1.  | " . str_pad("Use Existing DB", 21) . " |\n";
            echo "| 2.  | " . str_pad("Seed Current .txt", 21) . " |\n";
            echo "| 3.  | " . str_pad("Seed Backup .txt", 21) . " |\n";
            echo "| 4.  | " . str_pad("Check Tables", 21) . " |\n";
            echo "| 5.  | " . str_pad("Delete Tables", 21) . " |\n";
            echo "- - - - - - - - - - - - - - - -\n";
            echo "| 0.  | " . str_pad("Exit Program", 21) . " |\n";
            echo "- - - - - - - - - - - - - - - -\n";
            echo "\n";
            
            $selection = readline("[ Selection | 0-5 ]: ");

            echo "\n";

            if ($selection === "0") echo "Exiting Program";
            else if ($selection === "1") { [ $products, $users ] = initDB(); loginMenu($products, $users, $cart); }

        } while ($selection != "0");

    }

    function loginMenu($products, $users, $cart) {

        $verify = 0;

        do {

            echo "- - - - - - - - - - - - - - - -\n";
            echo str_pad("| ", 10) . str_pad("Login Menu", 19) . " |\n";
            echo "- - - - - - - - - - - - - - - -\n";
            echo "\n";

            $username = readline("[ Username ]: ");

            $users->verifyUser($username);

            $password = readline("[ Password ]: ");

            echo "\n";

        } while ($verify === 0);

    }

    function shopMenu($products, $users, $cart) {



    }

?>