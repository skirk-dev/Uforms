CREATE DATABASE  IF NOT EXISTS `uforms` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `uforms`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: uforms
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `formulario`
--

DROP TABLE IF EXISTS `formulario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formulario` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Titulo` varchar(50) NOT NULL,
  `FechaCreacion` datetime NOT NULL,
  `Descripcion` varchar(300) NOT NULL,
  `Estado` varchar(20) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formulario`
--

LOCK TABLES `formulario` WRITE;
/*!40000 ALTER TABLE `formulario` DISABLE KEYS */;
INSERT INTO `formulario` VALUES (24,'UDI ACTUALIZADO','2023-11-16 02:49:19','UDI BUC','OCULTO');
/*!40000 ALTER TABLE `formulario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formulario_usuario`
--

DROP TABLE IF EXISTS `formulario_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formulario_usuario` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `FechaSolucion` date NOT NULL,
  `ID_Formulario` int NOT NULL,
  `ID_Usuario` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Formulario_FormUsu_idx` (`ID_Formulario`),
  KEY `ID_Usuario_FormUsu_idx` (`ID_Usuario`),
  CONSTRAINT `ID_Formulario_FormUsu` FOREIGN KEY (`ID_Formulario`) REFERENCES `formulario` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ID_Usuario_FormUsu` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuario` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formulario_usuario`
--

LOCK TABLES `formulario_usuario` WRITE;
/*!40000 ALTER TABLE `formulario_usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `formulario_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `opcionespregunta`
--

DROP TABLE IF EXISTS `opcionespregunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opcionespregunta` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Opciones` varchar(50) NOT NULL,
  `ID_PREGUNTAS` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Pregunta_Opcpregunt_idx` (`ID_PREGUNTAS`),
  CONSTRAINT `ID_Pregunta_Opcpregunt` FOREIGN KEY (`ID_PREGUNTAS`) REFERENCES `pregunta` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opcionespregunta`
--

LOCK TABLES `opcionespregunta` WRITE;
/*!40000 ALTER TABLE `opcionespregunta` DISABLE KEYS */;
/*!40000 ALTER TABLE `opcionespregunta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pregunta`
--

DROP TABLE IF EXISTS `pregunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pregunta` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `TextoEnunciado` varchar(300) NOT NULL,
  `Tipo de pregunta` varchar(50) NOT NULL,
  `ID_Formulario_Pregunta` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Formulario_pregunta_idx` (`ID_Formulario_Pregunta`),
  CONSTRAINT `ID_Formulario_pregunta` FOREIGN KEY (`ID_Formulario_Pregunta`) REFERENCES `formulario` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pregunta`
--

LOCK TABLES `pregunta` WRITE;
/*!40000 ALTER TABLE `pregunta` DISABLE KEYS */;
/*!40000 ALTER TABLE `pregunta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `programa`
--

DROP TABLE IF EXISTS `programa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `programa` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(20) NOT NULL,
  `Codigo` varchar(20) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programa`
--

LOCK TABLES `programa` WRITE;
/*!40000 ALTER TABLE `programa` DISABLE KEYS */;
INSERT INTO `programa` VALUES (1,'Ing Sistemas','20410');
/*!40000 ALTER TABLE `programa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `respuesta`
--

DROP TABLE IF EXISTS `respuesta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `respuesta` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `TextoContestacion` varchar(300) NOT NULL,
  `fecha` date NOT NULL,
  `ID_PREGUNTA_RESPUESTA` int DEFAULT NULL,
  `ID_USUARIO_RESPUESTA` int DEFAULT NULL,
  `ID_FORMULARIO_RESPUESTA` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Pregunta_Respuesta_idx` (`ID_PREGUNTA_RESPUESTA`),
  KEY `ID_Usuario_Respuesta_idx` (`ID_USUARIO_RESPUESTA`),
  KEY `ID_Formulario_Respuesta_idx` (`ID_FORMULARIO_RESPUESTA`),
  CONSTRAINT `ID_Formulario_Respuesta` FOREIGN KEY (`ID_FORMULARIO_RESPUESTA`) REFERENCES `formulario` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ID_Pregunta_Respuesta` FOREIGN KEY (`ID_PREGUNTA_RESPUESTA`) REFERENCES `pregunta` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ID_Usuario_Respuesta` FOREIGN KEY (`ID_USUARIO_RESPUESTA`) REFERENCES `usuario` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `respuesta`
--

LOCK TABLES `respuesta` WRITE;
/*!40000 ALTER TABLE `respuesta` DISABLE KEYS */;
/*!40000 ALTER TABLE `respuesta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sede`
--

DROP TABLE IF EXISTS `sede`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sede` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(20) NOT NULL,
  `UbicacionDepartamento` varchar(20) NOT NULL,
  `UbicacionCiudad` varchar(20) NOT NULL,
  `UbicacionDireccion` varchar(20) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sede`
--

LOCK TABLES `sede` WRITE;
/*!40000 ALTER TABLE `sede` DISABLE KEYS */;
INSERT INTO `sede` VALUES (1,'UDI Bucaramanga','Santander','Bucaramanga','Calle 9 No. 23-55');
/*!40000 ALTER TABLE `sede` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sedeprograma`
--

DROP TABLE IF EXISTS `sedeprograma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sedeprograma` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_PROGRAMAsede` int NOT NULL,
  `ID_Sedeprograma` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Programa_Sedeprog_idx` (`ID_PROGRAMAsede`),
  KEY `ID_Sede_Sedeprog_idx` (`ID_Sedeprograma`),
  CONSTRAINT `ID_Programa_Sedeprog` FOREIGN KEY (`ID_PROGRAMAsede`) REFERENCES `programa` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ID_Sede_Sedeprog` FOREIGN KEY (`ID_Sedeprograma`) REFERENCES `sede` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sedeprograma`
--

LOCK TABLES `sedeprograma` WRITE;
/*!40000 ALTER TABLE `sedeprograma` DISABLE KEYS */;
/*!40000 ALTER TABLE `sedeprograma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `CedulaNumero` int NOT NULL,
  `NombreCompletoNombre` varchar(20) NOT NULL,
  `NombreCompletoApellido` varchar(20) NOT NULL,
  `Rol` varchar(20) NOT NULL,
  `Alias` varchar(20) NOT NULL,
  `Contrasena` varchar(20) NOT NULL,
  `Correo` varchar(50) NOT NULL,
  `Id_Sede` int NOT NULL,
  `ID_PROGRAMA` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `ID_Sede_Usuario_idx` (`Id_Sede`),
  KEY `ID_Programa_Usuario_idx` (`ID_PROGRAMA`),
  CONSTRAINT `ID_Programa_Usuario` FOREIGN KEY (`ID_PROGRAMA`) REFERENCES `programa` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ID_Sede_Usuario` FOREIGN KEY (`Id_Sede`) REFERENCES `sede` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,12345678,'Akame','San','Estudiante','Akame','Akame','Akame@night.com',1,1),(2,123455268,'Henry','Pacheco','Administrador','Henry','Henry','Henry@basex.com',1,1);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'uforms'
--

--
-- Dumping routines for database 'uforms'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-16  2:55:22
