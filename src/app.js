import express from "express";
import { createServer } from "http";
import { Server as socketIo } from 'socket.io';
import ProductManager from './models/productManager.js';
import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import handlebars from 'express-handlebars';
import { dirname, } from 'path';
import path from "path";
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('public', __dirname + '/public');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

app.use('/products', productRouter);
app.use('/api/carts', cartRouter);

app.get("/realtimeproducts", (req, res) => {
    const products = ProductManager.getProducts();
    res.render("realTimeProducts", { products });
  });

const server = createServer(app);
const io = new socketIo(server);


io.on("connection", (socket) => {
    socket.emit("updateProducts", ProductManager.getProducts());
  
    socket.on("addProduct", (newProduct) => {
      ProductManager.addProduct(newProduct);
      io.emit("updateProducts", ProductManager.getProducts());
    });
  
    socket.on("deleteProduct", (id) => {
      ProductManager.deleteProduct(id);
      io.emit("updateProducts", ProductManager.getProducts());
    });
  });
  

server.listen(8080, () => {
    console.log('Servidor escuchando en puerto 8080');
});


