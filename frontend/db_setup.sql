-- Database setup for Timray Concept (MySQL/XAMPP)

-- 1. Create the database
CREATE DATABASE IF NOT EXISTS timray_db;
USE timray_db;

-- 2. Populate Initial Products (Seeding)
INSERT INTO Product (id, name, description, price, image, category, stock, rating, createdAt, updatedAt) VALUES 
('p1', 'Elite Audio Nexus', 'High-fidelity cinematic sound experience with active noise cancellation.', 150000, '/Headphone 1.webp', 'Headphones', 12, 4.9, NOW(), NOW()),
('p2', 'Obsidian Guard', 'Military-grade protective case with a sleek matte obsidian finish.', 15000, '/ObsidianGuard.jpg', 'Phone Cases', 50, 4.7, NOW(), NOW()),
('p3', 'Signal Sync Hub', 'Premium USB-C expansion protocols for professional laptop utility.', 45000, '/SignalSync.webp', 'Laptop Accessories', 8, 4.8, NOW(), NOW()),
('p4', 'Sonic Pulse Pods', 'Wireless earphone artifacts with dual-driver synchronization.', 85000, '/SonicPulsePods.webp', 'Earphones', 25, 4.5, NOW(), NOW()),
('p5', 'Vortex Speaker', '360 degree spatial audio jambox for immersive sound deployment.', 120000, '/VortexSpeaker.jpg', 'Jamboxes', 15, 4.6, NOW(), NOW());

/* 
INSTRUCTIONS FOR XAMPP:
1. Open XAMPP Control Panel and start Apache and MySQL.
2. Go to http://localhost/phpmyadmin/
3. Click 'New' on the left and name the database 'timray_db'.
4. Go to the 'SQL' tab and paste this entire script to create and seed the DB.
5. In your project's .env file, update the DATABASE_URL:
   DATABASE_URL="mysql://root:@localhost:3306/timray_db"
6. IMPORTANT: To sync the database with your code, run:
   npx prisma db push
*/
