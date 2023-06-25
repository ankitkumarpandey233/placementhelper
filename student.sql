-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 23, 2023 at 05:53 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

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
  id INT PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `cpassword` varchar(100) NOT NULL,
  `enrollment` varchar(100) NOT NULL,
  `birthDate` date NOT NULL,
  `mobile` varchar(100) NOT NULL,
  `marks10` float NOT NULL,
  `marks12` float NOT NULL,
  `cgpa` float NOT NULL,
  `skills` varchar(1000) NOT NULL,
  `linkedin` varchar(100) NOT NULL,
  `github` varchar(100) NOT NULL,
  `otherid` varchar(100) NOT NULL,
  `photo` blob NOT NULL,
  `resume` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

-- INSERT INTO `student` (`name`, `email`, `password`, `cpassword`, `enrollment`, `birthDate`, `mobile`, `marks10`, `marks12`, `cgpa`, `skills`, `linkedin`, `github`, `otherid`, `photo`, `resume`) VALUES
-- ('Piyush Mohata', 'piyushmohata2002@gmail.com', '$2b$10$UqfhEh1HfxpWeAb1wOpezupMOuDvLXPRtvOmApzpu3RlvUdp3mxuG', '$2b$10$UqfhEh1HfxpWeAb1wOpezupMOuDvLXPRtvOmApzpu3RlvUdp3mxuG', '1', '2023-06-24', '8866228119', 12, 13, 1, '\"c++\"', 'qwerty', 'ybb', 'vgjh', 0x576861747341707020496d61676520323032322d30382d32382061742031332e30342e31302e6a7067, 0x446174612053747275637475726520496e74657276696577205175657374696f6e73202620416e737765722e706466),
-- ('Saurabh', 'rs508894@gmail.com', '$2b$10$KY16mCKeYx0YYcN9.YPl0ejpuSG1AoCJ5RcZ0pEBPP.p2g2.WdXka', '$2b$10$KY16mCKeYx0YYcN9.YPl0ejpuSG1AoCJ5RcZ0pEBPP.p2g2.WdXka', '12', '2023-06-23', '8866228119', 12, 13, 1, '\"c++\"', 'qwerty', 'ybb', 'vgjh', 0x6c6f676f2e706e67, 0x52657072696e745f3838313033353334343236363531322e706466);
-- COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



