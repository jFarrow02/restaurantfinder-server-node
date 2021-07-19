const Router = require('express').Router;
const morgan = require('morgan');
const { STATUS_CODES, ERR_MESSAGES } = require('../config/constants/http');
const { OK, SERVER_ERR } = STATUS_CODES;

const RestaurantsRouter = (restaurantService) => {
    const router = new Router();
    router.use(morgan('dev'));

    // Get all restaurants
    router.get('/find/all', async (req, res) => {
        const data = await restaurantService.getAllRestaurants();
        const { status, data: restaurants } = data;
        if(status === OK) {
            res.status(OK).json(restaurants);
        } else {
            res.status(SERVER_ERR).json({ status, err: ERR_MESSAGES[SERVER_ERR] });
        }
    });

    // Get restuarants by borough
    router.get('/find/borough/:borough_name', async (req, res) => {
        const data = await restaurantService.getRestaurantsByBorough(req.params.borough_name);
        const { status, data: restaurants} = data;
        if(status === OK) {
            res.status(OK).json(restaurants);
        } else {
            res.status(SERVER_ERR).json({ status, err: ERR_MESSAGES[SERVER_ERR] });
        }
    });

    // Get restuarants by cuisine type
    router.get('/find/cuisine/:cuisine_type', async (req, res) => {
        const data = await restaurantService.getRestaurantsByCuisineType(req.params.cuisine_type);
        const { status } = data;
        if(status === OK) {
            res.status(OK).json(data);
        } else {
            res.status(SERVER_ERR).json({ status, err: ERR_MESSAGES[SERVER_ERR] });
        }
    });

    // Get restaurants by avg. grade
    router.get('/find/avg_grade/', (req, res) => {
        const { status } = data;
        if(status === OK) {
            res.status(OK).json(data);
        } else {
            res.status(SERVER_ERR).json({ status, err: data.err });
        }
    });

    // Get one restaurant by name
    router.get('/find/name/:restaurant_name', async (req, res) => {
        const data = await restaurantService.getRestaurantByName(req.params.restaurant_name);
        const { status, data: restaurants} = data;
        if(status === OK) {
            res.status(OK).json(restaurants);
        } else {
            res.status(SERVER_ERR).json({ status, err: ERR_MESSAGES[SERVER_ERR] });
        }
    });
   
    return router;
}


module.exports = RestaurantsRouter;