-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 08, 2023 at 05:26 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `college`
--

-- --------------------------------------------------------

--
-- Table structure for table `applied`
--

CREATE TABLE `applied` (
  `studentEmail` varchar(100) DEFAULT NULL,
  `studentName` varchar(100) DEFAULT NULL,
  `companyEmail` varchar(100) DEFAULT NULL,
  `companyName` varchar(100) DEFAULT NULL,
  `studentEnrollment` varchar(100) DEFAULT NULL,
  `next` int(11) NOT NULL DEFAULT 0,
  `round` int(11) NOT NULL DEFAULT 0,
  `selected` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `applied`
--

INSERT INTO `applied` (`studentEmail`, `studentName`, `companyEmail`, `companyName`, `studentEnrollment`, `next`, `round`, `selected`) VALUES
('dhirajmohata86@gmail.com', 'Dhiraj mohata', 'tcs@gmail.com', 'TCS', '21012011053', 1, 4, 1),
('dhirajmohata86@gmail.com', 'Dhiraj mohata', 'mivi@gmail.com', 'MIVI', '21012011053', 0, 0, 0),
('dhirajmohata86@gmail.com', 'Dhiraj mohata', 'boat@gmail.com', 'BOAT', '21012011053', 0, 0, 0),
('dhirajmohata86@gmail.com', 'Dhiraj mohata', 'tata@gmail.com', 'TATA', '21012011053', 0, 0, 0),
('narayan@gmail.com', 'Narayan Mohata', 'tcs@gmail.com', 'TCS', '21012011112', 1, 4, 1),
('dhirajmohata86@gmail.com', 'Dhiraj mohata', 'ola@gmail.com', 'ola', '21012011053', 0, 3, 1),
('guddu@gmail.com', 'Guddu', 'ola@gmail.com', 'ola', '21012011112', 0, 3, 1),
('manan@gmail.com', 'Manan Thakar', 'ola@gmail.com', 'ola', '21012011112', 0, 3, 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
