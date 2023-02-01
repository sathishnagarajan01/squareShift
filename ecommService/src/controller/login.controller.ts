import { Request, Response, NextFunction, Router } from 'express';
import { loginService } from '../service/login.service';
import { ResponseApi } from '../response/responseApi';
export class LoginController {
    public static baseRoute = '/login';
    public router: Router = Router();

    constructor() {
        this.router.post('/', this.loginApp);
    }

    private loginApp = async (req: Request, res: Response, next: NextFunction) => {
        let serviceCall = await loginService.checkUser(req.body);
        if(serviceCall) {
            ResponseApi.ok(req, res, serviceCall);
        } else {
            ResponseApi.unauthorized(req, res);
        }
    }
}