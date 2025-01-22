class ProductManager {
  
  static products = [
    { "id": "1", "name": "Camiseta", "price": 15.99, "stock": 2 },
    { "id": "2", "name": "Zapatos deportivos", "price": 49.99, "stock": 6 },
    { "id": "3", "name": "Auriculares", "price": 25.50, "stock": 3 },
    { "id": "4", "name": "Laptop", "price": 899.99, "stock": 8 },
    { "id": "5", "name": "Libro", "price": 12.75, "stock": 7 },
    { "id": "6", "name": "Mochila", "price": 35.00, "stock": 5 },
    { "id": "7", "name": "Reloj", "price": 120.00, "stock": 4 }
  ];
  static tempProducts = [];
  
  static getProducts() {
    return ProductManager.products;
  }

 
  static getProductId(id) {
    const product = ProductManager.products.find(p => p.id === id);
    return product; 
  }

  static addProduct({ name, description, code, price, status, stock, category, thumbnails }) {
    if (!name || !description || !code || price === undefined || status === undefined || stock === undefined || !category || !thumbnails) {
      return { message: 'Missing required fields' }; 
    }

    const newId = (parseInt(ProductManager.products[ProductManager.products.length - 1].id) + 1).toString(); 
    const newProduct = {
      id: newId,
      name,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails
    };
    ProductManager.tempProducts.push(newProduct);
    return newProduct;
  }
  static updateProduct(id, updatedData) {
    const productIndex = ProductManager.tempProducts.findIndex(p => p.id === id);
    if (productIndex === -1) {
      return null; 
    }

    const updatedProduct = { ...ProductManager.tempProducts[productIndex], ...updatedData };
    ProductManager.tempProducts.splice(productIndex, 1);
    ProductManager.products.push(updatedProduct);
    return updatedProduct;
  }

  static deleteProduct(id) {
    const productIndex = ProductManager.products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      return null; 
    }

    const deletedProduct = ProductManager.products.splice(productIndex, 1); 
    return deletedProduct[0]; 
  }
}



export default ProductManager;