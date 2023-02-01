import mongoose from 'mongoose';
import { connString } from '../utils/database';
const Schema = mongoose.Schema;
const SchemaTypes = Schema.Types;

// mongoConnection.setConnection('test');
// const connString = mongoConnection.getConnection();

const cartTable = new Schema({
    userId: {
        type: Number,
        required: true,
        index: true
    },
    item: {
        id: {
            type: Number,
            required: true,
            index: true
        },
        title: String,
        price: Number,
        category: String,
        image: String,
        description: String,
        discount_percentage: Number,
        weight_in_grams: Number,
        rating: {
            count: Number,
            rate: Number
        }
    }
});
export const cartModel = connString.model('cartTable', cartTable);

/*class CartSchema {
    constructor() {}

    createCart() {
        try {
            
        } catch(err) {
            console.log('schema err');
            throw new Error(err);
        }
    }
}
export const cartModel = new CartSchema();*/