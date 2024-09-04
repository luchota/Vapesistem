import pool from '../db.mjs';
import bcrypt from 'bcrypt';

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM Usuarios WHERE username = ?', [username]);
        if (rows.length === 0) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        res.json({ message: 'Login successful', userId: user.user_id });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
};

export { loginUser };
