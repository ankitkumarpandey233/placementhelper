-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 03, 2023 at 11:25 PM
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
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `cgpa` int(11) DEFAULT 0,
  `marks10` int(11) DEFAULT 0,
  `marks12` int(11) DEFAULT 0,
  `location` varchar(200) NOT NULL DEFAULT '0',
  `package` int(11) NOT NULL DEFAULT 0,
  `startingDate` date DEFAULT NULL,
  `endingDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`name`, `email`, `password`, `description`, `cgpa`, `marks10`, `marks12`, `location`, `package`, `startingDate`, `endingDate`) VALUES
('XNXX', 'xnxx@gmail.com', '$2b$10$405VrldSitSMXo03d5iQKu6kPf7Svsh2E0WAYoUNarYJonk7GKkMW', 'hii we are XNXX', 4, 23, 23, 'Ahemdabad', 4, '2023-07-12', '2023-07-26'),
('TCS', 'tcs@gmail.com', '$2b$10$bFD8.YyF02twcXKRETc/9.gNv2/jtnABlHM7llS/m1Z6dy9jaX/pi', 'hii we are tcs', 0, 23, 0, 'Ahemdabad', 6, '2023-07-03', '2023-07-19'),
('BAJAJ', 'bajaj@gmail.com', '$2b$10$gSxSU1Ch6hJH2DOHcF.xs.tH7r4RyMt6TrbheIUwHrp4/Ohyr2YcG', 't is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content he', 10, 23, 99, 'Ahemdabad', 12, '2023-07-13', '2023-07-26');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
