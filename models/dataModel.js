// adminModel.js
const { dbPool } = require('../config/db');

const getData = () => {
  return new Promise((resolve, reject) => {
    dbPool.query('SELECT * FROM studentplacement', (err, student) => {
      if (err) {
        reject(err);
      }
      resolve(student);
    });
  });
};


module.exports = {
    getData
};
