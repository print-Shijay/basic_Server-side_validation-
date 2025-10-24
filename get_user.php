<?php
session_start();
header("Content-Type: application/json");

if (isset($_SESSION['firstName']) && isset($_SESSION['lastName'])) {
    echo json_encode([
        "status" => "success",
        "firstName" => $_SESSION['firstName'],
        "lastName" => $_SESSION['lastName']
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "User not logged in"]);
}
?>
