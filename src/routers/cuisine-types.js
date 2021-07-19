const Router = require('express').Router;
const morgan = require('morgan');
const { STATUS_CODES, ERR_MESSAGES } = require('../config/constants/http');
const { OK, SERVER_ERR } = STATUS_CODES;

const CuisineTypeRouter = (cuisineTypeService) => {

    const router = new Router();
    router.use(morgan('dev'));

    router.get('/find/all', async (req, res) => {
        const data = await cuisineTypeService.getAllCuisineTypes();
        const { status, data: cuisineTypes } = data;
        if(status === OK){
            res.status(OK).json(cuisineTypes);
        } else {
            res.status(SERVER_ERR).json({ err: ERR_MESSAGES[SERVER_ERR ]});
        }
    });

    return router;
};

module.exports = CuisineTypeRouter;