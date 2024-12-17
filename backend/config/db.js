const mysql=require('mysql2');
const dotenv=require('dotenv');

dotenv.config();
const connection=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME,
});
connection.connect((err) => {
    if (err) {
        console.error('error connecting to db:', err);
        process.exit(1);
    }
    console.log('connected to db');
});
connection.query('SELECT * FROM employees;', (err, results) => {
    if (err) {
        console.error('error executing query:', err);
    } else {
        console.log('results:', results);
    }
});
module.exports = connection;
