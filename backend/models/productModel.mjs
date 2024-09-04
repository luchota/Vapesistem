import pool from '../db.mjs';

const createProductInDb = async (product) => {
    const [result] = await pool.query('INSERT INTO Productos SET ?', product);
    return result.insertId;
};

const updateProductInDb = async (productId, product) => {
    await pool.query('UPDATE Productos SET ? WHERE product_id = ?', [product, productId]);
};

const deleteProductFromDb = async (productId) => {
    await pool.query('DELETE FROM Productos WHERE product_id = ?', [productId]);
};

const getProductFromDb = async (productId) => {
    const [rows] = await pool.query('SELECT * FROM Productos WHERE product_id = ?', [productId]);
    return rows[0];
};

const getProductsFromDb = async () => {
    const [rows] = await pool.query('SELECT * FROM Productos');
    return rows;
};

export { createProductInDb, updateProductInDb, deleteProductFromDb, getProductFromDb, getProductsFromDb };
