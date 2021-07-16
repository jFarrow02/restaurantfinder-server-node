export {};
const Router = require('express').Router;
const { STATUS_CODES } = require('./constants/http');

const RestaurantsRouter = (restaurantService: any) => {
    const router = new Router();
    const { OK } = STATUS_CODES;
    
    // Get all restaurants
    router.get('/find/all', async (req: any, res: any) => {
        const data = await restaurantService.getAllRestaurants();
        res.status(OK).json(data);
    });

    // Get restuarants by borough
    router.get('/find/borough/:borough_name', async (req: any, res: any) => {
        const data = await restaurantService.getRestaurantsByBorough(req.params.borough_name);
        res.status(OK).json(data);
    });

    // Get restuarants by cuisine type
    router.get('/find/cuisine/:cuisine_type', async (req: any, res: any) => {
        const data = await restaurantService.getRestaurantsByCuisineType(req.params.cuisine_type);
        res.status(OK).json(data);
    });

    // Get restaurants by avg. grade
    router.get('/find/avg_grade/', (req: any, res: any) => {
        res.status(OK).json({ data: '/find/avg_grade/' });
    });

    // Get one restaurant by name
    router.get('/find/name/:restaurant_name', async (req: any, res: any) => {
        const data = await restaurantService.getRestaurantsByBorough(req.params.restaurant_name);
        res.status(OK).json(data);
    });

    // test route
    router.get('/test', (req: any, res: any) => {
        res.status(OK).json({ body: 'test' });
    });
   
    return router;
}


module.exports = RestaurantsRouter;