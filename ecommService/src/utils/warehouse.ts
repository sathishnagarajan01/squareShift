import axios from 'axios';
class Warehouse {
    constructor() {}

    async getDistance(postalCode: any) {
        try {
            let options = {
                url: `http://15.206.157.204:8080/warehouse/distance?postal_code=${postalCode}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            };
            return await axios(options);
        } catch(err) {
            throw new Error(err.message);
        }
    }
}
export const warehouse = new Warehouse();