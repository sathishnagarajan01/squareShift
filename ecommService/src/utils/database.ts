import mongoose from 'mongoose';
import { envConfig } from '../config/envconfig';

export const connString = mongoose.createConnection(`mongodb://127.0.0.1:27017/test`);

/*class MongoConnection {
    private connString: mongoose.Connection;
    constructor() {}

    setConnection(dbName: string) {
        try {
            let envCfg = envConfig.getConfig();
            let url = envCfg.DbConnectionString().url;
            let port = envCfg.DbConnectionString().port;
            this.connString = mongoose.createConnection(`mongodb://${url}:${port}/${dbName}`);
            console.log(this.connString);
        } catch(err) {
            this.connString = null;
        }
    }

    getConnection() {
        return this.connString;
    }
}
export const mongoConnection = new MongoConnection();*/