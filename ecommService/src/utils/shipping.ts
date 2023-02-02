import * as fs from 'fs';
import { dirname, basename, join } from 'path';
class Shipping {
    constructor() {}

    /**
     * not used
     */
    async getCost() {
        let jsonData = {};
        const filePath = join(__dirname, '../constant/shippingRangeMatrix.json');
        const readable = await fs.createReadStream(filePath, {encoding: 'utf8'});
        /*readable.on('data', async (chunk: string) => {
            jsonData = await JSON.parse(chunk);
        });*/
    }

    /**
     * get price by distance and weight
     * @param distance 
     * @param weight 
     * @returns price
     */
    async getShippingCost(distance, weight) {
        if(weight < 2) {
            if(distance < 5) {
                return 12;
            } else if(distance > 5 && distance < 20) {
                return 15;
            } else if(distance > 20 && distance < 50) {
                return 20;
            } else if(distance > 50 && distance < 500) {
                return 50;
            } else if(distance > 500 && distance < 800) {
                return 100;
            } else if(distance > 800) {
                return 220;
            }
        } else if(weight>2.01 && weight < 5) {
            if(distance < 5) {
                return 14;
            } else if(distance > 5 && distance < 20) {
                return 18;
            } else if(distance > 20 && distance < 50) {
                return 24;
            } else if(distance > 50 && distance < 500) {
                return 55;
            } else if(distance > 500 && distance < 800) {
                return 110;
            } else if(distance > 800) {
                return 250;
            }
        } else if(weight>5.01 && weight < 20) {
            if(distance < 5) {
                return 16;
            } else if(distance > 5 && distance < 20) {
                return 25;
            } else if(distance > 20 && distance < 50) {
                return 30;
            } else if(distance > 50 && distance < 500) {
                return 80;
            } else if(distance > 500 && distance < 800) {
                return 130;
            } else if(distance > 800) {
                return 270;
            }
        } else if(weight>20.01) {
            if(distance < 5) {
                return 21;
            } else if(distance > 5 && distance < 20) {
                return 35;
            } else if(distance > 20 && distance < 50) {
                return 50;
            } else if(distance > 50 && distance < 500) {
                return 90;
            } else if(distance > 500 && distance < 800) {
                return 150;
            } else if(distance > 800) {
                return 300;
            }
        }
    }
}
export const shipping = new Shipping();