import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  products: [
    {product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    quantity: { type: Number, default: 1 },
    },],
});

const Cart = mongoose.model("cart", cartSchema);
export default Cart;