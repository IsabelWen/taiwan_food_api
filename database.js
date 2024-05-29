import mysql from 'mysql2';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}).promise();

// Returns food list 
export async function getFoods() {
    const [rows] = await pool.query("SELECT * FROM food");
    return rows;
};

// Returns food by id
export async function getFood(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM food
    WHERE id = ?
    `, [id]);
    return rows[0];
};

/* const food = await getFood(1);
console.log(food);
 */