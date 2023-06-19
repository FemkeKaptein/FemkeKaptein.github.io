import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

export async function getCommentsByCommentsSectionId(id,typeStory) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM Comment
    WHERE comment_section_id = ?
    AND type_story = ?`, [id, typeStory]);
    return rows;
}

export async function createCommentByCommentsSectionId(name, message, timestamp, id, type_story) {
    const result = await pool.query(`
    INSERT INTO comment (name, message, timestamp, comment_section_id, type_story)
    VALUES (?, ?, ?, ?, ?)`, [name, message, timestamp, id, type_story]);
    return result;
}


