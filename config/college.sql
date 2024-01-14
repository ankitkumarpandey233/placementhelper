-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 14, 2024 at 05:08 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

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
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
('ridhamk.j@gmail.com', 'Ridham Khandar', 'gateway@gmail.com', 'Gateway Corps', '21012011133', 0, 3, 1),
('ankit@gmail.com', 'Ankit kumar pandey', 'gateway@gmail.com', 'Gateway Corps', '21012011162', 0, 3, 1),
('ridhamk.j@gmail.com', 'Ridham Khandar', 'sophos@gmail.com', 'Sophos', '21012011133', 0, 2, 1),
('ak2881680@gmail.com', 'Ankit Pandey', 'gateway@gmail.com', 'Gateway Corps', '21012011162', 1, 0, 0),
('ak2881680@gmail.com', 'Ankit Pandey', 'einfo@gmail.com', 'eInfochips', '21012011162', 0, 3, 1),
('ridhamk.j@gmail.com', 'Ridham Khandar', 'media@gmail.com', 'Media .NET', '21012011133', 0, 2, 1),
('ridhamk.j@gmail.com', 'Ridham Khandar', 'nvidea@gmail.com', 'Nvedia', '21012011133', 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `description` varchar(300) NOT NULL,
  `cgpa` int(11) DEFAULT NULL,
  `marks10` int(11) DEFAULT NULL,
  `marks12` int(11) DEFAULT NULL,
  `location` varchar(200) NOT NULL,
  `package` int(11) NOT NULL,
  `startingDate` date NOT NULL,
  `endingDate` date NOT NULL,
  `round` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`name`, `email`, `password`, `description`, `cgpa`, `marks10`, `marks12`, `location`, `package`, `startingDate`, `endingDate`, `round`) VALUES
('Gateway Corps', 'gateway@gmail.com', '$2b$10$xRkGu.fCR5Jy67KDWNK6XOy9xWbWLXGQmWiUg5Ogyk/tYymiuUvYC', 'An Arrow company', 6, 0, 0, 'Ahmedabad', 4, '2023-11-05', '2023-11-12', 3),
('eInfochips', 'einfo@gmail.com', '$2b$10$AJ.ipRXqrnBmmgsdURu1ueV.KOwwMLLc7fVfr3hQ09gnF9RBoWlSO', 'An Arrow company', 6, 0, 0, 'Gandhinagar', 6, '2023-11-07', '2023-11-20', 3),
('Google', 'google@gmail.com', '$2b$10$SdvtZtBm0//1dlM/5fl7WODkiwz19ieUm8RndZxSqcy6J1SlXBliu', 'Google Inc.', 9, 0, 0, 'Hyderabad', 12, '2023-11-15', '2023-11-16', 2),
('Media .NET', 'net@gmail.com', '$2b$10$ruin.7YBY8WlWgU8i9nu6O0sL4o/DkJrbvwjRnJ4.ExLtx0dbMGjq', 'Media.net is a leading online ad-tech company that develops innovative products for advertisers and publishers.', 8, 0, 0, 'Pune', 8, '2023-11-11', '2023-11-12', 0),
('Sophos', 'sophos@gmail.com', '$2b$10$F6JgmoM7Wmz8xCnKrkzbQ.yEt4LtxW4gwstSmFQPyZeZAp9V4NqUa', 'Sophos Group plc is a British-based security software and hardware company.', 7, 0, 0, 'Ahmedabad', 4, '2023-11-07', '2023-11-11', 2),
('Media .NET', 'media@gmail.com', '$2b$10$vbssl0npf4NHEg4tVL0MRO7Rm5mCcyZb2X0KqsKGrAErKrRciGw.u', 'Leading Cloud Architecture Comapany', 7, 0, 0, 'Ahmedabad', 10, '2023-11-09', '2023-11-12', 2),
('Nvedia', 'nvidea@gmail.com', '$2b$10$xiW0jZwc9UWMC0su65Dzl.5/IDZhNCa4hsdNUn8dqtv0eJyaX8h7.', 'An Arrow company', 7, 60, 60, 'Banglore', 12, '2023-12-01', '2023-12-24', 1),
('RAAPID', 'raapid@gmail.com', '$2b$10$Nhbk.oP5yvwY6ZPAzvYpy.a1kd3EnDqazsowEDtSreaDeb8HVC/RO', 'Leading Cloud Architecture Comapany', 6, 60, 60, 'Ahmedabad', 8, '2023-12-10', '2023-12-17', 0),
('fake', 'fake@gmail.com', '$2b$10$Htofqr2CL1bD0ngCd342Tuk4bYIlICtMFcStC8moZDuu.02m9zLO6', 'Microsoft,', 0, 0, 0, 'Ahmedabad', 8, '2024-01-12', '2024-01-24', 0);

-- --------------------------------------------------------

--
-- Table structure for table `notice`
--

