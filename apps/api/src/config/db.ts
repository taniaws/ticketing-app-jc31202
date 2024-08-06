import mysql from "mysql2";

const db = mysql.createPool({
    host: "localhost",
    user: "admin",
    password: "admin123",
    database: "event"
})