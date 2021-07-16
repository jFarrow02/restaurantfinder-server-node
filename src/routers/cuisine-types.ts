export {};
const { STATUS_CODES } = require('./constants/http');

const Router = require('express').Router;

const CuisineTypeRouter = (cuisineTypeService: any) => {

    const router = new Router();
    const { OK } = STATUS_CODES;

    router.get('/find/all', async (req: any, res: any) => {
        const data = await cuisineTypeService.getAllCuisineTypes();
        res.status(OK).json(data);
    });

    return router;
};

module.exports = CuisineTypeRouter;