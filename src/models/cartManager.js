export class CartManager {
  static carts = [];

  static getCarts() {
    return CartManager.carts;
  }

  static getCartById(cid) {
    return CartManager.carts.find(cart => cart.id === cid);
  }

  static addCart() {
    const newId = (CartManager.carts.length + 1).toString();
    const newCart = {
      id: newId,
      products: [] 
    };
    CartManager.carts.push(newCart);
    return newCart;
  }

  static addProductToCart(cid, pid) {
    const cart = CartManager.getCartById(cid);
    if (!cart) {
      return null;
    }
    const existingProduct = cart.products.find(product => product.productId === pid);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ productId: pid, quantity: 1 });
    }
    return cart;
  }
}

export default CartManager;
