<?php

    require("./classes/index.php");
    require("./src/index.php");
    require("./helpers/index.php");
    require("./shop.php");

    $cart = new Cart;
    $products = new Products;
    $users = new Users;

    loadMenu($products, $users, $cart);

?>