-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 08, 2023 at 05:27 AM
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
-- Table structure for table `rejected`
--

CREATE TABLE `rejected` (
  `studentEmail` varchar(100) DEFAULT NULL,
  `studentName` varchar(100) DEFAULT NULL,
  `companyEmail` varchar(100) DEFAULT NULL,
  `companyName` varchar(100) DEFAULT NULL,
  `studentEnrollment` varchar(100) DEFAULT NULL,
  `round` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rejected`
--

INSERT INTO `rejected` (`studentEmail`, `studentName`, `companyEmail`, `companyName`, `studentEnrollment`, `round`) VALUES
('narayan@gmail.com', 'Narayan Mohata', 'ola@gmail.com', 'ola', NULL, 1),
('dhirajmohata86@gmail.com', 'Dhiraj mohata', 'xyz@gmail.com', 'XYZ', NULL, 3),
('rudra@gmail.com', 'rudra', 'ola@gmail.com', 'ola', NULL, 3),
('masi@gmail.com', 'masi', 'ola@gmail.com', 'ola', NULL, 3),
('radheshaym@gmail.com', 'radheshyam', 'tcs@gmail.com', 'TCS', NULL, 3);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
