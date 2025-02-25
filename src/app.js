import express from "express";
import { createServer } from "http";
import handlebars from 'express-handlebars';
import { dirname, } from 'path';
import path from "path";
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import productsDBRouter from './routes/productsDB.router.js';
import viewsRouter from './routes/views.router.js';
import cartRouter from './routes/carts.router.js';
import dotenv from "dotenv";
import methodOverride from 'method-override';
dotenv.config();


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('public', __dirname + '/public');
app.set('view engine', 'handlebars');
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

app.use('/cart', cartRouter);
app.use('/', viewsRouter);
app.use('/products', productsDBRouter); //Creo nuevo router, para renderizar productos desde la base de datos

// ruta para volver al inicio
app.get('/inicio', (req, res) => {
  res.render('index');  
});

const URIMongoDB = process.env.URIMONGO;
mongoose.connect(URIMongoDB)
console.log(`Conectado a la base de datos de MongoDB`);

const server = createServer(app);
server.listen(8080, () => {
    console.log('Servidor escuchando en puerto 8080');
});


