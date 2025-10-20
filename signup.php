<?php
    header("Content-Type: application/json");

    $input = json_decode(file_get_contents("php://input"), true);

    $firstname = trim($input['firstName'] ?? '');
    $lastname = trim($input['lastName'] ?? '');
    $email = trim($input['email'] ?? '');
    $password = trim($input['password']?? '');

    $errors = [];

    
?>