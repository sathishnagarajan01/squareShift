import { envConfig } from '../config/envconfig';
import { jwt } from '../authorization/jwt.auth';
import { loginDto } from "../dto/login.dto";
import * as bcrypt from 'bcrypt';
import { userService } from './user.service';

class LoginService {
    constructor() {}

    public checkUser = async (reqPayload: loginDto) => {
        try {
            let envCfg = envConfig.getConfig();
            let userDetails = await userService.loginUser(reqPayload);
            let metaData = {
                userId: userDetails[0].userId
            }
            const isValid = await bcrypt.compare(reqPayload.password, userDetails[0].password);
            if(!isValid) {
                return false;
            }
            let jwtToken = await jwt.signInJwt(metaData, envCfg.appConfig());
            if(jwtToken) {
                return jwtToken;
            } else {
                return false;
            }
        } catch(err) {
            return false;
        }
    }
}
export const loginService = new LoginService();