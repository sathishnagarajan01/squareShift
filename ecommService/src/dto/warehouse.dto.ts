import * as Joi from 'joi';

class WarehouseDto {
    constructor() {}

    async warehouseSchema() {
        return Joi.object({
            postalCode: Joi.string().min(6).max(6).required()
        });
    }
}
export const warehouseDto = new WarehouseDto();