import pool from '../db.mjs';
import bcrypt from 'bcrypt';

const createUser = async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    const [result] = await pool.query('INSERT INTO Usuarios SET ?', user);
    return result.insertId;
};

const findUser = async (username, password) => {
    const [rows] = await pool.query('SELECT * FROM Usuarios WHERE username = ?', [username]);
    if (rows.length === 0) {
        return null;
    }
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
};

export { createUser, findUser };
