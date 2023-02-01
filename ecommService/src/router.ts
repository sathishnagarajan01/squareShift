import * as express from 'express';
import { CartController } from './controller/cart.controller';
import { DashboardController } from './controller/dashboard.controller';
import { LoginController } from './controller/login.controller';
import { UserController } from './controller/user.controller';

export class ApiRouting {
    constructor() {}

    public static ConfigureRouters(app: express.Express) {
        app.use(DashboardController.baseRoute, new DashboardController().router);
        app.use(CartController.baseRoute, new CartController().router);
        app.use(UserController.baseRoute, new UserController().router);
    }

    public static ConfigureUnAuthRouters(app: express.Express) {
        app.use(LoginController.baseRoute, new LoginController().router);
    }
}