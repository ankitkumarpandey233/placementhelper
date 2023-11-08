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
  `endingDate` date DEFAULT NULL,
  `round` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`name`, `email`, `password`, `description`, `cgpa`, `marks10`, `marks12`, `location`, `package`, `startingDate`, `endingDate`, `round`) VALUES
('TCS', 'tcs@gmail.com', '$2b$10$bFD8.YyF02twcXKRETc/9.gNv2/jtnABlHM7llS/m1Z6dy9jaX/pi', 'hii we are tcs', 0, 23, 0, 'Ahemdabad', 6, '2023-07-03', '2023-07-19', 4),
('BAJAJ', 'bajaj@gmail.com', '$2b$10$gSxSU1Ch6hJH2DOHcF.xs.tH7r4RyMt6TrbheIUwHrp4/Ohyr2YcG', 't is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content he', 10, 23, 99, 'Ahemdabad', 12, '2023-07-13', '2023-07-26', 0),
('MIVI', 'mivi@gmail.com', '$2b$10$Vd.t8dHk7WEOGZl6jcRua.bNsln2hgW7JcxkqR1IJaMA8/7otpeG.', 't is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content he', 2, 1, 1, 'Ahemdabad', 6, '2023-07-04', '2023-07-21', 0),
('BOAT', 'boat@gmail.com', '$2b$10$SRdwmMJnvmRSGIdGLKjtsustdMrn7urAHjLWLpvDwP.f0ECD0TQ5O', 't is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content he', 1, 23, 2, 'Ahemdabad', 6, '2023-07-05', '2023-07-29', 0),
('TATA', 'tata@gmail.com', '$2b$10$jrEZZsl5zdzg8/.zSRKxcuC2nPNx9DtkDx3AUiqkPIIKb6VTXSF4G', 't is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content he', 1, 23, 2, 'Ahemdabad', 7, '2023-07-04', '2023-07-21', 0),
('OPPO', 'oppo@gmail.com', '$2b$10$oBUi4NmHxRzGz0icr4kvj.Q0JdqdEWPL8KpyCbh3bLz7esiO./vz2', 't is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content he', 1, 23, 23, 'Ahemdabad', 9, '2023-07-04', '2023-07-20', 0),
('APPLE', 'apple@gmail.com', '$2b$10$Wpdaq2FvxgGt4EEwfzLVw.bxNxeAGv83rWvKgetCM.ICTlpSLdW56', 't is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content he', 4, 23, 23, 'Ahemdabad', 9, '2023-07-12', '2023-07-19', 0),
('SONY', 'sony@gmail.com', '$2b$10$JskcK/xPAkCte0qsuWWmReLZEpATeNDZPXMnqQCzyInGXvJvb6jci', 't is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content he', 10, 99, 99, 'Ahemdabad', 23, '2023-07-04', '2023-07-13', 0),
('XYZ', 'xyz@gmail.com', '$2b$10$yWjPwaG2MiJtLAroSbz50OhiPJ0K9M8LaDhndUn0GQkucbbnZWhwG', 't is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content he', 4, 23, 23, 'Ahemdabad', 9, '2023-07-14', '2023-07-28', 11),
('ola', 'ola@gmail.com', '$2b$10$47TdEd6hqUJW5XRFXleBm.qJN1gp0VHAsU6RgLwOHDADb1tut/BNG', 't is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content he', 1, 21, 21, 'Ahemdabad', 13, '2023-09-11', '2023-12-30', 3);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
