<?php

    $db = mysqli_connect('localhost','root','','shopping_cli');

    $sql = "SELECT * FROM products";
    $result = $db->query($sql);
    $errors = array();

    $result_length = mysqli_num_rows($result);

    foreach($result as $row) {

        print_r($row);

    }

?>