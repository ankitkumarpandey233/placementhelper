-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 16, 2024 at 07:54 PM
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
  `selected` int(11) NOT NULL DEFAULT 0,
  `resume` varchar(1000) DEFAULT NULL,
  `package` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `applied`
--

INSERT INTO `applied` (`studentEmail`, `studentName`, `companyEmail`, `companyName`, `studentEnrollment`, `next`, `round`, `selected`, `resume`, `package`) VALUES
('ankit@gmail.com', 'Ankit Kumar Pandey', 'phonepe@mail.com', 'PhonePe', '21012011162', 0, 0, 0, 'MyResumeF (3).pdf', 12),
('ankit@gmail.com', 'Ankit Kumar Pandey', 'amazon@mail.com', 'Amazon', '21012011162', 0, 0, 0, 'MyResumeF (3).pdf', 12);

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
('fake', 'fake@gmail.com', '$2b$10$Htofqr2CL1bD0ngCd342Tuk4bYIlICtMFcStC8moZDuu.02m9zLO6', 'Microsoft,', 0, 0, 0, 'Ahmedabad', 8, '2024-01-12', '2024-01-24', 0),
('JPMorgan Chase & Co', 'morgan@mail.com', '$2b$10$ZmZMTH9pWODc.OHboHe/p.WYoh0NJ.CVPGW6woXTyNeXz465v52vK', 'JPMorgan Chase & Co. is an American multinational financial services firm headquartered in New York City and incorporated in Delaware. It is the largest bank in the United States and the world\'s largest bank by market capitalization as of 2023.', 7, 70, 75, 'London', 18, '2024-02-03', '2024-02-12', 5),
('Morgan Stanley', 'm@mail.com', '$2b$10$kLPPNiTpyi/un2ifi3hrReQdl/nyFoCIBAnMtfn9JHt8cHeT0jBfu', 'Morgan Stanley is an American multinational investment bank and financial services company headquartered at 1585 Broadway in Midtown Manhattan, New York City. With offices in 41 countries and more than 75,000 employees, the firm\'s clients include corporations, governments, institutions, and individu', 7, 70, 50, 'Pune', 20, '2024-02-03', '2024-02-07', 0),
('Paytm', 'paytm@mail.com', '$2b$10$9OtORC4Ym.9WNwmjcB4nyetteixZCZaLB0IqgwrpWXyH/4zB3VzEm', 'Paytm is an Indian multinational financial technology company, that specializes in digital payments and financial services, based in Noida, India. It was founded in 2010 by Vijay Shekhar Sharma under One97 Communications', 7, 70, 60, 'Pune', 18, '2024-02-04', '2024-02-18', 15),
('PhonePe', 'phonepe@mail.com', '$2b$10$2CwN1qbdBMRAhuqBx3yrAepdhp9ZbaqmwlbLIXIbtM1C0rmZX/VNG', 'PhonePe is an Indian digital payments and financial services company headquartered in Bengaluru, Karnataka, India. PhonePe was founded in December 2015, by Sameer Nigam, Rahul Chari and Burzin Engineer.', 7, 70, 70, 'Pune', 12, '2024-02-11', '2024-02-29', 0),
('Amazon', 'amazon@mail.com', '$2b$10$6HCXBXdAMJlGlUUcKoFsv.qRk93S75S0EIN4DOK2t8iZBRH1sLkGC', 'Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing, online advertising, digital streaming, and artificial intelligence. It is considered one of the Big Five American technology companies;', 7, 70, 70, 'Banglore', 12, '2024-02-05', '2024-02-26', 0),
('Tata', 'tata@gmail.com', '$2b$10$BfF2RVSiA3AfjItIhhx2m./REWFg5V/sUk7ylc4oL9mLrBAJ7Cx.O', 'Tata Motors Limited is an Indian Multinational automotive company, headquartered in Mumbai and part of the Tata Group. The company produces cars, trucks, vans, and busses. Subsidiaries include British Jaguar Land Rover and South Korean Tata Daewoo', 2, 7, 6, 'Ahmedabad', 6, '2024-02-05', '2024-02-08', 0);

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
  `round` int(11) NOT NULL DEFAULT 0,
  `resume` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rejectedcompanies`
--

CREATE TABLE `rejectedcompanies` (
  `companyEmail` varchar(1000) DEFAULT NULL,
  `companyName` varchar(1000) DEFAULT NULL,
  `studentEmail` varchar(1000) DEFAULT NULL,
  `studentName` varchar(1000) DEFAULT NULL,
  `package` int(11) NOT NULL DEFAULT 0,
  `resume` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rejectedcompanies`
--

INSERT INTO `rejectedcompanies` (`companyEmail`, `companyName`, `studentEmail`, `studentName`, `package`, `resume`) VALUES
('paytm@mail.com', 'Paytm', 'piyush@gmail.com', 'Ankit Kumar Pandey', 18, 'MyResumeF (3).pdf');

-- --------------------------------------------------------

--
-- Table structure for table `selected`
--

