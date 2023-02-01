import { Request, Response, NextFunction, Router } from 'express';
import { jwt } from '../authorization/jwt.auth';
import { userModel } from "../model/user.schema";
import { loginDto } from "../dto/login.dto";

class UserService {
    constructor() {}

    async addUser(payload: any) {
        try {
            let user = new userModel(payload);
            await user.save();
            // await userModel.insertMany([payload]);
        } catch(err) {
            throw new Error(err);
        }
    }

    async getUser(req: Request) {
        try {
            let bearerToken: any = req.headers.bearerToken;
            let jwtDecode: any = await jwt.decodeJwt(bearerToken);
            return await userModel.find({userId: jwtDecode.userId});
        } catch(err) {
            throw new Error(err);
        }
    }

    async loginUser(reqPayload: loginDto) {
        try {
            return await userModel.find({username: reqPayload.username});
        } catch(err) {
            throw new Error(err);
        }
    }

    async deleteuser(req: Request) {
        try {
            let bearerToken: any = req.headers.bearerToken;
            let jwtDecode: any = await jwt.decodeJwt(bearerToken);
            await userModel.deleteMany({userId: jwtDecode.userId});
        } catch(err) {
            throw new Error(err);
        }
    }
}

export const userService = new UserService();