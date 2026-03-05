<?php
/**
 * Authentication API Endpoint
 * Handle user authentication and authorization
 */

require_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'POST':
        $action = isset($_GET['action']) ? $_GET['action'] : 'login';
        
        switch ($action) {
            case 'login':
                handleLogin($db, $input);
                break;
            case 'register':
                handleRegister($db, $input);
                break;
            case 'logout':
                handleLogout();
                break;
            case 'verify':
                handleVerifyToken($db, $input);
                break;
            default:
                http_response_code(400);
                echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
                break;
        }
        break;
        
    case 'GET':
        handleGetUser($db);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
        break;
}

/**
 * Handle user login
 */
function handleLogin($db, $input) {
    try {
        if (!$input || !isset($input['email']) || !isset($input['password'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Email and password are required']);
            return;
        }

        $query = "SELECT id, name, email, password, role FROM users WHERE email = :email";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':email', $input['email']);
        $stmt->execute();
        
        $user = $stmt->fetch();
        
        if ($user && password_verify($input['password'], $user['password'])) {
            // Generate JWT token (simplified version)
            $token = generateToken($user['id'], $user['email'], $user['role']);
            
            // Update last login
            $updateQuery = "UPDATE users SET updated_at = NOW() WHERE id = :id";
            $updateStmt = $db->prepare($updateQuery);
            $updateStmt->bindParam(':id', $user['id']);
            $updateStmt->execute();
            
            echo json_encode([
                'status' => 'success',
                'message' => 'Login successful',
                'user' => [
                    'id' => $user['id'],
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'role' => $user['role']
                ],
                'token' => $token
            ]);
        } else {
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'Invalid credentials']);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}

/**
 * Handle user registration
 */
function handleRegister($db, $input) {
    try {
        if (!$input || !isset($input['email']) || !isset($input['password']) || !isset($input['name'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Name, email and password are required']);
            return;
        }

        // Check if user already exists
        $checkQuery = "SELECT id FROM users WHERE email = :email";
        $checkStmt = $db->prepare($checkQuery);
        $checkStmt->bindParam(':email', $input['email']);
        $checkStmt->execute();
        
        if ($checkStmt->fetch()) {
            http_response_code(409);
            echo json_encode(['status' => 'error', 'message' => 'User already exists']);
            return;
        }

        // Validate password strength
        if (strlen($input['password']) < 6) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Password must be at least 6 characters']);
            return;
        }

        // Hash password
        $hashedPassword = password_hash($input['password'], PASSWORD_DEFAULT);
        
        // Insert new user
        $query = "INSERT INTO users (name, email, password, role) VALUES (:name, :email, :password, :role)";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':name', $input['name']);
        $stmt->bindParam(':email', $input['email']);
        $stmt->bindParam(':password', $hashedPassword);
        $role = isset($input['role']) ? $input['role'] : 'USER';
        $stmt->bindParam(':role', $role);
        
        if ($stmt->execute()) {
            $userId = $db->lastInsertId();
            $token = generateToken($userId, $input['email'], $role);
            
            echo json_encode([
                'status' => 'success',
                'message' => 'Registration successful',
                'user' => [
                    'id' => $userId,
                    'name' => $input['name'],
                    'email' => $input['email'],
                    'role' => $role
                ],
                'token' => $token
            ]);
        } else {
            throw new Exception('Failed to create user');
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}

/**
 * Handle logout
 */
function handleLogout() {
    // In a real implementation, you would invalidate the token
    echo json_encode([
        'status' => 'success',
        'message' => 'Logout successful'
    ]);
}

/**
 * Verify JWT token
 */
function handleVerifyToken($db, $input) {
    try {
        if (!$input || !isset($input['token'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Token is required']);
            return;
        }

        $decoded = verifyToken($input['token']);
        
        if ($decoded) {
            // Get fresh user data
            $query = "SELECT id, name, email, role FROM users WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $decoded['user_id']);
            $stmt->execute();
            
            $user = $stmt->fetch();
            
            if ($user) {
                echo json_encode([
                    'status' => 'success',
                    'valid' => true,
                    'user' => $user
                ]);
            } else {
                http_response_code(404);
                echo json_encode(['status' => 'error', 'message' => 'User not found']);
            }
        } else {
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'Invalid token']);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}

/**
 * Get current user info
 */
function handleGetUser($db) {
    try {
        $headers = getallheaders();
        $token = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : null;
        
        if (!$token) {
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'No token provided']);
            return;
        }

        $decoded = verifyToken($token);
        
        if ($decoded) {
            $query = "SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $decoded['user_id']);
            $stmt->execute();
            
            $user = $stmt->fetch();
            
            if ($user) {
                echo json_encode([
                    'status' => 'success',
                    'user' => $user
                ]);
            } else {
                http_response_code(404);
                echo json_encode(['status' => 'error', 'message' => 'User not found']);
            }
        } else {
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'Invalid token']);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}

/**
 * Generate JWT token (simplified)
 */
function generateToken($userId, $email, $role) {
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $payload = json_encode([
        'user_id' => $userId,
        'email' => $email,
        'role' => $role,
        'exp' => time() + (24 * 60 * 60) // 24 hours
    ]);
    
    $base64Header = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
    $base64Payload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
    
    $signature = hash_hmac('sha256', $base64Header . "." . $base64Payload, 'timray_secret_key', true);
    $base64Signature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    
    return $base64Header . "." . $base64Payload . "." . $base64Signature;
}

/**
 * Verify JWT token (simplified)
 */
function verifyToken($token) {
    $parts = explode('.', $token);
    
    if (count($parts) !== 3) {
        return false;
    }
    
    $header = base64_decode(str_replace(['-', '_'], ['+', '/'], $parts[0]));
    $payload = base64_decode(str_replace(['-', '_'], ['+', '/'], $parts[1]));
    $signature = $parts[2];
    
    $expectedSignature = hash_hmac('sha256', $parts[0] . "." . $parts[1], 'timray_secret_key', true);
    $expectedSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($expectedSignature));
    
    if ($signature !== $expectedSignature) {
        return false;
    }
    
    $payloadData = json_decode($payload, true);
    
    if ($payloadData['exp'] < time()) {
        return false;
    }
    
    return $payloadData;
}
?>