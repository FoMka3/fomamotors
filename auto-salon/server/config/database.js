const mysql = require('mysql2');
const dotenv = require('dotenv');
const path = require('path');

// Загружаем .env из корня проекта
dotenv.config({ path: path.join(__dirname, '../../.env') });

console.log('DB_USER:', process.env.DB_USER); // Должно вывести 'root'
console.log('DB_PASSWORD:', process.env.DB_PASSWORD); // Должно вывести 'root'

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'auto_salon',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;