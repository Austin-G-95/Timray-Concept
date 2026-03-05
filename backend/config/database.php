<?php
/**
 * Database Configuration
 * Timray Concept - Backend Database Connection
 */

class Database {
    private $host = 'localhost';
    private $db_name = 'timray_db';
    private $username = 'root';
    private $password = '';
    private $conn;

    /**
     * Get database connection
     */
    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }

    /**
     * Close database connection
     */
    public function closeConnection() {
        $this->conn = null;
    }

    /**
     * Test database connection
     */
    public function testConnection() {
        $conn = $this->getConnection();
        if ($conn) {
            return [
                'status' => 'success',
                'message' => 'Database connection successful',
                'server_info' => $conn->getAttribute(PDO::ATTR_SERVER_VERSION)
            ];
        } else {
            return [
                'status' => 'error',
                'message' => 'Database connection failed'
            ];
        }
    }
}

// Enable CORS for API requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}
?>