import { Request, Response, NextFunction, Router } from 'express';
import { jwt } from '../authorization/jwt.auth';
import { cartModel } from "../model/cart.schema";

class CartService {
    constructor() {}

    async addItem(payload: any) {
        try {
            // let cart = new cartModel();
            // await cart.save(payload);
            await cartModel.insertMany([payload]);
        } catch(err) {
            throw new Error(err);
        }
    }

    async getItems(req: Request) {
        try {
            let bearerToken: any = req.headers.bearerToken;
            let jwtDecode: any = await jwt.decodeJwt(bearerToken);
            return await cartModel.find({userId: jwtDecode.userId});
        } catch(err) {
            throw new Error(err);
        }
    }

    async deleteItem(req: Request) {
        try {
            let bearerToken: any = req.headers.bearerToken;
            let jwtDecode: any = await jwt.decodeJwt(bearerToken);
            await cartModel.deleteMany({userId: jwtDecode.userId});
        } catch(err) {
            throw new Error(err);
        }
    }
}

export const cartService = new CartService();