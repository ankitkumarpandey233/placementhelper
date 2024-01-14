const { dbPool } = require('../config/db');

const StudentModel = {
  findStudentByEmail: (email) => {
    return new Promise((resolve, reject) => {
      dbPool.query('SELECT * FROM student WHERE email = ?', email, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  getCompaniesForStudent: (studentEmail) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM companies
        WHERE cgpa <= (SELECT cgpa FROM student WHERE email = ?)
        AND marks10 <= (SELECT marks10 FROM student WHERE email = ?)
        AND marks12 <= (SELECT marks12 FROM student WHERE email = ?)
        AND startingDate <= NOW()
        AND endingDate >= NOW()
      `;
      dbPool.query(query, [studentEmail, studentEmail, studentEmail], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  getCompaniesNotEligibleForStudent: (studentEmail) => {
    return new Promise((resolve, reject) => {
        const query = `
        SELECT * FROM companies WHERE (cgpa > (SELECT cgpa FROM student WHERE email = ?) OR marks10 > (SELECT marks10 FROM student WHERE email = ?) OR marks12 > (SELECT marks12 FROM student WHERE email = ?)) AND startingDate <= NOW() AND endingDate >= NOW()
        `;
        dbPool.query(query, [studentEmail, studentEmail, studentEmail], (error, results) => {
            if (error) {
            reject(error);
            } else {
            resolve(results);
            }
        });
        });
  },

  getCompaniesPastDeadlinesForStudent: () => {
    return new Promise((resolve, reject) => {
      dbPool.query('SELECT * FROM companies WHERE startingDate > NOW() OR endingDate < NOW()', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  getStudentAppliedCompanies: (studentEmail) => {
    return new Promise((resolve, reject) => {
      dbPool.query('SELECT * FROM applied WHERE studentEmail = ?', studentEmail, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  getNotice: () => {
    return new Promise((resolve, reject) => {
      dbPool.query('SELECT * FROM notice', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  getStudentRejectedCompanies: (studentEmail) => {
    return new Promise((resolve, reject) => {
      dbPool.query('SELECT * FROM rejected WHERE studentEmail = ?', studentEmail, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  getCompaniesByName : (cStudent) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM companies WHERE name IN (?)';
      
      dbPool.query(query, [cStudent], (err, comp) => {
        if (err) {
          reject(err);
        }
  
        if (comp !== undefined) {
          resolve(comp);
        } else {
          reject('No companies found');
        }
      });
    });
  },
  

  applyToCompany: (studentEmail, companyName) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO applied (studentEmail, studentName, companyEmail, companyName, studentEnrollment)
        VALUES (?, (SELECT name FROM student WHERE email = ?), ?, ?, (SELECT enrollment FROM student WHERE email = ?))
      `;
      dbPool.query(query, [studentEmail, studentEmail, companyName, companyName, studentEmail], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  updateStudentPassword: (email, hashedPassword) => {
    return new Promise((resolve, reject) => {
      dbPool.query('UPDATE student SET password = ? WHERE email = ?', [hashedPassword, email], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
};

module.exports = StudentModel;
