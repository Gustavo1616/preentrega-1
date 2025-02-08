import { Router } from 'express';
import ProductManager from '../models/productManager.js';
const realTimeProductsRouter = Router();




realTimeProductsRouter.get('/', (req, res) => { 
    const products = ProductManager.getProducts();
    res.render('realTimeProducts', { products: ProductManager.getProducts() });
});



export default realTimeProductsRouter;