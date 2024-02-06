// adminModel.js
const { dbPool } = require('../config/db');

const getUnverifiedStudents = () => {
  return new Promise((resolve, reject) => {
    dbPool.query('SELECT * FROM student WHERE allow = 0', (err, student) => {
      if (err) {
        reject(err);
      }
      resolve(student);
    });
  });
};

const getVerifiedStudents = () => {
  return new Promise((resolve, reject) => {
    dbPool.query('SELECT * FROM student WHERE allow = 1', (err, verified) => {
      if (err) {
        reject(err);
      }
      resolve(verified);
    });
  });
};

const getCompanies = () => {
  return new Promise((resolve, reject) => {
    dbPool.query('SELECT * FROM companies', (err, companies) => {
      if (err) {
        reject(err);
      }
      resolve(companies);
    });
  });
};

const getNotices = (notice) => {
  return new Promise((resolve, reject) => {
    dbPool.query('SELECT * FROM notice', notice , (err, notices) => {
      if (err) {
        reject(err);
      }
      resolve(notices);
    });
  });
}

const getAdminByEmail = (email) => {
  return new Promise((resolve, reject) => {
    dbPool.query('SELECT * FROM admin WHERE email = ?', email, (err, admin) => {
      if (err) {
        reject(err);
      }
      resolve(admin);
    });
  });
};

const insertAdmin = (adminData) => {
  return new Promise((resolve, reject) => {
    dbPool.query('INSERT INTO admin SET ?', adminData, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

const placedStudent = () => {
  return new Promise((resolve, reject) => {
    dbPool.query('SELECT * FROM selected WHERE selected = 2', (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = {
  getUnverifiedStudents,
  getVerifiedStudents,
  getCompanies,
  getNotices,
  getAdminByEmail,
  insertAdmin,
  placedStudent
};
