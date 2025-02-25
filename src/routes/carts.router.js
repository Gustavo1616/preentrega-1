import { Router } from 'express';
import CartModel from '../models/cart.model.js';
import ProductModel from '../models/product.model.js';

const router = Router();


router.post('/carts/:cartId/product/:productId', async (req, res) => {
  try {
      const { cartId, productId } = req.params;

      let cart = await CartModel.findById(cartId);
      if (!cart) {
          return res.render('error', { error: 'Carrito no encontrado' });
      }
      const product = await ProductModel.findById(productId);
      if (!product) {
          return res.render('error', { error: 'Producto no encontrado' });
      }

      const existingProduct = cart.products.find(item => item.product.toString() === product._id.toString());
      if (existingProduct) {
          existingProduct.quantity += 1;
      } else {
          cart.products.push({ product: product._id, quantity: 1 });
      }
      await cart.save();

      res.redirect(`/cart/${cart._id}`);
  } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
      res.render('error', { error: 'Error al agregar el producto al carrito' });
  }
});

router.get('/carts/:cid', async (req, res) => {
  try {
      const { cid } = req.params;
      const cart = await CartModel.findById(cid).populate('products.product');

      if (!cart) {
          return res.render('error', { error: 'Carrito no encontrado' });
      }

      res.render('cart', { cart: cart.toObject() });
  } catch (error) {
      console.error("Error al obtener el carrito:", error);
      res.render('error', { error: 'Error al obtener el carrito' });
  }
});



export default router;


