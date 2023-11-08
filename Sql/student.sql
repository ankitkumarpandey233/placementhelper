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
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `cpassword` varchar(100) NOT NULL,
  `enrollment` varchar(20) NOT NULL,
  `birthDate` date NOT NULL,
  `mobile` varchar(10) NOT NULL,
  `marks10` float NOT NULL,
  `marks12` float NOT NULL,
  `cgpa` float NOT NULL,
  `skills` varchar(255) NOT NULL,
  `linkedin` varchar(100) NOT NULL,
  `github` varchar(100) NOT NULL,
  `otherid` varchar(100) NOT NULL,
  `photo` varchar(300) DEFAULT NULL,
  `resume` varchar(300) DEFAULT NULL,
  `allow` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`name`, `email`, `password`, `cpassword`, `enrollment`, `birthDate`, `mobile`, `marks10`, `marks12`, `cgpa`, `skills`, `linkedin`, `github`, `otherid`, `photo`, `resume`, `allow`) VALUES
('ankit panda', 'ankit@gmail.com', '$2b$10$2h3l4XqQZiDmjbJssAp7A.r.Xgb4jLV9aZCkPzQLdraRMuuE7sjlS', '$2b$10$2h3l4XqQZiDmjbJssAp7A.r.Xgb4jLV9aZCkPzQLdraRMuuE7sjlS', '21012011112', '2023-06-08', '7405503035', 12, 23, 34, '[\"c++\",\"Communication\"]', 'adf', 'sdvsdfv', 'SDVS', 'dp notes.pdf', 'dp notes.pdf', 1),
('Dhiraj mohata', 'dhirajmohata86@gmail.com', '$2b$10$9jiTjv6dVe5HP7DMF4ojIeQNiydd1KRiBXjwzXeLZ4aHgDpjnIc3e', '$2b$10$9jiTjv6dVe5HP7DMF4ojIeQNiydd1KRiBXjwzXeLZ4aHgDpjnIc3e', '21012011053', '2023-06-02', '7405503035', 98.7, 78.6, 10, '[\"c++\",\"Communication\",\"java\"]', 'https://www.linkedin.com/in/dhiraj-mohata', 'https://github.com/DhirajMohata', 'SDVS', 'dp notes.pdf', 'Data Structures Notes - TutorialsDuniya.pdf', 1),
('piyush mohata', 'mohatadhruv@gmail.com', '$2b$10$/.f8C4963cWlfgqFPzQ5HOmRlta.TkZ0WS/qBJox/WN1ezGc3cCh6', '$2b$10$/.f8C4963cWlfgqFPzQ5HOmRlta.TkZ0WS/qBJox/WN1ezGc3cCh6', '21012011112', '2023-06-10', '7405503035', 23, 23, 2, '\"Communication\"', 'https://www.linkedin.com/in/dhiraj-mohata', 'https://github.com/DhirajMohata', 'SDVS', 'GUNI.jpg', 'linux-commands-handbook.pdf', 1),
('Manan Thakar', 'manan@gmail.com', '$2b$10$YJaa9CV8ydTmrkJhtzTLeeAfy38cZiXbgxc2ZwwNHE4N3EYB7NqUS', '$2b$10$YJaa9CV8ydTmrkJhtzTLeeAfy38cZiXbgxc2ZwwNHE4N3EYB7NqUS', '21012011112', '2003-01-31', '7405503035', 23, 23, 5, '[\"Communication\",\"c++\"]', 'https://www.linkedin.com/in/dhiraj-mohata', 'https://github.com/DhirajMohata', 'SDVS', 'GUNI.jpg', 'serverStartup.pdf', 1),
('Devanshi', 'devanshi@gmail.com', '$2b$10$xguJ7AK93bfdkaJkh2o6aekbadNPbpOsKDVGDIiihdUPWaEQABSVa', '$2b$10$xguJ7AK93bfdkaJkh2o6aekbadNPbpOsKDVGDIiihdUPWaEQABSVa', '21012011112', '2002-07-12', '9428600535', 23, 23, 5, '\"Communication\"', 'https://www.linkedin.com/in/dhiraj-mohata', 'https://github.com/DhirajMohata', 'SDVS', 'GUNI.jpg', 'Vecteezy-License-Information.pdf', 1),
('radheshyam', 'radheshaym@gmail.com', '$2b$10$JR2rNnzo2HhNvpDj28hqW.tGo0rJDYy5CMfuGG3ozFS2OaXGENtRe', '$2b$10$JR2rNnzo2HhNvpDj28hqW.tGo0rJDYy5CMfuGG3ozFS2OaXGENtRe', '21012011112', '1979-11-02', '9428600535', 23, 23, 5, '\"Communication\"', 'https://www.linkedin.com/in/dhiraj-mohata', 'https://github.com/DhirajMohata', 'SDVS', 'GUNI.jpg', 'serverStartup.pdf', 1),
('Narayan Mohata', 'narayan@gmail.com', '$2b$10$r9y3Y1OMWsmVnDHmA84N5.tx5Ix7IVOmuX.31cjx3CREnFdxsiEiS', '$2b$10$r9y3Y1OMWsmVnDHmA84N5.tx5Ix7IVOmuX.31cjx3CREnFdxsiEiS', '21012011112', '2003-11-22', '8981029392', 23, 23, 1, '[\"Communication\",\"c++\"]', 'https://www.linkedin.com/in/dhiraj-mohata', 'https://github.com/DhirajMohata', 'SDVS', 'GUNI.jpg', 'Vecteezy-License-Information.pdf', 1),
('Guddu', 'guddu@gmail.com', '$2b$10$IMBJ3KUp8l2bHwMp1YVxbeMnMauyw1q/HiAR6v069xKTJdViEVDuW', '$2b$10$IMBJ3KUp8l2bHwMp1YVxbeMnMauyw1q/HiAR6v069xKTJdViEVDuW', '21012011112', '2003-06-19', '7405503035', 23, 23, 5, '\"Communication\"', 'https://www.linkedin.com/in/dhiraj-mohata', 'https://github.com/DhirajMohata', 'SDVS', 'GUNI.jpg', 'Vecteezy-License-Information.pdf', 1),
('Panda', 'panda@gmail.com', '$2b$10$oqY8ptyyLxrmj5wp5nPlPuknZiE47G.NxOdZYN8.s0J2K4fTQpv1W', '$2b$10$oqY8ptyyLxrmj5wp5nPlPuknZiE47G.NxOdZYN8.s0J2K4fTQpv1W', '21012011112', '2003-07-17', '7405503035', 23, 23, 4, '\"Communication\"', 'https://www.linkedin.com/in/dhiraj-mohata', 'https://github.com/DhirajMohata', 'SDVS', 'GUNI.jpg', 'Vecteezy-License-Information.pdf', 1),
('vedant mohata', 'vedant@gmail.com', '$2b$10$XCYHPsUQbn3zQue0KgRh1ulcpDvKkbdZj5fv/MkqUYgii9f/W/el2', '$2b$10$XCYHPsUQbn3zQue0KgRh1ulcpDvKkbdZj5fv/MkqUYgii9f/W/el2', '21012011112', '2001-10-18', '7405503035', 23, 23, 5, '\"Communication\"', 'https://www.linkedin.com/in/dhiraj-mohata', 'https://github.com/DhirajMohata', 'SDVS', 'GUNI.jpg', 'Vecteezy-License-Information.pdf', 0),
('rudra', 'rudra@gmail.com', '$2b$10$hFREOCvUqWUgqYb93CE5S.vLNlSi/ibH9an4H/5X2tWSwXT4.dXDS', '$2b$10$hFREOCvUqWUgqYb93CE5S.vLNlSi/ibH9an4H/5X2tWSwXT4.dXDS', '21012011112', '2003-06-20', '7405503035', 23, 23, 4, '[\"Communication\",\"java\",\"c++\"]', 'https://www.linkedin.com/in/dhiraj-mohata', 'https://github.com/DhirajMohata', 'SDVS', 'WhatsApp Image 2023-10-25 at 11.50.08.jpeg', 'Practical-6_SP_Patel_Rudra.pdf', 1),
('masi', 'masi@gmail.com', '$2b$10$Ujb2Q9tHnMSc55ij6HG0p.lDBbbqSaZ9yt/uEheGBIGnrTC8hRzgC', '$2b$10$Ujb2Q9tHnMSc55ij6HG0p.lDBbbqSaZ9yt/uEheGBIGnrTC8hRzgC', '21012011112', '2001-12-12', '7405503035', 23, 23, 8, '[\"Communication\",\"Communication\"]', 'https://www.linkedin.com/in/dhiraj-mohata', 'https://github.com/DhirajMohata', 'SDVS', NULL, 'Practical_9-cn-abhay.pdf', 1),
('Radhe', 'radhe@gmail.com', '$2b$10$v82ODd1LsDXPfYmtyC5F6.eNNK6A5EQ6VhnHC/ucVlsGm8kk3732q', '$2b$10$v82ODd1LsDXPfYmtyC5F6.eNNK6A5EQ6VhnHC/ucVlsGm8kk3732q', '21012011112', '2003-12-07', '7405503035', 23, 23, 4, '\"Communication\"', 'https://www.linkedin.com/in/dhiraj-mohata', 'https://github.com/DhirajMohata', 'SDVS', NULL, 'Practical_9-cn-abhay.pdf', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
