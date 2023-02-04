import { Request, Response, NextFunction, Router } from 'express';
import { warehouse } from '../utils/warehouse';
import { jwt } from '../authorization/jwt.auth';
import { cartModel } from "../model/cart.schema";
import { warehouseDto } from '../dto/warehouse.dto';
import { shipping } from '../utils/shipping';
import { checkoutValue } from '../response/checkout.response';

class CartService {
    constructor() {}

    async addItem(req: Request) {
        try {
            let payload = req.body;
            // let cart = new cartModel();
            // await cart.save(payload);
            let bearerToken: any = req.headers.bearerToken;
            let jwtDecode: any = await jwt.decodeJwt(bearerToken);
            payload['userId'] = jwtDecode.userId;
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

    async calculateCheckoutPrice(itemList, distance) {
        let checkoutPrice: checkoutValue = {
            price: 0,
            discountedPrice: 0,
            discountedPriceString: '0',
            totalPrice: 0,
            totalPriceString: '0',
            totalWeight: 0,
            shippingCost: 0,
            distance: distance
        }
        for(let cart of itemList) {
            checkoutPrice.price = cart.item.price + checkoutPrice.price;
            checkoutPrice.discountedPrice = (cart.item.price * (cart.item.discount_percentage/100)) + checkoutPrice.discountedPrice;
            checkoutPrice.totalWeight = (cart.item.weight_in_grams/1000) + checkoutPrice.totalWeight;
        }
        checkoutPrice.discountedPriceString = (checkoutPrice.discountedPrice).toFixed(2);
        checkoutPrice.shippingCost = await shipping.getShippingCost(distance, checkoutPrice.totalWeight);
        checkoutPrice.totalPrice = (checkoutPrice.price+checkoutPrice.shippingCost)-checkoutPrice.discountedPrice;
        checkoutPrice.totalPriceString = checkoutPrice.totalPrice.toFixed(2);
        return checkoutPrice;
    }

    async checkoutValue(req: Request) {
        try {
            let schemaValidate = await warehouseDto.warehouseSchema();
            const { error, value } = schemaValidate.validate(req.query);
            if(error) throw new Error(error.message);

            let bearerToken: any = req.headers.bearerToken;
            let jwtDecode: any = await jwt.decodeJwt(bearerToken);
            let warehouseDistance = await warehouse.getDistance(req.query.postalCode);
            let distance = warehouseDistance.data.distance_in_kilometers;
            let itemList = await cartModel.find({userId: jwtDecode.userId});
            return this.calculateCheckoutPrice(itemList, distance);
        } catch(err) {
            throw new Error(err);
        }
    }
}

export const cartService = new CartService();