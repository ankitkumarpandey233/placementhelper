
const { dbPool } = require('../config/db');

const CompanyModel = {
  findCompanyByEmail: (email, callback) => {
    dbPool.query('SELECT * FROM companies WHERE email = ?', email, callback);
  },

  createCompany: (companyData, callback) => {
    dbPool.query('INSERT INTO companies SET ?', companyData, callback);
  },
};

module.exports = CompanyModel;
