import { Request, Response, NextFunction, Router } from 'express';
import { cartService } from '../service/cart.service';
import { ResponseApi } from '../response/responseApi';
export class CartController {
    public static baseRoute = '/cart';
    public router: Router = Router();

    constructor() {
        this.router.post('/item', this.addItem);
        this.router.get('/items/', this.findItems);
        this.router.delete('/', this.deleteItemsByUser);
        this.router.get('/checkout', this.checkoutValue);
    }

    public async addItem(req: Request, res: Response, next: NextFunction) {
        try {
            await cartService.addItem(req);
            ResponseApi.ok(req, res, 'Added to cart');
        } catch(err) {
            ResponseApi.badRequest(req, res, err.message);
        }
    }

    public async findItems(req: Request, res: Response, next: NextFunction) {
        try {
            let cartList = await cartService.getItems(req);
            ResponseApi.ok(req, res, cartList);
        } catch(err) {
            ResponseApi.badRequest(req, res, err.message);
        }
    }

    public async deleteItemsByUser(req: Request, res: Response, next: NextFunction) {
        try {
            await cartService.deleteItem(req);
            ResponseApi.ok(req, res, 'All items deleted in cart');
        } catch(err) {
            ResponseApi.badRequest(req, res, err.message);
        }
    }

    public async checkoutValue(req: Request, res: Response, next: NextFunction) {
        try {
            let checkout = await cartService.checkoutValue(req);
            ResponseApi.ok(req, res, checkout);
        } catch(err) {
            ResponseApi.serverError(req, res, err.message);
        }
    }
}