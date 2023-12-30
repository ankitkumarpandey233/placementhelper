
const { dbPool } = require('../config/db');

const StudentModel = {
  findStudentByEmail: (email, callback) => {
    dbPool.query('SELECT * FROM student WHERE email = ?', email, callback);
  },

  getCompaniesForStudent: (studentEmail, callback) => {
    dbPool.query(
      'SELECT * FROM companies WHERE cgpa <= (SELECT cgpa FROM student WHERE email = ?) AND marks10 <= (SELECT marks10 FROM student WHERE email = ?) AND marks12 <= (SELECT marks12 FROM student WHERE email = ?) AND startingDate <= NOW() AND endingDate >= NOW()',
      [studentEmail, studentEmail, studentEmail],
      callback
    );
  },

  getCompaniesNotEligibleForStudent: (studentEmail, callback) => {
    dbPool.query(
      'SELECT * FROM companies WHERE (cgpa > (SELECT cgpa FROM student WHERE email = ?) OR marks10 > (SELECT marks10 FROM student WHERE email = ?) OR marks12 > (SELECT marks12 FROM student WHERE email = ?)) AND startingDate <= NOW() AND endingDate >= NOW()',
      [studentEmail, studentEmail, studentEmail],
      callback
    );
  },

  getCompaniesPastDeadlinesForStudent: (callback) => {
    dbPool.query('SELECT * FROM companies WHERE startingDate > NOW() OR endingDate < NOW()', callback);
  },

  getStudentAppliedCompanies: (studentEmail, callback) => {
    dbPool.query('SELECT * FROM applied WHERE studentEmail = ?', studentEmail, callback);
  },

  getNotice: (notice,callback)=> {
    dbPool.query('SELECT * FROM notice', [notice], callback);
  },

  getStudentRejectedCompanies: (studentEmail, callback) => {
    dbPool.query('SELECT * FROM rejected WHERE studentEmail = ?', studentEmail, callback);
  },

  applyToCompany: (studentEmail, companyName, callback) => {
    dbPool.query(
      'INSERT INTO applied (studentEmail, studentName, companyEmail, companyName, studentEnrollment) VALUES (?, (SELECT name FROM student WHERE email = ?), ?, ?, (SELECT enrollment FROM student WHERE email = ?))',
      [studentEmail, studentEmail, companyName, companyName, studentEmail],
      callback
    );
  },

  updateStudentPassword: (email, hashedPassword, callback) => {
    dbPool.query('UPDATE student SET password = ? WHERE email = ?', [hashedPassword, email], callback);
  },
};

module.exports = StudentModel;
