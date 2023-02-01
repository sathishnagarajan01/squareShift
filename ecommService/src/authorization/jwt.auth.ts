// import jwt from 'jsonwebtoken';
import { verify, sign, decode, Secret } from 'jsonwebtoken';
import { AppConfig } from '../config/appconfig';
class Jwt {
    public async verifyJwt(appConfig: AppConfig, token: string) {
        try {
            let privateKey = appConfig.jwtPrivateKey;
            let verified = verify(token, privateKey);
            return true;
        } catch(err) {
            return false;
        }
    }

    public async decodeJwt(token: string) {
        try {
            let verified = decode(token);
            return verified;
        } catch(err) {
            return false;
        }
    }

    public async signInJwt(payload: any, appConfig: AppConfig) {
        try {
            let token = sign(
                payload,
                appConfig.jwtPrivateKey,
                { expiresIn: '1h' }
            );
            return token;
        } catch(err) {
            return false;
        }
    }
}
export const jwt = new Jwt();