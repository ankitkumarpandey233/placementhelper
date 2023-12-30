const { dbPool } = require('../config/db');

function getAppliedStudents(companyEmail, next) {
  return new Promise((resolve, reject) => {
    dbPool.query('SELECT * FROM applied WHERE companyEmail = ? AND next = ?', [companyEmail, next], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

function insertRejectedStudent(appliedData) {
  return new Promise((resolve, reject) => {
    dbPool.query('INSERT INTO rejected SET ?', appliedData, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

function updateAppliedStudent(updateData, condition) {
  return new Promise((resolve, reject) => {
    dbPool.query('UPDATE applied SET ? WHERE ?', [updateData, condition], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

function updateCompanyRound(companyEmail, round) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE companies SET round = ${round} WHERE email = '${companyEmail}'`;
    dbPool.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

function getCompanyByEmail(companyEmail) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM companies WHERE email = '${companyEmail}'`;
    dbPool.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = {
  getAppliedStudents,
  insertRejectedStudent,
  updateAppliedStudent,
  updateCompanyRound,
  getCompanyByEmail,
};
