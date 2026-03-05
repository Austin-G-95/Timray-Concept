<?php
/**
 * Cart API Endpoint
 * Handle shopping cart operations
 */

require_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

// Get user ID from token (simplified)
$userId = getUserIdFromToken();

switch ($method) {
    case 'GET':
        handleGetCart($db, $userId);
        break;
        
    case 'POST':
        handleAddToCart($db, $userId, $input);
        break;
        
    case 'PUT':
        handleUpdateCartItem($db, $userId, $input);
        break;
        
    case 'DELETE':
        handleRemoveFromCart($db, $userId, $input);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
        break;
}

/**
 * Get user's cart items
 */
function handleGetCart($db, $userId) {
    try {
        if (!$userId) {
            // Return session-based cart for guest users
            session_start();
            $cart = isset($_SESSION['cart']) ? $_SESSION['cart'] : [];
            echo json_encode([
                'status' => 'success',
                'data' => $cart,
                'total_items' => array_sum(array_column($cart, 'quantity')),
                'total_amount' => array_sum(array_map(function($item) {
                    return $item['price'] * $item['quantity'];
                }, $cart))
            ]);
            return;
        }

        $query = "SELECT c.*, p.name, p.image, p.price, p.stock 
                  FROM cart c 
                  JOIN products p ON c.product_id = p.id 
                  WHERE c.user_id = :user_id";
        
        $stmt = $db->prepare($query);
        $stmt->bindParam(':user_id', $userId);
        $stmt->execute();
        
        $cartItems = $stmt->fetchAll();
        
        $totalItems = 0;
        $totalAmount = 0;
        
        foreach ($cartItems as $item) {
            $totalItems += $item['quantity'];
            $totalAmount += $item['price'] * $item['quantity'];
        }
        
        echo json_encode([
            'status' => 'success',
            'data' => $cartItems,
            'total_items' => $totalItems,
            'total_amount' => $totalAmount
        ]);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}

/**
 * Add item to cart
 */
function handleAddToCart($db, $userId, $input) {
    try {
        if (!$input || !isset($input['product_id'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Product ID is required']);
            return;
        }

        $productId = $input['product_id'];
        $quantity = isset($input['quantity']) ? (int)$input['quantity'] : 1;

        if (!$userId) {
            // Handle session-based cart for guest users
            session_start();
            if (!isset($_SESSION['cart'])) {
                $_SESSION['cart'] = [];
            }
            
            // Get product details
            $productQuery = "SELECT id, name, price, image FROM products WHERE id = :id";
            $productStmt = $db->prepare($productQuery);
            $productStmt->bindParam(':id', $productId);
            $productStmt->execute();
            $product = $productStmt->fetch();
            
            if (!$product) {
                http_response_code(404);
                echo json_encode(['status' => 'error', 'message' => 'Product not found']);
                return;
            }
            
            $found = false;
            foreach ($_SESSION['cart'] as &$item) {
                if ($item['product_id'] == $productId) {
                    $item['quantity'] += $quantity;
                    $found = true;
                    break;
                }
            }
            
            if (!$found) {
                $_SESSION['cart'][] = [
                    'product_id' => $productId,
                    'name' => $product['name'],
                    'price' => $product['price'],
                    'image' => $product['image'],
                    'quantity' => $quantity
                ];
            }
            
            echo json_encode(['status' => 'success', 'message' => 'Item added to cart']);
            return;
        }

        // Check if item already exists in cart
        $checkQuery = "SELECT id, quantity FROM cart WHERE user_id = :user_id AND product_id = :product_id";
        $checkStmt = $db->prepare($checkQuery);
        $checkStmt->bindParam(':user_id', $userId);
        $checkStmt->bindParam(':product_id', $productId);
        $checkStmt->execute();
        
        $existingItem = $checkStmt->fetch();
        
        if ($existingItem) {
            // Update quantity
            $newQuantity = $existingItem['quantity'] + $quantity;
            $updateQuery = "UPDATE cart SET quantity = :quantity, updated_at = NOW() WHERE id = :id";
            $updateStmt = $db->prepare($updateQuery);
            $updateStmt->bindParam(':quantity', $newQuantity);
            $updateStmt->bindParam(':id', $existingItem['id']);
            $updateStmt->execute();
        } else {
            // Add new item
            $insertQuery = "INSERT INTO cart (user_id, product_id, quantity) VALUES (:user_id, :product_id, :quantity)";
            $insertStmt = $db->prepare($insertQuery);
            $insertStmt->bindParam(':user_id', $userId);
            $insertStmt->bindParam(':product_id', $productId);
            $insertStmt->bindParam(':quantity', $quantity);
            $insertStmt->execute();
        }
        
        echo json_encode(['status' => 'success', 'message' => 'Item added to cart']);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}

/**
 * Update cart item quantity
 */
function handleUpdateCartItem($db, $userId, $input) {
    try {
        if (!$input || !isset($input['product_id']) || !isset($input['quantity'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Product ID and quantity are required']);
            return;
        }

        $productId = $input['product_id'];
        $quantity = (int)$input['quantity'];

        if (!$userId) {
            // Handle session-based cart
            session_start();
            if (isset($_SESSION['cart'])) {
                foreach ($_SESSION['cart'] as &$item) {
                    if ($item['product_id'] == $productId) {
                        if ($quantity <= 0) {
                            // Remove item
                            $_SESSION['cart'] = array_filter($_SESSION['cart'], function($cartItem) use ($productId) {
                                return $cartItem['product_id'] != $productId;
                            });
                        } else {
                            $item['quantity'] = $quantity;
                        }
                        break;
                    }
                }
            }
            echo json_encode(['status' => 'success', 'message' => 'Cart updated']);
            return;
        }

        if ($quantity <= 0) {
            // Remove item if quantity is 0 or less
            $deleteQuery = "DELETE FROM cart WHERE user_id = :user_id AND product_id = :product_id";
            $deleteStmt = $db->prepare($deleteQuery);
            $deleteStmt->bindParam(':user_id', $userId);
            $deleteStmt->bindParam(':product_id', $productId);
            $deleteStmt->execute();
        } else {
            // Update quantity
            $updateQuery = "UPDATE cart SET quantity = :quantity, updated_at = NOW() WHERE user_id = :user_id AND product_id = :product_id";
            $updateStmt = $db->prepare($updateQuery);
            $updateStmt->bindParam(':quantity', $quantity);
            $updateStmt->bindParam(':user_id', $userId);
            $updateStmt->bindParam(':product_id', $productId);
            $updateStmt->execute();
        }
        
        echo json_encode(['status' => 'success', 'message' => 'Cart updated']);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}

/**
 * Remove item from cart
 */
function handleRemoveFromCart($db, $userId, $input) {
    try {
        $productId = isset($input['product_id']) ? $input['product_id'] : (isset($_GET['product_id']) ? $_GET['product_id'] : null);
        
        if (!$productId) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Product ID is required']);
            return;
        }

        if (!$userId) {
            // Handle session-based cart
            session_start();
            if (isset($_SESSION['cart'])) {
                $_SESSION['cart'] = array_filter($_SESSION['cart'], function($item) use ($productId) {
                    return $item['product_id'] != $productId;
                });
                $_SESSION['cart'] = array_values($_SESSION['cart']); // Reindex array
            }
            echo json_encode(['status' => 'success', 'message' => 'Item removed from cart']);
            return;
        }

        $query = "DELETE FROM cart WHERE user_id = :user_id AND product_id = :product_id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':user_id', $userId);
        $stmt->bindParam(':product_id', $productId);
        
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Item removed from cart']);
        } else {
            throw new Exception('Failed to remove item from cart');
        }
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}

/**
 * Get user ID from JWT token (simplified)
 */
function getUserIdFromToken() {
    $headers = getallheaders();
    $token = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : null;
    
    if (!$token) {
        return null;
    }
    
    // Simple token verification (in production, use proper JWT library)
    $parts = explode('.', $token);
    if (count($parts) !== 3) {
        return null;
    }
    
    $payload = base64_decode(str_replace(['-', '_'], ['+', '/'], $parts[1]));
    $payloadData = json_decode($payload, true);
    
    if (!$payloadData || $payloadData['exp'] < time()) {
        return null;
    }
    
    return $payloadData['user_id'];
}
?>