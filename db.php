<?php
$server ="localhost";
$username = "root";
$password = "";
$dbname = "facebook";

$conn = new mysqli($server, $username, $password, $dbname);

if($conn->connect_error){
    die(json_encode([
        "status" => "error",
        "message"=> "Database Connection Failed" . $conn->connect_error
    ]));
}

$conn->set_charset("utf8");
?>