-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: db_restaurants
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `id` int NOT NULL AUTO_INCREMENT,
  `main` tinyint NOT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `district` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `street` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone_number` bigint NOT NULL,
  `address_number` int NOT NULL,
  `address_code_postal` int NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `fk_user` int DEFAULT NULL,
  `fk_platform` int DEFAULT NULL,
  `fk_state` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_08ca36829097b08d3b780d4337d` (`fk_user`),
  KEY `FK_dbec4b34d28e23f935b41556865` (`fk_platform`),
  KEY `FK_b6b76a1068ed9faadef867a3907` (`fk_state`),
  CONSTRAINT `FK_08ca36829097b08d3b780d4337d` FOREIGN KEY (`fk_user`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_b6b76a1068ed9faadef867a3907` FOREIGN KEY (`fk_state`) REFERENCES `states` (`id`),
  CONSTRAINT `FK_dbec4b34d28e23f935b41556865` FOREIGN KEY (`fk_platform`) REFERENCES `platform` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (6,1,'Paraipaba','Rosário','Rosário',85978541489,25,62685000,'2025-09-29 16:30:59.529376','2025-09-29 16:30:59.529376',11,6,6);
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `box_day`
--

DROP TABLE IF EXISTS `box_day`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `box_day` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fk_platform` int NOT NULL,
  `is_open` tinyint NOT NULL DEFAULT '1',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `start_value` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `box_day`
--

LOCK TABLES `box_day` WRITE;
/*!40000 ALTER TABLE `box_day` DISABLE KEYS */;
INSERT INTO `box_day` VALUES (18,6,1,11,NULL,'2025-09-29 16:39:28.354997','2025-09-29 16:39:28.354997',200);
/*!40000 ALTER TABLE `box_day` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `charges`
--

DROP TABLE IF EXISTS `charges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `charges` (
  `id` int NOT NULL AUTO_INCREMENT,
  `platform` int NOT NULL,
  `payer` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `payday` varchar(255) DEFAULT NULL,
  `paid_in` varchar(255) DEFAULT NULL,
  `value` float NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_pay` tinyint NOT NULL DEFAULT '0',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `fk_order` int DEFAULT NULL,
  `fk_user` int DEFAULT NULL,
  `fk_boxday` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1d14ed0c0f833f6851c613a503a` (`fk_order`),
  KEY `FK_6426d45517490e606c4493a6f8a` (`fk_user`),
  KEY `FK_bf0041f2c537a07279813e53b84` (`fk_boxday`),
  CONSTRAINT `FK_1d14ed0c0f833f6851c613a503a` FOREIGN KEY (`fk_order`) REFERENCES `order` (`id`),
  CONSTRAINT `FK_6426d45517490e606c4493a6f8a` FOREIGN KEY (`fk_user`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_bf0041f2c537a07279813e53b84` FOREIGN KEY (`fk_boxday`) REFERENCES `box_day` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `charges`
--

LOCK TABLES `charges` WRITE;
/*!40000 ALTER TABLE `charges` DISABLE KEYS */;
INSERT INTO `charges` VALUES (1,6,NULL,'MONTHLYFEE','2025-10-10',NULL,49.97,'Mensalidade.',0,'2025-09-29 16:31:16.497508','2025-09-29 16:31:16.497508',NULL,NULL,NULL),(2,6,NULL,'MONTHLYFEE','2025-11-10',NULL,149.9,'Mensalidade.',0,'2025-09-29 16:31:16.503965','2025-09-29 16:31:16.503965',NULL,NULL,NULL),(3,6,NULL,'MONTHLYFEE','2025-12-10',NULL,149.9,'Mensalidade.',0,'2025-09-29 16:31:16.510191','2025-09-29 16:31:16.510191',NULL,NULL,NULL),(4,6,NULL,'MONTHLYFEE','2026-01-10',NULL,149.9,'Mensalidade.',0,'2025-09-29 16:31:16.514662','2025-09-29 16:31:16.514662',NULL,NULL,NULL),(5,6,NULL,'MONTHLYFEE','2026-02-10',NULL,149.9,'Mensalidade.',0,'2025-09-29 16:31:16.519925','2025-09-29 16:31:16.519925',NULL,NULL,NULL),(6,6,NULL,'MONTHLYFEE','2026-03-10',NULL,149.9,'Mensalidade.',0,'2025-09-29 16:31:16.525998','2025-09-29 16:31:16.525998',NULL,NULL,NULL),(7,6,NULL,'MONTHLYFEE','2026-04-10',NULL,149.9,'Mensalidade.',0,'2025-09-29 16:31:16.530938','2025-09-29 16:31:16.530938',NULL,NULL,NULL),(8,6,NULL,'MONTHLYFEE','2026-05-10',NULL,149.9,'Mensalidade.',0,'2025-09-29 16:31:16.535355','2025-09-29 16:31:16.535355',NULL,NULL,NULL),(9,6,NULL,'MONTHLYFEE','2026-06-10',NULL,149.9,'Mensalidade.',0,'2025-09-29 16:31:16.539592','2025-09-29 16:31:16.539592',NULL,NULL,NULL),(10,6,NULL,'MONTHLYFEE','2026-07-10',NULL,149.9,'Mensalidade.',0,'2025-09-29 16:31:16.544521','2025-09-29 16:31:16.544521',NULL,NULL,NULL),(11,6,NULL,'MONTHLYFEE','2026-08-10',NULL,149.9,'Mensalidade.',0,'2025-09-29 16:31:16.548780','2025-09-29 16:31:16.548780',NULL,NULL,NULL),(12,6,NULL,'MONTHLYFEE','2026-09-10',NULL,149.9,'Mensalidade.',0,'2025-09-29 16:31:16.553186','2025-09-29 16:31:16.553186',NULL,NULL,NULL);
/*!40000 ALTER TABLE `charges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cpf_cnpj` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `company_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `corporate_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (6,'64897849889789','Restaurante Beira Mar','Matheus Lima Dos Santos','2025-09-29 16:30:59.511617','2025-09-29 16:30:59.511617');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content`
--

DROP TABLE IF EXISTS `content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `file_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tag` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `text` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sub_title` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `visible` tinyint NOT NULL DEFAULT '0',
  `views_amount` int NOT NULL DEFAULT '0',
  `fk_platform` int NOT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content`
--

LOCK TABLES `content` WRITE;
/*!40000 ALTER TABLE `content` DISABLE KEYS */;
INSERT INTO `content` VALUES (1,NULL,'LOG',NULL,NULL,'Alterado','Pedido alterado por: Matheus Lima, \n                        Cod: 1, Produto: Porção de Arroz, \n                        Quantidade: 1,\n                        Status: processando, Cancelado: undefined.','Pedido Alterado',NULL,0,0,6,11,NULL,'2025-09-29 16:40:02.550415','2025-09-29 16:40:02.550415'),(2,NULL,'LOG',NULL,NULL,'Alterado','Pedido alterado por: Matheus Lima, \n                Cod: undefined, Produto: undefined, Quantidade: undefined,\n                 Status: finalizado, Cancelado: undefined.','Pedido Alterado',NULL,0,0,6,11,NULL,'2025-09-29 16:40:14.510541','2025-09-29 16:40:14.510541'),(3,NULL,'LOG',NULL,NULL,'Alterado','Pedido alterado por: Matheus Lima, \n                Cod: undefined, Produto: undefined, Quantidade: undefined,\n                 Status: finalizado, Cancelado: undefined.','Pedido Alterado',NULL,0,0,6,11,NULL,'2025-09-29 16:40:27.539781','2025-09-29 16:40:27.539781');
/*!40000 ALTER TABLE `content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fk_product_id` int NOT NULL,
  `description` varchar(255) NOT NULL,
  `observation` varchar(255) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pendente',
  `product_type` varchar(255) DEFAULT NULL,
  `delivery_forecast` datetime DEFAULT NULL,
  `delivery_date` datetime DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `value` float DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `tracking_code` varchar(255) DEFAULT NULL,
  `is_delivered` tinyint DEFAULT '0',
  `is_cancelled` tinyint DEFAULT '0',
  `fk_platform` int NOT NULL,
  `fk_box_day` int DEFAULT NULL,
  `fk_table` int DEFAULT NULL,
  `is_open` tinyint NOT NULL DEFAULT '1',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `fk_final_client` int DEFAULT NULL,
  `fk_client` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3cf3e3cbd27dd1955356be5cb85` (`fk_final_client`),
  KEY `FK_d9599fe2c384f1662d4cbc5d440` (`fk_client`),
  CONSTRAINT `FK_3cf3e3cbd27dd1955356be5cb85` FOREIGN KEY (`fk_final_client`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_d9599fe2c384f1662d4cbc5d440` FOREIGN KEY (`fk_client`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,55,'Porção de Arroz',NULL,'dinheiro','finalizado','GUARNIÇÃO',NULL,'2025-09-29 13:40:14',1,15,1,NULL,0,0,6,18,19,0,11,11,'2025-09-29 16:39:48.516000','2025-09-29 16:40:14.000000',NULL,NULL),(2,56,'Suco de Caja (Jarra)',NULL,'pix','finalizado','BEBIDA',NULL,'2025-09-29 13:40:27',0,10,1,NULL,0,0,6,18,21,0,11,11,'2025-09-29 16:40:21.699000','2025-09-29 16:40:27.000000',NULL,NULL);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `is_pay` tinyint NOT NULL DEFAULT '0',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `fk_order` int DEFAULT NULL,
  `fk_user` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9680a8699a8257c988df13da02b` (`fk_order`),
  KEY `FK_5858b00f2d4f6121f9d24fc4ffe` (`fk_user`),
  CONSTRAINT `FK_5858b00f2d4f6121f9d24fc4ffe` FOREIGN KEY (`fk_user`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_9680a8699a8257c988df13da02b` FOREIGN KEY (`fk_order`) REFERENCES `order` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan`
--

DROP TABLE IF EXISTS `plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `month_value` float NOT NULL,
  `annual_value` float NOT NULL,
  `max_tables` int NOT NULL,
  `max_users` int NOT NULL,
  `tax_delivery` float NOT NULL,
  `max_boxday` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan`
--

LOCK TABLES `plan` WRITE;
/*!40000 ALTER TABLE `plan` DISABLE KEYS */;
INSERT INTO `plan` VALUES (1,'Iniciante','2024-07-23 12:06:06.584797','2024-07-24 14:55:05.745154',99.9,79.9,8,4,0.04,1),(2,'Profissional','2024-07-23 12:07:59.070770','2024-07-24 14:54:56.676411',149.9,129.9,20,8,0.04,2),(3,'Premium','2024-07-23 12:08:29.606514','2024-07-24 17:35:31.877679',239.9,209.9,30,15,0.035,3);
/*!40000 ALTER TABLE `plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `platform`
--

DROP TABLE IF EXISTS `platform`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `platform` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `is_month_plan` tinyint NOT NULL DEFAULT '1',
  `is_active` tinyint NOT NULL DEFAULT '1',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `fk_company` int DEFAULT NULL,
  `fk_plan` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c71182cd0ea8f4508fed0548fd6` (`fk_company`),
  KEY `FK_c9e3d2871729edf91eedb0be003` (`fk_plan`),
  CONSTRAINT `FK_c71182cd0ea8f4508fed0548fd6` FOREIGN KEY (`fk_company`) REFERENCES `companies` (`id`),
  CONSTRAINT `FK_c9e3d2871729edf91eedb0be003` FOREIGN KEY (`fk_plan`) REFERENCES `plan` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `platform`
--

LOCK TABLES `platform` WRITE;
/*!40000 ALTER TABLE `platform` DISABLE KEYS */;
INSERT INTO `platform` VALUES (1,'Imperio Restaurante',1,127,'2024-09-02 11:32:50.505938','0000-00-00 00:00:00.000000',3,1),(4,'Lojinha do 15',1,127,'2024-09-02 11:32:50.527939','0000-00-00 00:00:00.000000',1,0),(5,'Doce Lar',1,127,'2024-09-02 11:32:50.542231','0000-00-00 00:00:00.000000',2,1),(6,'Restaurante Beira Mar',1,1,'2025-09-29 16:30:59.517575','2025-09-29 16:30:59.517575',6,2);
/*!40000 ALTER TABLE `platform` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_type`
--

DROP TABLE IF EXISTS `product_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_type`
--

LOCK TABLES `product_type` WRITE;
/*!40000 ALTER TABLE `product_type` DISABLE KEYS */;
INSERT INTO `product_type` VALUES (6,'PRATO','2025-09-29 16:33:34.717452','2025-09-29 16:33:34.717452'),(7,'GUARNIÇÃO','2025-09-29 16:33:34.725161','2025-09-29 16:33:34.725161'),(8,'BEBIDA','2025-09-29 16:33:34.729877','2025-09-29 16:33:34.729877'),(9,'SOBREMESA','2025-09-29 16:33:34.733202','2025-09-29 16:33:34.733202'),(10,'PETISCO','2025-09-29 16:33:34.737198','2025-09-29 16:33:34.737198'),(11,'DRINK','2025-09-29 16:33:34.740661','2025-09-29 16:33:34.740661'),(12,'LUNCH','2025-09-29 16:33:34.744506','2025-09-29 16:33:34.744506');
/*!40000 ALTER TABLE `product_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderAverage` int NOT NULL,
  `fk_platform` int NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `fk_user` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f77dd7e0edbc85b598e728e4d5f` (`fk_user`),
  CONSTRAINT `FK_f77dd7e0edbc85b598e728e4d5f` FOREIGN KEY (`fk_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provisions`
--

DROP TABLE IF EXISTS `provisions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provisions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `fk_platform` int NOT NULL,
  `value` float NOT NULL,
  `amount` float NOT NULL DEFAULT '0',
  `is_active` tinyint NOT NULL DEFAULT '1',
  `to_cook` tinyint NOT NULL DEFAULT '1',
  `is_plate` tinyint NOT NULL DEFAULT '1',
  `show` tinyint NOT NULL DEFAULT '1',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `fk_unit__measurement` int DEFAULT NULL,
  `fk_product_type` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_693339d8b95c951a744fa058605` (`fk_unit__measurement`),
  KEY `FK_831d7598cbbfe19b183bac7ef1e` (`fk_product_type`),
  CONSTRAINT `FK_693339d8b95c951a744fa058605` FOREIGN KEY (`fk_unit__measurement`) REFERENCES `unit_measurement` (`id`),
  CONSTRAINT `FK_831d7598cbbfe19b183bac7ef1e` FOREIGN KEY (`fk_product_type`) REFERENCES `product_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provisions`
--

LOCK TABLES `provisions` WRITE;
/*!40000 ALTER TABLE `provisions` DISABLE KEYS */;
INSERT INTO `provisions` VALUES (1,'Arroz',1,7,23,1,0,1,1,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',NULL,1),(2,'Arroz a Grega',1,12,0,1,1,1,1,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',5,1),(3,'Carne do Sol',1,50.99,0,1,1,1,1,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',1,1),(4,'Carne do Sol Assada',1,62.5,0,1,1,1,1,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',1,1),(5,'Suco de Abacaxi',1,3,0,1,1,1,1,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',2,1),(6,'Suco de Acerola',1,2.5,0,1,0,1,1,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',2,1),(7,'Frango à Passarinho',1,25,0,1,1,1,1,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',1,1),(8,'Feijão Mulatinho',1,10,10,1,0,1,0,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',NULL,1),(9,'Farinha Branca',1,4,14,1,0,1,1,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',NULL,1),(10,'Farinha Amarela',1,6,19.4,1,0,1,1,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',NULL,1),(11,'Suco de Acerola',1,3,0,1,1,1,1,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',2,1),(12,'Mesa Com Quatro Cadeiras',1,250,1,1,0,1,0,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',NULL,1),(13,'Carne de Porco',1,21,70,1,0,1,1,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',NULL,1),(14,'Carne de Cabra',1,25,10,1,0,1,1,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',NULL,1),(15,'Acerola',1,3,14.6,1,0,1,1,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',NULL,1),(16,'Goiaba',1,5,6,1,0,1,1,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',NULL,1),(17,'Carne de Gado',1,40,19,1,0,1,1,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',NULL,1),(18,'Sorvete com calda de frutas',1,17.5,0,1,1,1,0,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',3,1),(19,'Frango Assado',1,25.99,0,1,1,1,0,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',1,1),(20,'Salada de Frutas',1,10,0,1,1,1,0,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',5,1),(21,'Baião',1,7.99,0,1,1,1,1,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',5,1),(22,'Baião Molhado',1,10.5,0,1,1,1,1,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',5,1),(23,'Carne de Porco Assada',1,35,0,1,1,1,0,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',1,1),(24,'Coca Cola 200ml',1,5,5,1,0,1,1,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',NULL,1),(25,'Frango ao Molho',1,31.9,0,1,1,1,0,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',1,1),(26,'Coca Cola 1L',1,5,19,1,0,1,1,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',1,1),(30,'Salada de Frutas',1,12,0,1,1,1,0,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',1,1),(31,'Suco de Goiaba',1,4,0,1,1,1,0,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',2,1),(32,'Feijão Branco',1,7,-0.01,1,0,1,0,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',NULL,1),(33,'Poupa de Maracujá',1,6,6,1,0,1,1,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',NULL,1),(34,'Suco de Laranja',1,5,0,1,1,1,0,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',2,1),(35,'Suco de Ameixa',1,3.5,0,1,1,1,0,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',2,1),(36,'Rapadura Preta',1,5,20,1,0,1,1,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',NULL,1),(37,'Camarão à Quatro Queijos',1,41.99,0,1,1,1,0,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',1,1),(38,'Coca Cola 1L',1,7.99,0,1,1,1,1,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',2,0),(39,'Feijão Preto',1,12.09,10,1,0,1,1,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',NULL,1),(40,'Sal',1,1,5.28,1,0,1,0,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',NULL,1),(47,'Farofa',1,10,0,1,1,1,1,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',5,1),(48,'Açucar',1,4,14.7,1,0,1,1,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',NULL,1),(49,'Carne do Sol',1,45,20,1,0,1,0,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',NULL,1),(50,'Filé',1,34,15,1,0,1,0,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',NULL,1),(51,'Feijão',1,7,15,1,0,1,0,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',NULL,1),(52,'Queijo Coalho',1,40,7.9,1,0,1,1,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',NULL,1),(53,'Queijo Mussarela',1,44,9.9,1,0,1,1,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',NULL,1),(54,'Macarrão a Quatro Queijos',1,29,0,1,1,1,1,2024,2024,'0000-00-00 00:00:00.000000','0000-00-00 00:00:00.000000',1,1),(55,'Porção de Arroz',6,15,0,1,1,1,1,11,NULL,'2025-09-29 16:38:32.952455','2025-09-29 16:38:32.952455',NULL,7),(56,'Suco de Caja (Jarra)',6,10,0,1,1,1,1,11,NULL,'2025-09-29 16:39:02.616451','2025-09-29 16:39:02.616451',NULL,8);
/*!40000 ALTER TABLE `provisions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `raw_material`
--

DROP TABLE IF EXISTS `raw_material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `raw_material` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fk_platform` int NOT NULL,
  `amount` float NOT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `fk_product` int DEFAULT NULL,
  `fk_raw_material` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_54cd926fc912da3ac4dca3ed5d0` (`fk_product`),
  KEY `FK_825c31f724564776527ed407c5e` (`fk_raw_material`),
  CONSTRAINT `FK_54cd926fc912da3ac4dca3ed5d0` FOREIGN KEY (`fk_product`) REFERENCES `provisions` (`id`),
  CONSTRAINT `FK_825c31f724564776527ed407c5e` FOREIGN KEY (`fk_raw_material`) REFERENCES `provisions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `raw_material`
--

LOCK TABLES `raw_material` WRITE;
/*!40000 ALTER TABLE `raw_material` DISABLE KEYS */;
/*!40000 ALTER TABLE `raw_material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spending`
--

DROP TABLE IF EXISTS `spending`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `spending` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `value` float NOT NULL,
  `amount` float NOT NULL,
  `fk_platform` int NOT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `unitMeasurement` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spending`
--

LOCK TABLES `spending` WRITE;
/*!40000 ALTER TABLE `spending` DISABLE KEYS */;
INSERT INTO `spending` VALUES (1,'Arroz',7,10,1,1,NULL,'2024-05-20 17:11:29.184738','2024-08-27 15:02:09.733093','KG'),(2,'Carne do Sol',50.99,12,1,1,NULL,'2024-05-20 17:12:46.040154','2024-08-27 15:02:09.746389','KG'),(3,'Feijão Mulatinho',10,10,1,1,NULL,'2024-06-03 11:49:53.144686','2024-08-27 15:02:09.754070','KG'),(4,'Farinha Branca',4,3,1,1,NULL,'2024-06-03 11:56:24.694406','2024-08-27 15:02:09.760405','KG'),(5,'Farinha Branca',4,1,1,1,NULL,'2024-06-03 11:56:48.824217','2024-08-27 15:02:09.767994','KG'),(6,'Farinha Amarela',6,10,1,1,NULL,'2024-06-03 12:01:06.594533','2024-08-27 15:02:09.773647','KG'),(7,'Mesa Com Quatro Cadeiras',250,1,1,1,NULL,'2024-06-04 13:56:59.514775','2024-08-27 15:02:09.781161','KG'),(8,'Goiaba',5,3,1,1,NULL,'2024-06-04 18:32:35.729623','2024-08-27 15:02:09.788848','KG'),(9,'Goiaba',5,3,1,1,NULL,'2024-06-04 18:33:35.065840','2024-08-27 15:02:09.796004','KG'),(10,'Acerola',3,5,1,1,NULL,'2024-06-04 18:33:41.078033','2024-08-27 15:02:09.802220','KG'),(11,'Carne de Cabra',25,3,1,1,NULL,'2024-06-04 18:33:48.700891','2024-08-27 15:02:09.809208','KG'),(12,'Carne de Porco',21,50,1,1,NULL,'2024-06-04 18:33:55.261235','2024-08-27 15:02:09.815441','KG'),(13,'Arroz',7,10,1,1,NULL,'2024-06-04 18:36:08.558343','2024-08-27 15:02:09.823030','KG'),(14,'Farinha Branca',4,5,1,1,NULL,'2024-06-04 18:36:44.940054','2024-08-27 15:02:09.827951','KG'),(15,'Farinha Amarela',6,5,1,1,NULL,'2024-06-04 18:37:48.490002','2024-08-27 15:02:09.835724','KG'),(16,'Carne de Gado',40,12,1,1,NULL,'2024-06-04 18:40:07.251229','2024-08-27 15:02:09.841192','KG'),(17,'Carne de Gado',40,7,1,1,NULL,'2024-06-04 18:40:47.914768','2024-08-27 15:02:09.846212','KG'),(18,'Pagamento De Funcionário',1300,2,1,1,1,'2024-06-04 18:44:42.029000','2024-08-27 15:02:09.851264','KG'),(19,'Carne de Porco',21,10,1,1,NULL,'2024-06-21 14:20:41.580209','2024-08-27 15:02:09.857325','KG'),(20,'Coca Cola 200ml',5,5,1,1,NULL,'2024-06-21 14:23:07.043463','2024-08-27 15:02:09.867607','KG'),(21,'Coca Cola 1L',5,2,1,1,NULL,'2024-07-11 19:56:56.729806','2024-08-27 15:02:09.876935','KG'),(22,'Poupa de Maracujá',6,1,1,1,NULL,'2024-07-11 20:24:35.533710','2024-08-27 15:02:09.899170','KG'),(23,'Rapadura Preta',5,5,1,1,NULL,'2024-07-22 17:15:45.151987','2024-08-27 15:02:09.916187','KG'),(24,'Feijão Preto',9.99,10,1,1,NULL,'2024-07-25 11:07:24.898150','2024-08-27 15:02:09.928824','KG'),(25,'Sal',1,10,1,1,NULL,'2024-08-07 18:01:31.648110','2024-08-27 15:02:09.940546','KG'),(26,'Açucar',4,10,1,1,NULL,'2024-08-13 19:42:32.908451','2024-08-27 15:02:09.953922','KG'),(27,'Carne do Sol',45,20,1,1,NULL,'2024-08-27 14:04:43.608978','2024-08-27 15:02:09.967140','KG'),(28,'Filé',34,15,1,1,NULL,'2024-08-27 14:05:06.656354','2024-08-27 15:02:09.975912','KG'),(29,'Arroz',7,10,1,1,NULL,'2024-08-27 14:05:23.998791','2024-08-27 15:02:09.983667','KG'),(30,'Feijão',7,15,1,1,NULL,'2024-08-27 14:05:49.881391','2024-08-27 15:02:09.988616','KG'),(31,'Acerola',3,5,1,1,NULL,'2024-08-27 14:06:43.461663','2024-08-27 15:02:09.993380','KG'),(32,'Açucar',4,5,1,1,NULL,'2024-08-27 14:06:52.335740','2024-08-27 15:02:09.999126','KG'),(33,'Farinha Branca',4,7,1,1,NULL,'2024-08-27 14:11:28.694039','2024-08-27 15:02:10.005984','KG'),(34,'Farinha Amarela',6,5,1,1,NULL,'2024-08-27 14:11:35.832075','2024-08-27 15:02:10.011769','KG'),(35,'Queijo Coalho',40,5,1,1,NULL,'2024-08-27 14:12:09.442953','2024-08-27 15:02:10.017566','KG'),(36,'Queijo Mussarela',44,5,1,1,NULL,'2024-08-27 15:14:04.001007','2024-08-27 15:14:04.001007','KG'),(37,'Queijo Mussarela',44,10,1,1,NULL,'2024-08-27 15:15:06.718625','2024-08-27 15:15:06.718625','KG'),(38,'Queijo Coalho',40,2,1,1,NULL,'2024-08-28 17:05:31.224698','2024-08-28 17:05:31.224698','KG'),(39,'Poupa de Maracujá',6,2,1,1,NULL,'2024-08-28 17:06:59.991610','2024-08-28 17:06:59.991610','KG'),(40,'Rapadura Preta',5,5,1,1,NULL,'2024-08-28 18:24:21.351787','2024-08-28 18:24:21.351787','UN'),(41,'Coca Cola 1L',5,10,1,1,NULL,'2024-08-28 18:24:31.139964','2024-08-28 18:24:31.139964','L'),(42,'Retirada do Caixa',50,1,1,1,NULL,'2024-09-02 14:12:57.973605','2024-09-02 14:12:57.973605','UN');
/*!40000 ALTER TABLE `spending` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
-- Table structure for table `table`
--

DROP TABLE IF EXISTS `table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `fk_platform` int NOT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `table`
--

LOCK TABLES `table` WRITE;
/*!40000 ALTER TABLE `table` DISABLE KEYS */;
INSERT INTO `table` VALUES (1,'Mesa: 1',0,1,1,1,'2024-05-20 17:09:13.604000','2024-05-20 17:09:13.604000'),(2,'Mesa: 2',0,1,1,1,'2024-05-20 17:09:15.745000','2024-05-20 17:09:15.745000'),(3,'Mesa: 3',0,1,1,1,'2024-05-20 17:09:17.353000','2024-05-20 17:09:17.353000'),(4,'Mesa: 4',0,1,1,1,'2024-05-20 17:09:19.937000','2024-05-20 17:09:19.937000'),(5,'Mesa: 5',0,1,1,1,'2024-05-20 17:09:21.297000','2024-05-20 17:09:21.297000'),(6,'Mesa: 6',0,1,1,1,'2024-05-20 17:09:21.980000','2024-05-20 17:09:21.980000'),(7,'Mesa: 1',1,1,1,NULL,'2024-07-22 18:42:57.562409','2024-07-22 18:42:57.562409'),(8,'Mesa: 2',1,1,1,NULL,'2024-07-22 18:42:58.440707','2024-07-22 18:42:58.440707'),(9,'Mesa: 3',1,1,1,NULL,'2024-07-22 18:42:59.434378','2024-07-22 18:42:59.434378'),(10,'Mesa: 4',1,1,1,NULL,'2024-07-24 20:15:56.533508','2024-07-24 20:15:56.533508'),(11,'Mesa: 5',1,1,1,NULL,'2024-08-29 12:46:51.211332','2024-08-29 12:46:51.211332'),(12,'Mesa: 6',1,1,1,NULL,'2024-08-29 12:46:52.546095','2024-08-29 12:46:52.546095'),(13,'Mesa: 7',1,1,1,NULL,'2024-08-29 12:46:53.532695','2024-08-29 12:46:53.532695'),(14,'Mesa: 8',0,1,1,1,'2024-08-29 12:46:57.614000','2024-08-29 12:46:57.614000'),(15,'Mesa: 9',0,1,1,1,'2024-08-29 12:46:58.947000','2024-08-29 12:46:58.947000'),(16,'Mesa: 8',0,1,1,1,'2024-08-29 12:49:38.995000','2024-08-29 12:49:38.995000'),(17,'Mesa: 8',1,1,1,1,'2024-08-29 12:49:45.899000','2024-08-29 12:49:45.899000'),(18,'Mesa: 1',1,5,9,NULL,'2024-08-29 18:25:12.201089','2024-08-29 18:25:12.201089'),(19,'Mesa: 1',1,6,11,NULL,'2025-09-29 16:31:27.153959','2025-09-29 16:31:27.153959'),(20,'Mesa: 2',1,6,11,NULL,'2025-09-29 16:31:28.082291','2025-09-29 16:31:28.082291'),(21,'Mesa: 3',1,6,11,NULL,'2025-09-29 16:31:28.924127','2025-09-29 16:31:28.924127'),(22,'Mesa: 4',1,6,11,NULL,'2025-09-29 16:39:11.940472','2025-09-29 16:39:11.940472');
/*!40000 ALTER TABLE `table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unit_measurement`
--

DROP TABLE IF EXISTS `unit_measurement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unit_measurement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unit_measurement`
--

LOCK TABLES `unit_measurement` WRITE;
/*!40000 ALTER TABLE `unit_measurement` DISABLE KEYS */;
INSERT INTO `unit_measurement` VALUES (1,'KG','Quilo','2024-07-11 19:04:34.215608','2025-09-29 16:35:54.320132'),(2,'g','Gramas','2024-07-11 19:04:34.222985','2025-09-29 16:35:54.326461'),(3,'L','Litro','2024-07-11 19:04:34.228739','2025-09-29 16:35:54.329953'),(4,'ml','Mililitro','2024-07-11 19:04:34.234985','2025-09-29 16:35:54.333937'),(5,'CX','Caixa','2024-07-11 19:04:34.243014','2025-09-29 16:35:54.337799'),(13,'UN','Unidade','2024-07-11 19:27:17.863554','2025-09-29 16:35:54.342055'),(14,'PC','Pacote','2024-07-11 20:24:02.233702','2025-09-29 16:35:54.345616');
/*!40000 ALTER TABLE `unit_measurement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cpf` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `fk_company` int DEFAULT NULL,
  `fk_user_type` int DEFAULT NULL,
  `fk_platform` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9ea475fb82154af6f2840724479` (`fk_company`),
  KEY `FK_9baca1a64c5ccaf59c4ea09050c` (`fk_user_type`),
  KEY `FK_13c0bd3b36f6cdcbbcf199967b9` (`fk_platform`),
  CONSTRAINT `FK_13c0bd3b36f6cdcbbcf199967b9` FOREIGN KEY (`fk_platform`) REFERENCES `platform` (`id`),
  CONSTRAINT `FK_9baca1a64c5ccaf59c4ea09050c` FOREIGN KEY (`fk_user_type`) REFERENCES `user_type` (`id`),
  CONSTRAINT `FK_9ea475fb82154af6f2840724479` FOREIGN KEY (`fk_company`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (11,NULL,'matheus2096lima@gmail.com','Matheus Lima','$2a$10$CgWRAmQxw/EGGRBl/3xtku8xHhdpkWZpUz8f8/jbae6r.2U.TEvRK',1,NULL,NULL,'2025-09-29 16:30:59.525423','2025-09-29 16:30:59.525423',NULL,10,6);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_type`
--

LOCK TABLES `user_type` WRITE;
/*!40000 ALTER TABLE `user_type` DISABLE KEYS */;
INSERT INTO `user_type` VALUES (10,'SUPER','2025-09-29 16:30:51.418078','2025-09-29 16:30:51.418078'),(11,'ADM','2025-09-29 16:30:51.425525','2025-09-29 16:30:51.425525'),(12,'CUSTOMER','2025-09-29 16:30:51.430617','2025-09-29 16:30:51.430617'),(13,'WAITER','2025-09-29 16:30:51.434878','2025-09-29 16:30:51.434878'),(14,'DELIVERYMAN','2025-09-29 16:30:51.439021','2025-09-29 16:30:51.439021'),(15,'COOK','2025-09-29 16:30:51.443704','2025-09-29 16:30:51.443704');
/*!40000 ALTER TABLE `user_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'db_restaurants'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-29 13:53:56
