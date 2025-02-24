import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
const {Schema} = mongoose;

const productCollection = "product";
const productSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    description: {type: String, required: true},
});

productSchema.plugin(mongoosePaginate);
const ProductModel = mongoose.model(productCollection, productSchema);
export default ProductModel;