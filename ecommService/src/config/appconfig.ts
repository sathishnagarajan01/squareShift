export interface AppConfig {
    name: string,
    version: string,
    port: string,
    environment: string,
    baseRoute: string
    baseTestRoute: string,
    jwtPrivateKey: string
}