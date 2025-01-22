import { Router } from "express";
import ProductManager from '../models/productManager.js';
const router = Router();


router.get('/', (req, res) => {
  const products = ProductManager.getProducts();
  res.json(products); 
});

router.get('/:id', (req, res) => {
  const productId = req.params.id;
  const product = ProductManager.getProductId(productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
});

router.post('/', (req, res) => {
  const { name, description, code, price, status, stock, category, thumbnails } = req.body;

  const newProduct = ProductManager.addProduct({
    name,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails
  });

  if (newProduct.message) {
    return res.status(400).json(newProduct);
  }

  res.status(201).json(newProduct);
});


router.put('/:id', (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;

  const product = ProductManager.updateProduct(productId, updatedProduct);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product); 
});


router.delete('/:id', (req, res) => {
  const productId = req.params.id;

  const deletedProduct = ProductManager.deleteProduct(productId);

  if (!deletedProduct) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json({ message: 'Product deleted', product: deletedProduct }); 
});

export default router;