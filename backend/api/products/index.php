<?php
/**
 * Products API Endpoint
 * Handle all product-related operations
 */

require_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        handleGetProducts($db);
        break;
        
    case 'POST':
        handleCreateProduct($db, $input);
        break;
        
    case 'PUT':
        handleUpdateProduct($db, $input);
        break;
        
    case 'DELETE':
        handleDeleteProduct($db, $input);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
        break;
}

/**
 * Get all products or single product by ID
 */
function handleGetProducts($db) {
    try {
        $productId = isset($_GET['id']) ? $_GET['id'] : null;
        $category = isset($_GET['category']) ? $_GET['category'] : null;
        $search = isset($_GET['search']) ? $_GET['search'] : null;
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 20;
        $offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;

        if ($productId) {
            // Get single product
            $query = "SELECT * FROM products WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $productId);
            $stmt->execute();
            
            $product = $stmt->fetch();
            if ($product) {
                echo json_encode(['status' => 'success', 'data' => $product]);
            } else {
                http_response_code(404);
                echo json_encode(['status' => 'error', 'message' => 'Product not found']);
            }
        } else {
            // Get multiple products with filters
            $query = "SELECT * FROM products WHERE 1=1";
            $params = [];
            
            if ($category) {
                $query .= " AND category = :category";
                $params[':category'] = $category;
            }
            
            if ($search) {
                $query .= " AND (name LIKE :search OR description LIKE :search)";
                $params[':search'] = '%' . $search . '%';
            }
            
            $query .= " ORDER BY created_at DESC LIMIT :limit OFFSET :offset";
            
            $stmt = $db->prepare($query);
            foreach ($params as $key => $value) {
                $stmt->bindValue($key, $value);
            }
            $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
            $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
            $stmt->execute();
            
            $products = $stmt->fetchAll();
            
            // Get total count
            $countQuery = "SELECT COUNT(*) as total FROM products WHERE 1=1";
            if ($category) $countQuery .= " AND category = '$category'";
            if ($search) $countQuery .= " AND (name LIKE '%$search%' OR description LIKE '%$search%')";
            
            $countStmt = $db->prepare($countQuery);
            $countStmt->execute();
            $total = $countStmt->fetch()['total'];
            
            echo json_encode([
                'status' => 'success',
                'data' => $products,
                'pagination' => [
                    'total' => (int)$total,
                    'limit' => $limit,
                    'offset' => $offset,
                    'has_more' => ($offset + $limit) < $total
                ]
            ]);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}

/**
 * Create new product
 */
function handleCreateProduct($db, $input) {
    try {
        if (!$input || !isset($input['name']) || !isset($input['price'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Name and price are required']);
            return;
        }

        $query = "INSERT INTO products (name, description, price, image, category, stock, rating, reviews, features, specs, full_description) 
                  VALUES (:name, :description, :price, :image, :category, :stock, :rating, :reviews, :features, :specs, :full_description)";
        
        $stmt = $db->prepare($query);
        $stmt->bindParam(':name', $input['name']);
        $stmt->bindParam(':description', $input['description'] ?? '');
        $stmt->bindParam(':price', $input['price']);
        $stmt->bindParam(':image', $input['image'] ?? '');
        $stmt->bindParam(':category', $input['category'] ?? 'Electronics');
        $stmt->bindParam(':stock', $input['stock'] ?? 0);
        $stmt->bindParam(':rating', $input['rating'] ?? 4.5);
        $stmt->bindParam(':reviews', $input['reviews'] ?? 0);
        $stmt->bindParam(':features', $input['features'] ?? '');
        $stmt->bindParam(':specs', $input['specs'] ?? '');
        $stmt->bindParam(':full_description', $input['full_description'] ?? '');
        
        if ($stmt->execute()) {
            $productId = $db->lastInsertId();
            echo json_encode([
                'status' => 'success',
                'message' => 'Product created successfully',
                'product_id' => $productId
            ]);
        } else {
            throw new Exception('Failed to create product');
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}

/**
 * Update existing product
 */
function handleUpdateProduct($db, $input) {
    try {
        if (!$input || !isset($input['id'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Product ID is required']);
            return;
        }

        $fields = [];
        $params = [':id' => $input['id']];
        
        $allowedFields = ['name', 'description', 'price', 'image', 'category', 'stock', 'rating', 'reviews', 'features', 'specs', 'full_description'];
        
        foreach ($allowedFields as $field) {
            if (isset($input[$field])) {
                $fields[] = "$field = :$field";
                $params[":$field"] = $input[$field];
            }
        }
        
        if (empty($fields)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'No fields to update']);
            return;
        }
        
        $query = "UPDATE products SET " . implode(', ', $fields) . ", updated_at = NOW() WHERE id = :id";
        $stmt = $db->prepare($query);
        
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }
        
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Product updated successfully']);
        } else {
            throw new Exception('Failed to update product');
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}

/**
 * Delete product
 */
function handleDeleteProduct($db, $input) {
    try {
        $productId = isset($input['id']) ? $input['id'] : (isset($_GET['id']) ? $_GET['id'] : null);
        
        if (!$productId) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Product ID is required']);
            return;
        }

        $query = "DELETE FROM products WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $productId);
        
        if ($stmt->execute()) {
            if ($stmt->rowCount() > 0) {
                echo json_encode(['status' => 'success', 'message' => 'Product deleted successfully']);
            } else {
                http_response_code(404);
                echo json_encode(['status' => 'error', 'message' => 'Product not found']);
            }
        } else {
            throw new Exception('Failed to delete product');
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}
?>