CREATE TABLE `selected` (
  `studentEmail` varchar(1000) DEFAULT NULL,
  `studentName` varchar(1000) DEFAULT NULL,
  `companyEmail` varchar(1000) DEFAULT NULL,
  `companyName` varchar(1000) DEFAULT NULL,
  `studentEnrollment` varchar(1000) DEFAULT NULL,
  `selected` int(11) DEFAULT NULL,
  `resume` varchar(1000) DEFAULT NULL,
  `package` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `selected`
--

INSERT INTO `selected` (`studentEmail`, `studentName`, `companyEmail`, `companyName`, `studentEnrollment`, `selected`, `resume`, `package`) VALUES
('ridhamk.j@gmail.com', 'Ridham Khandar', 'paytm@mail.com', 'Paytm', '21012011133', 1, 'MyResumeF (3).pdf', 18),
('piyush@gmail.com', 'Piyush Mohata', 'paytm@mail.com', 'Paytm', '21012011112', 2, 'MyResumeF (3).pdf', 18);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('eBApqt2ZYptRJ2pwN2ns7WewasVLEAM4', 1708118247, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}');

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
  `resume` varchar(255) DEFAULT NULL,
  `package` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`name`, `email`, `password`, `cpassword`, `enrollment`, `birthDate`, `mobile`, `marks10`, `marks12`, `cgpa`, `skills`, `linkedin`, `github`, `otherid`, `photo`, `allow`, `imgurl`, `resume`, `package`) VALUES
('Ridham Khandar', 'ridhamk.j@gmail.com', '$2b$10$bbQ13yvdk4GR86uuAnfhteaGnIsdyOEqaAIqAVKvPIJ9taj9tW906', '$2b$10$bbQ13yvdk4GR86uuAnfhteaGnIsdyOEqaAIqAVKvPIJ9taj9tW906', '21012011133', '2003-06-17', '7990229711', 86, 86, 8, '[\"Django\",\"Machine learning\"]', 'https://www.linkedin.com/in/ridham-khandar-a71841227', 'https://www.github.com/Rythm18', 'hi', 'ridham.jpg', 1, '', 'MyResumeF (3).pdf', 0),
('Dhiraj Mohata', 'dhiraj@gmail.com', '$2b$10$GW2VD4jAakf7eruen9Iz9emBxbCOaisqw6wfVc20fyjcHgw8s7BhO', '$2b$10$GW2VD4jAakf7eruen9Iz9emBxbCOaisqw6wfVc20fyjcHgw8s7BhO', '21012011053', '2003-07-13', '7990229711', 90, 85, 8, '[\"MERN\",\"Machine learning\"]', 'https://www.linkedin.com/in/ridham-khandar-a71841227', 'https://www.github.com/Rythm18', 'null', 'ridham.jpg', 1, '', 'MyResumeF (2).pdf', 0),
('Piyush Mohata', 'piyush@gmail.com', '$2b$10$306AFM3csbHbYM69.WeMLeukrk001r/AVi9K7gG7qZzSOLtXKhcT.', '$2b$10$306AFM3csbHbYM69.WeMLeukrk001r/AVi9K7gG7qZzSOLtXKhcT.', '21012011112', '2002-12-27', '7990229711', 85, 85, 8, '[\"Django\",\"MERN\"]', 'https://www.linkedin.com/in/ridham-khandar-a71841227', 'https://www.github.com/Rythm18', 'null', 'ridham.jpg', 1, '', 'MyResumeF (3).pdf', 18),
('Ankit Kumar Pandey', 'ankit@gmail.com', '$2b$10$Udd5K/5eW2jO7Y29zwOxueDAKzqFn94mlPHDN0/uDEZp5k7DJJYaO', '$2b$10$Udd5K/5eW2jO7Y29zwOxueDAKzqFn94mlPHDN0/uDEZp5k7DJJYaO', '21012011162', '2002-05-17', '7990229711', 77, 85, 7, '\"Machine learning\"', 'https://www.linkedin.com/in/ridham-khandar-a71841227', 'https://www.github.com/Rythm18', 'null', 'ridham.jpg', 1, '', 'MyResumeF (3).pdf', 18),
('Ravindra Jadeja', 'ravi@gmail.com', '$2b$10$hi/45qI6CKr4QJd98uAmoORVbSjBRb4.8hErc5rWQK9L4Z9jzHzYG', '$2b$10$hi/45qI6CKr4QJd98uAmoORVbSjBRb4.8hErc5rWQK9L4Z9jzHzYG', '21012011108', '2003-06-18', '7990229711', 86, 72, 8.9, NULL, 'https://www.linkedin.com/in/ridham-khandar-a71841227', 'https://www.github.com/Rythm18', NULL, 'shogun.jpeg', 1, '', 'PRACTICAL-2.pdf', 0),
('Virat Kohli', 'virat@gmail.com', '$2b$10$FkQtip0ugRVIqTEf8Sxzv.lSzEEVPN.V0alXcMcNiF2RU0lehrPeq', '$2b$10$FkQtip0ugRVIqTEf8Sxzv.lSzEEVPN.V0alXcMcNiF2RU0lehrPeq', '21012011118', '1988-09-05', '7990229711', 86, 72, 8.9, NULL, 'https://www.linkedin.com/in/ridham-khandar-a71841227', 'https://www.github.com/Rythm18', NULL, 'mywallu.jpg', 1, '', 'student_resume (8).pdf', 0),
('Rohit Sharma', 'rohit@gmail.com', '$2b$10$AXXnQewVCrsGrnLlgYOM4.XHqBqPwW5IVi4XR/3Tks1fx07ndDZci', '$2b$10$AXXnQewVCrsGrnLlgYOM4.XHqBqPwW5IVi4XR/3Tks1fx07ndDZci', '21012011145', '1988-09-17', '7990229711', 72, 81, 7.9, NULL, 'https://www.linkedin.com/in/ridham-khandar-a71841227', 'https://www.github.com/Rythm18', NULL, 'mywallu.jpg', 1, '', 'student_resume (7).pdf', 0);

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
