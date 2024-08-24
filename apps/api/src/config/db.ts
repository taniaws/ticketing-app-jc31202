import mysql from 'mysql2';
const db = mysql.createPool({
  host: 'localhost',
  user: 'event-management',
  password: 'eventmanagement123!',
  database: 'event-management',
});
