import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'oasissupersonic', // asegúrate de que esta sea tu contraseña correcta
    database: 'sales_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export const query = async (sql, params) => {
    const [rows] = await pool.query(sql, params);
    return rows; // Devuelve directamente los rows
};

export const end = async () => {
    await pool.end();
};

export default pool;
