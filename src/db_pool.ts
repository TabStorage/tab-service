import express from "express";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "tabstorage",
    database: "tab_service"
});

export default pool;