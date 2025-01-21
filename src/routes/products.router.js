import { Router } from "express";

const router = Router();

const products = [
    { "id": "1", "name": "Camiseta", "price": 15.99 },
    { "id": "2", "name": "Zapatos deportivos", "price": 49.99 },
    { "id": "3", "name": "Auriculares", "price": 25.50 },
    { "id": "4", "name": "Laptop", "price": 899.99 },
    { "id": "5", "name": "Libro", "price": 12.75 },
    { "id": "6", "name": "Mochila", "price": 35.00 },
    { "id": "7", "name": "Reloj", "price": 120.00 }
  ];

router.get('/', (req, res) => {
        res.send({products});
})
router.get('/api/products', (req, res) => {
  res.send({products});
})

router.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const product = products.find(product => product.id === productId);
  if(!product){
    res.status(404).send({message: 'Product not found'});
  }else{
    res.send(product);
  }
})


router.post('/api/products', (req, res) => {
    const { name, description, code, price, status, stock, category, thumbnails } = req.body;
    if (!name || !description || !code || price === undefined || status !== false && status !== true || stock === undefined || !category || !thumbnails) {
      return res.status(400).send({ message: 'Missing required fields' });
    }
    const newId = (parseInt(products[products.length - 1].id) + 1).toString(); 

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
  products.push(newProduct);
  res.status(201).send(newProduct); 
});

router.put('/api/products/:id', (req,res)=>{
  const productId = req.params.id;
  const updatedProduct = req.body;
  const index = products.findIndex(product => product.id === productId);
  if (index === -1) {
    return res.status(404).send({ message: 'Product not found' });
  }
  products[index] = { ...products[index], ...updatedProduct };
  res.send(products[index]);
});


router.delete('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const index = products.findIndex(product => product.id === productId); 

  if (index === -1) { 
      return res.status(404).send({ message: 'Producto no encontrado' });
  }


  const deletedProduct = products.splice(index, 1);

  res.send({ message: 'Producto eliminado', product: deletedProduct });
});




export default router;
