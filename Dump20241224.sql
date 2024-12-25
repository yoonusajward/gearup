-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: gearup
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int DEFAULT '1',
  PRIMARY KEY (`cart_id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (2,2,2,6),(4,2,1,1),(5,2,3,1);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,2,1,2,20.00),(2,2,2,1,50.00),(3,3,1,2,20.00),(4,3,2,1,50.00),(5,4,2,6,699.99),(6,4,1,1,999.99),(7,4,3,1,199.99);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `shipping_address` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,300.00,'123 Main Street, City, Country','2024-12-24 08:27:04'),(2,1,90.00,'adsad','2024-12-25 04:46:18'),(3,1,90.00,'adsad','2024-12-25 04:46:28'),(4,1,5399.92,'kandy road akurana','2024-12-25 05:51:47');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(225) NOT NULL,
  `description` varchar(225) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int DEFAULT '0',
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Laptop','High-performance laptop with 16GB RAM and 512GB SSD',999.99,0),(2,'Smartphone','Latest smartphone with 8GB RAM and 128GB storage',699.99,0),(3,'Smartwatch','Stylish smartwatch with heart rate monitor',199.99,0),(4,'Wireless Mouse','Ergonomic wireless mouse with 2.4GHz connectivity',29.99,0),(5,'Wireless Keyboard','Sleek wireless keyboard with long battery life',49.99,0),(6,'Bluetooth Headphones','Noise-cancelling Bluetooth headphones',129.99,0),(7,'Gaming Chair','Ergonomic gaming chair with adjustable armrests',249.99,0),(8,'Portable Speaker','Water-resistant portable Bluetooth speaker',89.99,0),(9,'External Hard Drive','1TB external hard drive for backups',59.99,0),(10,'4K Monitor','27-inch 4K resolution display monitor',499.99,0),(11,'Webcam','HD webcam with built-in microphone',39.99,0),(12,'Laptop Bag','Spacious laptop bag with multiple compartments',39.99,0),(13,'USB Flash Drive','16GB USB 3.0 flash drive',19.99,0),(14,'Router','Wi-Fi router with high-speed internet connectivity',69.99,0),(15,'Game Console','Next-gen game console with exclusive games',399.99,0);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'John','Doe','john.doe@example.com','1234567890','123 Main Street, City, Country'),(2,'John','Doe','john.doe@example.com','1234567890','123 Main Street, City, Country'),(3,'John','Doe','john.doe@example.com','1234567890','123 Main St'),(4,'Yoonus','Ajward','yoonusajward27@gmail.com','0760840008','Akurana'),(5,'Yoonus','Ajward','yoonusajward27@gmail.com','0760840008','Akurana'),(6,'Yoonus','Ajward','yoonusajward27@gmail.com','0760840008','Akurana'),(7,'Yoonus','Ajward','yoonusajward27@gmail.com','0760840008','Akurana'),(8,'Yoonus','Ajward','yoonusajward27@gmail.com','0760840008','Akurana'),(9,'Yoonus','Ajward','yoonusajward27@gmail.com','0760840008','Akurana'),(10,'Yoonus','Ajward','yoonusajward27@gmail.com','0760840008','Akurana'),(11,'John','Doe','john.doe@example.com','1234567890','123 Main Street, City, Country'),(12,'Yoonus','Ajward','yoonusajward27@gmail.com','0760840008','Akurana'),(13,'Yoonus','Ajward','yoonusajward27@gmail.com','0760840008','Akurana'),(14,'Yoonus','Ajward','yoonusajward27@gmail.com','0760840008','Akurana'),(15,'Yoonus','Ajward','yoonusajward27@gmail.com','0760840008','Akurana'),(16,'Yoonus','Ajward','yoonusajward27@gmail.com','0760840008','Akurana'),(17,'Yoonus','Ajward','yoonusajward27@gmail.com','0760840008','Akurana'),(18,'Yoonus','Ajward','yoonusajward27@gmail.com','0760840008','Akurana'),(19,'Yoonus','Ajward','yoonusajward27@gmail.com','0760840008','Akurana'),(20,'Yoonus','Ajward','yoonusajward27@gmail.com','0760840008','Akurana'),(21,'Yoonus','Ajward','yoonusajward27@gmail.com','0760840008','Akurana'),(22,'Yoonus','Ajward','yoonusajward27@gmail.com','0760840008','Akurana'),(23,'Yoonus','Ajward','yoonusajward27@gmail.com','0760840008','Akurana'),(24,'Yoonus','Ajward','yoonusajward27@gmail.com','0760840008','Akurana'),(25,'Yoonus','Ajward','yoonusajward27@gmail.com','0760840008','Akurana'),(26,'Yoonus','Ajward','yoonusajward27@gmail.com','0760840008','Akurana'),(27,'Yoonus','Ajward','yoonusajward27@gmail.com','0760840008','Akurana'),(28,'Yoonus','Ajward','yoonusajward27@gmail.com','0760840008','Akurana'),(29,'Yoonus','Ajward','yoonusajward27@gmail.com','0760840008','Akurana'),(30,'Yoonus','Ajward','yoonusajward27@gmail.com','0760840008','Akurana'),(31,'Yoonus','Ajward','yoonusajward27@gmail.com','0760840008','Akurana'),(32,'Yoonus','Ajward','yoonusajward27@gmail.com','0760840008','Akurana');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-25 11:49:49
