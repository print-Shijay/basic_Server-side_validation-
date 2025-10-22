<?php
include("db.php");
header("Content-Type: application/json");

// Decode JSON input
$input = json_decode(file_get_contents("php://input"), true);

$usernameOrEmail = trim($input['usernameOrEmail'] ?? '');
$password = trim($input['password'] ?? '');

if (empty($usernameOrEmail) || empty($password)) {
    echo json_encode(["status" => "error", "message" => "Missing username or password."]);
    exit;
}

// Prevent SQL Injection (using prepared statements)
$sql = "SELECT * FROM Users WHERE Email = ? OR FirstName = ? LIMIT 1";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $usernameOrEmail, $usernameOrEmail);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    // Verify hashed password
    if (password_verify($password, $user['Password'])) {
        echo json_encode(["status" => "success", "message" => "Login successful."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid password."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "User not found."]);
}

$stmt->close();
$conn->close();
?>
