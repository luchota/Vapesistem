import { createUser, findUser } from '../models/userModel.mjs';

const handleCreateUser = async (req, res) => {
    const newUser = req.body;
    try {
        const userId = await createUser(newUser);
        res.status(201).json({ userId });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await findUser(username, password);
        if (user) {
            res.status(200).json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export { handleCreateUser, login };
