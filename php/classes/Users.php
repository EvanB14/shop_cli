<?php

    class User {

        public $id, $name, $email, $password;

    }

    class Users {

        public $items = array();

        function queryUsers($user, $type) {

            $db = mysqli_connect('localhost','root','','shopping_cli');

            if ($type === 1) { $sql = "SELECT * FROM users"; $results = $db->query($sql); }
            if ($type === 2) { $sql = "SELECT * FROM users WHERE id=" . "$user->id"; $results = $db->query($sql); }

            mysqli_close($db);
            
            return $results;

        }

        function verifyUser($username) {

            $index = -1; 
            $sql_id = -1;

            for ($i = 0; $i < sizeof($this->items); $i++) if ($username === $this->items[$i]->name) $index = $i;

            if ($index !== -1) { 
                
                $results = $this->queryUsers($this->items[$index], 2);
                foreach ($results as $result) if ($result['id'] === $this->items[$index]->id) $sql_id = $result['id'];
            
            }

            return [ $index, $sql_id ];

        }

    }

?>