export class DevConfig {

    public DbConnectionString() {
        return {
            url: '127.0.0.1',
            user: 'admin',
            password: 'admin',
            port: 27017,
            database: "test"
        };
    }

    public appConfig() {
        return {
            name: 'Square Shift E-Commerce',
            version: '1.0.0',
            port: process.env.PORT,
            environment: process.env.NODE_ENV,
            baseRoute: '/api',
            baseTestRoute: '/api/test',
            jwtPrivateKey: 'sathish'
        }
    }
}