const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'containers-us-west-165.railway.app',
  user: 'root',
  password: '0W3XaiFSCMfPoNCD31N9',
  database: 'railway',
  port: 3306,
});

module.exports = db;
