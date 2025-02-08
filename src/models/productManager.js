class ProductManager {
  static products = [
    { "id": "1", "name": "Camiseta", "price": 15.99, "stock": 2, "description": "Camiseta de algodón" },
    { "id": "2", "name": "Zapatos deportivos", "price": 49.99, "stock": 6, "description": "Zapatos deportivos para correr" },
    { "id": "3", "name": "Auriculares", "price": 25.50, "stock": 3, "description": "Auriculares inalámbricos" },
    { "id": "4", "name": "Laptop", "price": 899.99, "stock": 8, "description": "Laptop de última generación" },
    { "id": "5", "name": "Libro", "price": 12.75, "stock": 7, "description": "Libro de ciencia ficción" },
    { "id": "6", "name": "Mochila", "price": 35.00, "stock": 5, "description": "Mochila para portátil" },
    { "id": "7", "name": "Reloj", "price": 120.00, "stock": 4,  "description": "Reloj de pulsera" }
  ];

  static getProducts() {
    return ProductManager.products;
  }


  static getProductId(id) {
    return ProductManager.products.find(p => p.id === id);
  }


  static addProduct({ name, description, code, price, status, stock, category }) {
    if (!name || !description || !code || price === undefined || status === undefined || stock === undefined || !category) {
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
    };

    ProductManager.products.push(newProduct);
    return newProduct;
  }

  static updateProduct(id, updatedData) {
    const productIndex = ProductManager.products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      return null; 
    }

    const updatedProduct = { ...ProductManager.products[productIndex], ...updatedData };
    ProductManager.products[productIndex] = updatedProduct;
    return updatedProduct;
  }

  static deleteProduct(id) {
    const index = ProductManager.products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    return ProductManager.products.splice(index, 1)[0];
  }
}

export default ProductManager;