CREATE TABLE `notice` (
  `title` varchar(300) DEFAULT NULL,
  `notice` varchar(2000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notice`
--

INSERT INTO `notice` (`title`, `notice`) VALUES
('Registration Started!', 'Dear Students, the registrations for placement process has been started, kindly register before 15/11/2023.'),
('New Notice', 'Dear Students, the registrations for SOPHOS will start from 09/10/2023. Make sure to register on time.'),
('Here We add Notice', 'here you go');

-- --------------------------------------------------------

--
-- Table structure for table `rejected`
--

CREATE TABLE `rejected` (
  `studentEmail` varchar(100) DEFAULT NULL,
  `studentName` varchar(100) DEFAULT NULL,
  `companyEmail` varchar(100) DEFAULT NULL,
  `companyName` varchar(100) DEFAULT NULL,
  `round` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rejected`
--

INSERT INTO `rejected` (`studentEmail`, `studentName`, `companyEmail`, `companyName`, `round`) VALUES
('ankit@gmail.com', 'Ankit kumar pandey', 'sophos@gmail.com', 'Sophos', 0),
('ankit@gmail.com', 'Ankit kumar pandey', 'einfo@gmail.com', 'eInfochips', 0),
('ridhamk.j@gmail.com', 'Ridham Khandar', 'einfo@gmail.com', 'eInfochips', 2);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `photo` varchar(255) DEFAULT NULL,
  `allow` int(11) NOT NULL DEFAULT 0,
  `imgurl` varchar(1000) NOT NULL,
  `resume` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`name`, `email`, `password`, `cpassword`, `enrollment`, `birthDate`, `mobile`, `marks10`, `marks12`, `cgpa`, `skills`, `linkedin`, `github`, `otherid`, `photo`, `allow`, `imgurl`, `resume`) VALUES
('Ridham Khandar', 'ridhamk.j@gmail.com', '$2b$10$hwjVosYCIKeXfaRvjwldceZU4Tdyq2E7H5W8rdTuAvhTI8NVIsw6i', '$2b$10$VUalODLWYwtVhrzqEAEFxOqejaI3Xcd/ta9D4DVwA5EaTKGkRV3E.', '21012011133', '2003-06-17', '7990229711', 86, 82, 7.9, '[\"DevOps\",\"CI/CD Pipelines\"]', 'https://www.linkedin.com/in/ridham-khandar-a71841227', 'https://www.github.com/Rythm18', '', 'ridham.jpg', 1, '', 'MyResumeF (1).pdf'),
('Ankit kumar pandey', 'ankit@gmail.com', '$2b$10$j4WC6S0Yx3M2iR38hhyoeewFJl21otgulLromKGyZjFVYldp.NBJG', '$2b$10$j4WC6S0Yx3M2iR38hhyoeewFJl21otgulLromKGyZjFVYldp.NBJG', '21012011162', '2002-12-18', '7990549972', 77, 81, 8.9, '\"Frontend Development\"', 'https://www.linkedin.com/in/ridham-khandar-a71841227', 'https://www.github.com/Rythm18', '', 'Me - Ashok Vishwakarma 11.png', 1, '', 'Sandeep M.pdf'),
('Dhiraj Mohata', 'dhiraj@gmail.com', '$2b$10$rBGxyrVgF.iJh.TYzzD2ROgVNhNag8SeE5q1iSf2PlZst0XHJD8LG', '$2b$10$rBGxyrVgF.iJh.TYzzD2ROgVNhNag8SeE5q1iSf2PlZst0XHJD8LG', '21012011053', '2003-07-12', '7292829714', 86, 79, 7.1, '\"Backend Developer\"', 'https://www.linkedin.com/in/ridham-khandar-a71841227', 'https://www.github.com/Rythm18', '', 'IMG_0220.JPG', 1, '', 'Abstract.pdf'),
('Ankit Pandey', 'ak2881680@gmail.com', '$2b$10$j.8M6SzFkLswukRSZC5tqOeHNte16n.eHstmPNaXcFBTRVIL.VUGC', '$2b$10$j.8M6SzFkLswukRSZC5tqOeHNte16n.eHstmPNaXcFBTRVIL.VUGC', '21012011162', '2003-07-09', '7990229711', 77, 72, 7.1, '\"Django\"', 'https://www.linkedin.com/in/ridham-khandar-a71841227', 'https://www.github.com/Rythm18', '', 'IMG_0426.JPG', 1, '', 'Sandeep M.pdf'),
('Piyush Mohata', 'piyushmohata21@gnu.ac.in', '$2b$10$7wOxJbe5YN6bVkX9fuNGO.ps3iCaD06HrDGczq1MiK1AKOBipWIq2', '$2b$10$7wOxJbe5YN6bVkX9fuNGO.ps3iCaD06HrDGczq1MiK1AKOBipWIq2', '21012011133', '2003-06-11', '7990229711', 86, 81, 9, '\"Machine learning\"', 'https://www.linkedin.com/in/ridham-khandar-a71841227', 'https://www.github.com/Rythm18', '', 'IMG_0403-01.jpeg', 1, '', 'first resume (2).pdf'),
('Virat Kohli', 'mohatadhruv@gmail.com', '$2b$10$ip2rGkF61HCDJEMmzPgOGeUGwMV7Boyut2UaG1OpWxUmOw7DjG0FS', '$2b$10$ip2rGkF61HCDJEMmzPgOGeUGwMV7Boyut2UaG1OpWxUmOw7DjG0FS', '21012011133', '2003-04-10', '7990229711', 86, 82, 8.2, '\"Machine learning\"', 'https://www.linkedin.com/in/ridham-khandar-a71841227', 'https://www.github.com/Rythm18', '', '71st].png', 1, '', 'merege upar.pdf');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
