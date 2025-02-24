import { Router } from 'express';
import ProductModel from '../models/product.model.js';


const router = Router();

router.post('/', async (req, res) => {
    try{
        const newProduct = new ProductModel(req.body);
        console.log('Info del body: ', req.body);
        await newProduct.save();

        res.render('product', {product: newProduct.toObject()});
    }catch(error){
        return res.render('error', {error: "Error al insertar el producto"});
    }
})

router.get('/', async (req, res) => {
    try{
        const products = await ProductModel.find();
        
        res.render('products', {products: products.map( product => product.toObject())});
    }catch(error){
        return res.render('error', {error:"Error al obtener productos"});
    }
})


router.get('/:id', async (req, res) => {
    try{
        const unProducto = await ProductModel.findById(req.params.id);
        if(!unProducto){
            return res.render('error', {error: "Producto no encontrado"});
        }
        res.render('product', {product: unProducto.toObject()});
    }catch(error){
        return res.render('error', {error:"Error al obtener el producto solicitado"});
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const productoAEliminar = await ProductModel.findByIdAndDelete(req.params.id);
        if(!productoAEliminar){
            return res.render('error', {error: "No se encontró el producto a eliminar"})
        }
        res.redirect('/products');
    }catch(error){
        return res.render('error', {error:"Error al eliminar el producto"});
    }
})


export default router;