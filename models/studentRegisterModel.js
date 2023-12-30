// models/studentModel.js
const { dbPool } = require('../config/db');
const bcrypt = require('bcrypt');

async function getStudentByEmail(email) {
  try {
    const results = await dbPool.query('SELECT * FROM student WHERE email = ?', email);
    return results[0];
  } catch (error) {
    console.error('Error fetching student by email:', error);
    throw error;
  }
}

async function registerStudent(studentData) {
  try {
    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(studentData.password, 10);
    studentData.password = hashedPassword;

    const result = await dbPool.query('INSERT INTO student SET ?', studentData);
    return result;
  } catch (error) {
    console.error('Error registering student:', error);
    throw error;
  }
}

module.exports = {
  getStudentByEmail,
  registerStudent,
  // Add more functions as needed
};
