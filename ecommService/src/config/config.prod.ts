export class ProductionConfig {

    public DbConnectionString() {
        return {
            url: '127.0.0.1',
            user: 'admin',
            password: 'admin',
            port: 3306,
            database: "db"
        };
    }

    public appConfig() {
        return {
            name: 'Astro Software',
            version: '1.0.0',
            port: process.env.PORT,
            environment: process.env.NODE_ENV,
            baseRoute: '/api',
            baseTestRoute: '/api/test',
            jwtPrivateKey: 'sathish'
        }
    }
}