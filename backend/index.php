<?php
/**
 * Timray Concept - Backend API Entry Point
 * Main router for all API requests
 */

require_once 'config/database.php';

// Set JSON response header
header('Content-Type: application/json');

// Enable CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Get request method and URI
$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

// Simple routing
$endpoint = isset($uri[2]) ? $uri[2] : '';
$action = isset($uri[3]) ? $uri[3] : '';

try {
    switch ($endpoint) {
        case 'products':
            require_once 'api/products/index.php';
            break;
            
        case 'auth':
            require_once 'api/auth/index.php';
            break;
            
        case 'cart':
            require_once 'api/cart/index.php';
            break;
            
        case 'orders':
            require_once 'api/orders/index.php';
            break;
            
        case 'test':
            // Database connection test
            $database = new Database();
            $result = $database->testConnection();
            echo json_encode($result);
            break;
            
        case 'health':
            // Health check endpoint
            echo json_encode([
                'status' => 'success',
                'message' => 'Timray Concept API is running',
                'timestamp' => date('Y-m-d H:i:s'),
                'version' => '1.0.0'
            ]);
            break;
            
        default:
            // API documentation
            echo json_encode([
                'name' => 'Timray Concept API',
                'version' => '1.0.0',
                'description' => 'Backend API for Timray Concept e-commerce platform',
                'endpoints' => [
                    '/products' => 'Product management',
                    '/auth' => 'Authentication',
                    '/cart' => 'Shopping cart',
                    '/orders' => 'Order management',
                    '/test' => 'Database connection test',
                    '/health' => 'API health check'
                ],
                'methods' => ['GET', 'POST', 'PUT', 'DELETE'],
                'timestamp' => date('Y-m-d H:i:s')
            ]);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Internal server error',
        'error' => $e->getMessage()
    ]);
}
?>