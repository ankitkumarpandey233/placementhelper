-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 03, 2023 at 11:26 PM
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
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `cpassword` varchar(100) DEFAULT NULL,
  `enrollment` varchar(20) DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  `mobile` varchar(10) DEFAULT NULL,
  `marks10` float DEFAULT NULL,
  `marks12` float DEFAULT NULL,
  `cgpa` float DEFAULT NULL,
  `skills` varchar(255) DEFAULT NULL,
  `linkedin` varchar(100) DEFAULT NULL,
  `github` varchar(100) DEFAULT NULL,
  `otherid` varchar(100) DEFAULT NULL,
  `photo` blob DEFAULT NULL,
  `resume` blob DEFAULT NULL,
  `allow` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`name`, `email`, `password`, `cpassword`, `enrollment`, `birthDate`, `mobile`, `marks10`, `marks12`, `cgpa`, `skills`, `linkedin`, `github`, `otherid`, `photo`, `resume`, `allow`) VALUES
('ankit panda', 'ankit@gmail.com', '$2b$10$2h3l4XqQZiDmjbJssAp7A.r.Xgb4jLV9aZCkPzQLdraRMuuE7sjlS', '$2b$10$2h3l4XqQZiDmjbJssAp7A.r.Xgb4jLV9aZCkPzQLdraRMuuE7sjlS', '21012011112', '2023-06-08', '7405503035', 12, 23, 34, '[\"c++\",\"Communication\"]', 'adf', 'sdvsdfv', 'SDVS', 0x6470206e6f7465732e706466, 0x6470206e6f7465732e706466, 1),
('Dhiraj mohata', 'dhirajmohata86@gmail.com', '$2b$10$9jiTjv6dVe5HP7DMF4ojIeQNiydd1KRiBXjwzXeLZ4aHgDpjnIc3e', '$2b$10$9jiTjv6dVe5HP7DMF4ojIeQNiydd1KRiBXjwzXeLZ4aHgDpjnIc3e', '21012011053', '2023-06-02', '7405503035', 98.7, 78.6, 10, '[\"c++\",\"Communication\",\"java\"]', 'https://www.linkedin.com/in/dhiraj-mohata', 'https://github.com/DhirajMohata', 'SDVS', 0x6470206e6f7465732e706466, 0x446174612053747275637475726573204e6f746573202d205475746f7269616c7344756e6979612e706466, 1),
('piyush mohata', 'mohatadhruv@gmail.com', '$2b$10$/.f8C4963cWlfgqFPzQ5HOmRlta.TkZ0WS/qBJox/WN1ezGc3cCh6', '$2b$10$/.f8C4963cWlfgqFPzQ5HOmRlta.TkZ0WS/qBJox/WN1ezGc3cCh6', '21012011112', '2023-06-10', '7405503035', 23, 23, 2, '\"Communication\"', 'https://www.linkedin.com/in/dhiraj-mohata', 'https://github.com/DhirajMohata', 'SDVS', 0x47554e492e6a7067, 0x6c696e75782d636f6d6d616e64732d68616e64626f6f6b2e706466, 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
