const Router = require('express').Router;

const RestaurantsRouter = (restaurantService) => {
    const router = new Router();
    
    // Get all restaurants
    router.get('/find/all', async (req, res) => {
        const data = await restaurantService.getAllRestaurants();
        res.status(200).json(data);
    });

    // Get restuarants by borough
    router.get('/find/borough/:borough_name', async (req, res) => {
        const data = await restaurantService.getRestaurantsByBorough(req.params.borough_name);
        res.status(200).json(data);
    });

    // Get restuarants by cuisine type
    router.get('/find/cuisine/:cuisine_type', async (req, res) => {
        const data = await restaurantService.getRestaurantsByCuisineType(req.params.cuisine_type);
        res.status(200).json(data);
    });

    // Get restaurants by avg. grade
    router.get('/find/avg_grade/', (req, res) => {
        res.status(200).json({ data: '/find/avg_grade/' });
    });

    // Get one restaurant by name
    router.get('/find/name/:restaurant_name', async (req, res) => {
        const data = await restaurantService.getRestaurantByName(req.params.restaurant_name);
        res.status(200).json(data);
    });

    // test route
    router.get('/test', (req, res) => {
        res.status(200).json({ body: 'test' });
    });
   
    return router;
}


module.exports = RestaurantsRouter;