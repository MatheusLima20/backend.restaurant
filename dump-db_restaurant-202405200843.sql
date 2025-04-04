-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: db_restaurant
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `states`
--

DROP TABLE IF EXISTS `states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `states` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uf` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `states`
--

LOCK TABLES `states` WRITE;
/*!40000 ALTER TABLE `states` DISABLE KEYS */;
INSERT INTO `states` VALUES (1,'AC','Acre','2022-11-07 18:38:03.495841','2022-11-07 18:38:03.495841'),(2,'AL','Alagoas','2022-11-07 18:38:03.495841','2022-11-07 18:38:03.495841'),(3,'AM','Amazonas','2022-11-07 18:38:03.495841','2022-11-07 18:38:03.495841'),(4,'AP','Amapá','2022-11-07 18:38:03.495841','2022-11-07 18:38:03.495841'),(5,'BA','Bahia','2022-11-07 18:38:03.495841','2022-11-07 18:38:03.495841'),(6,'CE','Ceará','2022-11-07 18:38:03.495841','2022-11-07 18:38:03.495841'),(7,'DF','Distrito Federal','2022-11-07 18:38:03.495841','2022-11-07 18:38:03.495841'),(8,'ES','Espírito Santo','2022-11-07 18:38:03.495841','2022-11-07 18:38:03.495841'),(9,'GO','Goiás','2022-11-07 18:38:03.495841','2022-11-07 18:38:03.495841'),(10,'MA','Maranhão','2022-11-07 18:38:03.495841','2022-11-07 18:38:03.495841'),(11,'MG','Minas Gerais','2022-11-07 18:38:03.495841','2022-11-07 18:38:03.495841'),(12,'MS','Mato Grosso do Sul','2022-11-07 18:38:03.495841','2022-11-07 18:38:03.495841'),(13,'MT','Mato Grosso','2022-11-07 18:38:03.495841','2022-11-07 18:38:03.495841'),(14,'PA','Pará','2022-11-07 18:38:03.495841','2022-11-07 18:38:03.495841'),(15,'PB','Paraíba','2022-11-07 18:38:03.495841','2022-11-07 18:38:03.495841'),(16,'PE','Pernambuco','2022-11-07 18:38:03.495841','2022-11-07 18:38:03.495841'),(17,'PI','Piauí','2022-11-07 18:38:03.495841','2022-11-07 18:38:03.495841'),(18,'PR','Paraná','2022-11-07 18:38:03.495841','2022-11-07 18:38:03.495841'),(19,'RJ','Rio de Janeiro','2022-11-07 18:38:03.495841','2022-11-07 18:38:03.495841'),(20,'RN','Rio Grande do Norte','2022-11-07 18:38:03.495841','2022-11-07 18:38:03.495841'),(21,'RO','Rondonia','2022-11-07 18:38:03.495841','2022-11-07 18:38:03.495841'),(22,'RR','Roraima','2022-11-07 18:38:03.495841','2022-11-07 18:38:03.495841'),(23,'RS','Rio Grande do Sul','2022-11-07 18:38:03.495841','2022-11-07 18:38:03.495841'),(24,'SC','Santa Catarina','2022-11-07 18:38:03.495841','2022-11-07 18:38:03.495841'),(25,'SE','Sergipe','2022-11-07 18:38:03.495841','2022-11-07 18:38:03.495841'),(26,'SP','São Paulo','2022-11-07 18:38:03.495841','2022-11-19 11:32:20.297060'),(27,'TO','Tocantins','2022-11-07 18:38:03.495841','2022-11-07 18:38:03.495841');
/*!40000 ALTER TABLE `states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unit_measurement`
--

DROP TABLE IF EXISTS `unit_measurement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unit_measurement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unit_measurement`
--

LOCK TABLES `unit_measurement` WRITE;
/*!40000 ALTER TABLE `unit_measurement` DISABLE KEYS */;
INSERT INTO `unit_measurement` VALUES (1,'KG','2024-04-15 19:36:26.801921','2024-04-15 19:36:26.801921'),(2,'g','2024-04-15 19:36:26.946318','2024-04-15 19:36:26.946318'),(3,'L','2024-04-15 19:36:26.982527','2024-04-15 19:36:26.982527'),(4,'ml','2024-04-15 19:36:27.016495','2024-04-15 19:36:27.016495'),(5,'CX','2024-04-15 19:36:27.050852','2024-04-15 19:36:27.050852'),(6,'PC','2024-04-16 12:27:05.843551','2024-04-16 12:27:05.843551'),(7,'PR','2024-04-19 17:45:18.576084','2024-04-19 17:45:18.576084');
/*!40000 ALTER TABLE `unit_measurement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_type`
--

DROP TABLE IF EXISTS `user_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_type`
--

LOCK TABLES `user_type` WRITE;
/*!40000 ALTER TABLE `user_type` DISABLE KEYS */;
INSERT INTO `user_type` VALUES (1,'ADM','2022-11-07 19:37:11.123811','2022-11-09 12:06:14.502958'),(2,'ENTREGADOR','2022-11-07 19:37:11.136941','2022-11-07 19:37:11.136941'),(5,'CUSTOMER','2022-11-11 12:03:14.297856','2024-05-17 14:58:54.097281'),(6,'SUPER','2023-03-13 14:30:48.224911','2023-03-13 14:30:48.224911'),(7,'WAITER','2024-05-16 13:24:13.278701','2024-05-16 13:24:13.278701'),(8,'DELIVERYMAN','2023-03-13 14:30:48.224911','2023-03-13 14:30:48.224911');
/*!40000 ALTER TABLE `user_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'db_restaurant'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-20  8:43:52
