<?php
include("db.php");
header("Content-Type: application/json");

// Get JSON input
$input = json_decode(file_get_contents("php://input"), true);


$firstName = htmlspecialchars(trim($input['firstName'] ?? ''), ENT_QUOTES, 'UTF-8');
$lastName = htmlspecialchars(trim($input['lastName'] ?? ''), ENT_QUOTES, 'UTF-8');
$email = filter_var(trim($input['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$password = trim($input['password'] ?? '');

$errors = [];

if (empty($errors)) {

    // Hash the password securely
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Check if email already exists
    $check = $conn->prepare("SELECT Email FROM users WHERE Email = ?");
    $check->bind_param("s", $email);
    $check->execute();
    $check->store_result();

    if ($check->num_rows > 0) {
        $errors['email'] = "Email already exists.";
        $check->close();
        echo json_encode(["status" => "error", "errors" => $errors]);
        $conn->close();
        exit();
    }
    $check->close();

    
    $sql = "INSERT INTO users (FirstName, LastName, Email, Password) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $firstName, $lastName, $email, $hashedPassword);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Signup successful!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Database error: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["status" => "error", "errors" => $errors]);
}

$conn->close();
?>
