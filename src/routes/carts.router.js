import { Router } from "express";
import CartManager from "../models/cartManager.js";

const router = Router();

router.post("/", (req, res) => {
  const newCart = CartManager.addCart();
  res.status(201).json(newCart); 
});


router.get("/:cid", (req, res) => {
  const { cid } = req.params; 
  const cart = CartManager.getCartById(cid); 

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }
  res.json(cart.products); 
});


router.post("/:cid/product/:pid", (req, res) => {
  const { cid, pid } = req.params; 
  const cart = CartManager.addProductToCart(cid, pid); 

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" }); 
  }
  res.json(cart); 
});

export default router;