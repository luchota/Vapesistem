import { query, end } from '../db.mjs';
import { hash } from 'bcrypt';

const createInitialUser = async () => {
    const username = 'admin';
    const password = 'admin123';
    const email = 'admin@example.com';
    const role = 'admin';

    try {
        const hashedPassword = await hash(password, 10);
        const result = await query('INSERT INTO Usuarios (username, password, email, role) VALUES (?, ?, ?, ?)', [username, hashedPassword, email, role]);
        
        if (Array.isArray(result) && result.length > 0) {
            console.log('User created with ID:', result[0].insertId);
        } else {
            console.error('Unexpected result from query:', result);
        }
    } catch (error) {
        console.error('Error creating user:', error);
    }
    await end();
};

createInitialUser();

