import pool from '../db.mjs';

const createProductInDb = async (product) => {
    const [result] = await pool.query('INSERT INTO Productos SET ?', product);
    return result.insertId;
};

const updateProductInDb = async (productId, product) => {
    await pool.query('UPDATE Productos SET ? WHERE id = ?', [product, productId]); // Cambiado "product_id" a "id"
};

const deleteProductFromDb = async (productId) => {
    await pool.query('DELETE FROM Productos WHERE id = ?', [productId]); // Cambiado "product_id" a "id"
};

const getProductFromDb = async (productId) => {
    const [rows] = await pool.query('SELECT * FROM Productos WHERE id = ?', [productId]); // Cambiado "product_id" a "id"
    return rows[0];
};

const getProductsFromDb = async () => {
    const [rows] = await pool.query('SELECT * FROM Productos');
    return rows;
};

export { createProductInDb, updateProductInDb, deleteProductFromDb, getProductFromDb, getProductsFromDb };
