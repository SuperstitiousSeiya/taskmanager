import mysql from 'mysql2/promise';

const connection = mysql.createPool({
  host: 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '123456789',
  database: 'taskmanager'
});

export default connection;