import { Request, Response, NextFunction, Router } from 'express';
import { userService } from '../service/user.service';
import { ResponseApi } from '../response/responseApi';
export class UserController {
    public static baseRoute = '/user';
    public router: Router = Router();

    constructor() {
        this.router.post('/add', this.addUser);
        this.router.get('/find/', this.findUser);
        // this.router.delete('/delete', this.deleteUser);
    }

    public async addUser(req: Request, res: Response, next: NextFunction) {
        try {
            await userService.addUser(req.body);
            ResponseApi.ok(req, res, 'User added');
        } catch(err) {
            ResponseApi.badRequest(req, res, err.message);
        }
    }

    public async findUser(req: Request, res: Response, next: NextFunction) {
        try {
            let cartList = await userService.getUser(req);
            ResponseApi.ok(req, res, cartList);
        } catch(err) {
            ResponseApi.badRequest(req, res, err.message);
        }
    }

    public async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            await userService.deleteuser(req);
            ResponseApi.ok(req, res, 'User deleted');
        } catch(err) {
            ResponseApi.badRequest(req, res, err.message);
        }
    }
}