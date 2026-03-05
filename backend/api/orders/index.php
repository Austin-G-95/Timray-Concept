<?php
/**
 * Orders API Endpoint
 * Handle order management operations
 */

require_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

// Get user ID from token
$userId = getUserIdFromToken();

switch ($method) {
    case 'GET':
        handleGetOrders($db, $userId);
        break;
        
    case 'POST':
        handleCreateOrder($db, $userId, $input);
        break;
        
    case 'PUT':
        handleUpdateOrder($db, $userId, $input);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
        break;
}

/**
 * Get user orders or single order
 */
function handleGetOrders($db, $userId) {
    try {
        if (!$userId) {
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'Authentication required']);
            return;
        }

        $orderId = isset($_GET['id']) ? $_GET['id'] : null;
        
        if ($orderId) {
            // Get single order with items
            $orderQuery = "SELECT * FROM orders WHERE id = :id AND user_id = :user_id";
            $orderStmt = $db->prepare($orderQuery);
            $orderStmt->bindParam(':id', $orderId);
            $orderStmt->bindParam(':user_id', $userId);
            $orderStmt->execute();
            
            $order = $orderStmt->fetch();
            
            if (!$order) {
                http_response_code(404);
                echo json_encode(['status' => 'error', 'message' => 'Order not found']);
                return;
            }
            
            // Get order items
            $itemsQuery = "SELECT oi.*, p.name, p.image 
                          FROM order_items oi 
                          JOIN products p ON oi.product_id = p.id 
                          WHERE oi.order_id = :order_id";
            $itemsStmt = $db->prepare($itemsQuery);
            $itemsStmt->bindParam(':order_id', $orderId);
            $itemsStmt->execute();
            
            $order['items'] = $itemsStmt->fetchAll();
            
            echo json_encode(['status' => 'success', 'data' => $order]);
        } else {
            // Get all user orders
            $query = "SELECT o.*, COUNT(oi.id) as item_count 
                     FROM orders o 
                     LEFT JOIN order_items oi ON o.id = oi.order_id 
                     WHERE o.user_id = :user_id 
                     GROUP BY o.id 
                     ORDER BY o.created_at DESC";
            
            $stmt = $db->prepare($query);
            $stmt->bindParam(':user_id', $userId);
            $stmt->execute();
            
            $orders = $stmt->fetchAll();
            
            echo json_encode(['status' => 'success', 'data' => $orders]);
        }
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}

/**
 * Create new order
 */
function handleCreateOrder($db, $userId, $input) {
    try {
        if (!$userId) {
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'Authentication required']);
            return;
        }

        if (!$input || !isset($input['items']) || empty($input['items'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Order items are required']);
            return;
        }

        $db->beginTransaction();
        
        try {
            // Calculate total
            $total = 0;
            $validItems = [];
            
            foreach ($input['items'] as $item) {
                if (!isset($item['product_id']) || !isset($item['quantity'])) {
                    throw new Exception('Invalid item data');
                }
                
                // Get product details and verify stock
                $productQuery = "SELECT id, name, price, stock FROM products WHERE id = :id";
                $productStmt = $db->prepare($productQuery);
                $productStmt->bindParam(':id', $item['product_id']);
                $productStmt->execute();
                
                $product = $productStmt->fetch();
                
                if (!$product) {
                    throw new Exception('Product not found: ' . $item['product_id']);
                }
                
                if ($product['stock'] < $item['quantity']) {
                    throw new Exception('Insufficient stock for: ' . $product['name']);
                }
                
                $itemTotal = $product['price'] * $item['quantity'];
                $total += $itemTotal;
                
                $validItems[] = [
                    'product_id' => $product['id'],
                    'quantity' => $item['quantity'],
                    'price' => $product['price'],
                    'name' => $product['name']
                ];
            }
            
            // Create order
            $orderQuery = "INSERT INTO orders (user_id, total, status, reference) VALUES (:user_id, :total, :status, :reference)";
            $orderStmt = $db->prepare($orderQuery);
            $orderStmt->bindParam(':user_id', $userId);
            $orderStmt->bindParam(':total', $total);
            $status = 'PENDING';
            $orderStmt->bindParam(':status', $status);
            $reference = isset($input['reference']) ? $input['reference'] : 'ORD-' . time() . '-' . $userId;
            $orderStmt->bindParam(':reference', $reference);
            
            if (!$orderStmt->execute()) {
                throw new Exception('Failed to create order');
            }
            
            $orderId = $db->lastInsertId();
            
            // Add order items
            $itemQuery = "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (:order_id, :product_id, :quantity, :price)";
            $itemStmt = $db->prepare($itemQuery);
            
            foreach ($validItems as $item) {
                $itemStmt->bindParam(':order_id', $orderId);
                $itemStmt->bindParam(':product_id', $item['product_id']);
                $itemStmt->bindParam(':quantity', $item['quantity']);
                $itemStmt->bindParam(':price', $item['price']);
                
                if (!$itemStmt->execute()) {
                    throw new Exception('Failed to add order item');
                }
                
                // Update product stock
                $updateStockQuery = "UPDATE products SET stock = stock - :quantity WHERE id = :id";
                $updateStockStmt = $db->prepare($updateStockQuery);
                $updateStockStmt->bindParam(':quantity', $item['quantity']);
                $updateStockStmt->bindParam(':id', $item['product_id']);
                $updateStockStmt->execute();
            }
            
            // Clear user's cart
            $clearCartQuery = "DELETE FROM cart WHERE user_id = :user_id";
            $clearCartStmt = $db->prepare($clearCartQuery);
            $clearCartStmt->bindParam(':user_id', $userId);
            $clearCartStmt->execute();
            
            $db->commit();
            
            echo json_encode([
                'status' => 'success',
                'message' => 'Order created successfully',
                'order_id' => $orderId,
                'reference' => $reference,
                'total' => $total
            ]);
            
        } catch (Exception $e) {
            $db->rollback();
            throw $e;
        }
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}

/**
 * Update order status
 */
function handleUpdateOrder($db, $userId, $input) {
    try {
        if (!$input || !isset($input['id']) || !isset($input['status'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Order ID and status are required']);
            return;
        }

        $orderId = $input['id'];
        $status = $input['status'];
        
        $allowedStatuses = ['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
        
        if (!in_array($status, $allowedStatuses)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Invalid status']);
            return;
        }

        // Check if user owns the order or is admin
        $checkQuery = "SELECT user_id FROM orders WHERE id = :id";
        $checkStmt = $db->prepare($checkQuery);
        $checkStmt->bindParam(':id', $orderId);
        $checkStmt->execute();
        
        $order = $checkStmt->fetch();
        
        if (!$order) {
            http_response_code(404);
            echo json_encode(['status' => 'error', 'message' => 'Order not found']);
            return;
        }
        
        // Only allow users to cancel their own orders, or admin to update any order
        if ($order['user_id'] != $userId && !isAdmin($userId)) {
            if ($status !== 'CANCELLED') {
                http_response_code(403);
                echo json_encode(['status' => 'error', 'message' => 'Permission denied']);
                return;
            }
        }
        
        $updateQuery = "UPDATE orders SET status = :status, updated_at = NOW() WHERE id = :id";
        $updateStmt = $db->prepare($updateQuery);
        $updateStmt->bindParam(':status', $status);
        $updateStmt->bindParam(':id', $orderId);
        
        if ($updateStmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Order updated successfully']);
        } else {
            throw new Exception('Failed to update order');
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

/**
 * Check if user is admin
 */
function isAdmin($userId) {
    // In a real implementation, you would check the user's role from the database
    // For now, return false
    return false;
}
?>