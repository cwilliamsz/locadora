const config = require('../config/database');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: config.host,
  user: config.username,
  password: config.password,
  database: config.database
});

connection.connect((err) => {
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

module.exports = connection;