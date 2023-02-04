export abstract class BaseConfig {

    abstract DbConnectionString(): {
        url: string,
        user: string,
        password: string,
        port: number,
        database: string
    };

    abstract appConfig(): {
        name: string,
        version: string,
        port: string,
        environment: string,
        baseRoute: string
        baseTestRoute: string,
        jwtPrivateKey: string
    }
}