import { Router } from 'express';
import ProductModel from '../models/product.model.js';
import CartModel from '../models/cart.model.js';

const router = Router();


router.post('/', async (req, res) => {
    try {
        const newProduct = new ProductModel(req.body);
        console.log('Info del body: ', req.body);
        await newProduct.save();

        res.render('product', { product: newProduct.toObject() });
    } catch (error) {
        return res.render('error', { error: "Error al insertar el producto" });
    }
});

router.get('/', async (req, res) => {
    try {

        let cartId = null;
        if (req.user && req.user._id) {
            const cart = await CartModel.findOne({ user: req.user._id });

            if (cart) {
                cartId = cart._id;
            }
        }
        console.log("CartId: ", cartId);

        const pageActual = req.query.page || 1;
        const limitActual = req.query.limit || 10;
        const infoPaginate = await ProductModel.paginate({}, {
            page: parseInt(pageActual),
            limit: parseInt(limitActual),
            sort: { price: 1 }
        });

        const productObject = infoPaginate.docs.map(doc => doc.toObject());

        console.log("Productos: ", productObject);
        res.render('products', {
            products: productObject,
            cartId: cartId,
            info: infoPaginate
        });

    } catch (error) {
        console.error("Error al obtener los productos: ", error);
        res.render('error', { error: 'Error al obtener los productos' });
    }
});

router.get('/products/:pid', async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.pid);
        if (!product) {
            return res.render('error', { error: "Producto no encontrado" });
        }
        res.render('product', { product: product.toObject() });
    } catch (error) {
        return res.render('error', { error: "Error al obtener el producto solicitado" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const unProducto = await ProductModel.findById(req.params.id);
        if (!unProducto) {
            return res.render('error', { error: "Producto no encontrado" });
        }
        res.render('product', { product: unProducto.toObject() });
    } catch (error) {
        return res.render('error', { error: "Error al obtener el producto solicitado" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const productoAEliminar = await ProductModel.findByIdAndDelete(req.params.id);
        if (!productoAEliminar) {
            return res.render('error', { error: "No se encontró el producto a eliminar" });
        }
        res.redirect('/products');
    } catch (error) {
        return res.render('error', { error: "Error al eliminar el producto" });
    }
});

router.post('/:cartId/add-to-cart/:productId', async (req, res) => {
    try {
        const { cartId, productId } = req.params;

        let cart = await CartModel.findById(cartId);

        if (!cart) {
            if (!req.user || !req.user._id) {
                return res.render('error', { error: 'Usuario no autenticado o carrito no encontrado' });
            }
            cart = new CartModel({ user: req.user._id, products: [] });
            await cart.save();

            console.log('Carrito creado:', cart);
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
        console.error("Error al agregar al carrito:", error);
        res.render('error', { error: 'Error al agregar el producto al carrito' });
    }
});

router.post('/carts/create-and-add-to-cart/:productId', async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.render('error', { error: 'Usuario no autenticado' });
        }
        const cart = new CartModel({ user: req.user._id, products: [] });
        await cart.save();

        const product = await ProductModel.findById(req.params.productId);
        if (!product) {
            return res.render('error', { error: 'Producto no encontrado' });
        }

        cart.products.push({ product: product._id, quantity: 1 });
        await cart.save();
        res.redirect(`/cart/${cart._id}`);
    } catch (error) {
        console.error('Error al crear carrito y agregar producto:', error);
        res.render('error', { error: 'Error al crear el carrito' });
    }
});

router.post('/carts/:cartId/product/:productId', async (req, res) => {
    try {
        const { cartId, productId } = req.params;

        let cart = await CartModel.findById(cartId);

        if (!cart) {
            if (!req.user || !req.user._id) {
                return res.render('error', { error: 'Usuario no autenticado o carrito no encontrado' });
            }
            cart = new CartModel({ user: req.user._id, products: [] });
            await cart.save();
            console.log('Carrito creado:', cart);
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
        console.error('Error al agregar al carrito:', error);
        res.render('error', { error: 'Error al agregar el producto al carrito' });
    }
});




export default router;
