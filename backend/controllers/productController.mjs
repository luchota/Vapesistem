import { createProductInDb, updateProductInDb, deleteProductFromDb, getProductFromDb, getProductsFromDb } from '../models/productModel.mjs';

const createProduct = async (req, res) => {
    const newProduct = req.body;
    try {
        const productId = await createProductInDb(newProduct);
        res.status(201).json({ productId });
    } catch (error) {
        res.status(500).json({ error: 'Error creating product' });
    }
};

const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;
    try {
        await updateProductInDb(productId, updatedProduct);
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating product' });
    }
};

const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        await deleteProductFromDb(productId);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting product' });
    }
};

const getProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await getProductFromDb(productId);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error getting product' });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await getProductsFromDb();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error getting products' });
    }
};

export { createProduct, updateProduct, deleteProduct, getProduct, getProducts };
