import express from "express";
import Cart from "../models/cart.model.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    let cart = await Cart.findOne().populate("products.product");

    if (!cart) {
      cart = new Cart({ products: [] });
      await cart.save();
    }
    res.render("cart", { cart: cart.toObject() });
  } catch (error) {
    console.error("Error fetching the cart:", error.message);
    res.render("error", { error: 'Error al obtener el carrito' });
  }
});

router.post("/add/:productId", async (req, res) => {
    try {
      const { productId } = req.params;
      let cart = await Cart.findOne();
  
      if (!cart) {
        cart = new Cart({ products: [] });
      }
  
      const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
  
      if (productIndex !== -1) {
        cart.products[productIndex].quantity += 1;
      } else {
        cart.products.push({ product: productId, quantity: 1 });
      }
  
      await cart.save();
      res.redirect("/carts");
    } catch (error) {
      res.render("error", { error: 'Error al agregar el producto al carrito' });
    }
  });
  
  router.post("/remove/:productId", async (req, res) => {
    try {
      const { productId } = req.params;
      let cart = await Cart.findOne();
  
      if (!cart) {
        return res.redirect("/carts");
      }
      cart.products = cart.products.filter(p => p.product.toString() !== productId);
      await cart.save();
  
      res.redirect("/carts");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      res.render("error", { error: "Error al eliminar el producto del carrito" });
    }
  });
  
export default router;