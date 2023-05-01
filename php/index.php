<?php

    require("./classes/index.php");
    require("./src/index.php");
    require("./helpers/index.php");
    require("./shop.php");

    $cart = new Cart;
    $products = new Products;

    $product = new Product;

    $product->id = 1;
    $product->name = "Test";
    $product->price = 19.99;
    $product->quantity = 2;

    array_push($products->items, $product);

    print_r($products);

    sqlTest();

?>