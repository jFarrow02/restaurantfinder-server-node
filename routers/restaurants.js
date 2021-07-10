const Router = require('express').Router;
const RestaurantsRouter = new Router();
const RestaurantService = require('../services/restaurant-service/restaurant-service');


// Get all restaurants
RestaurantsRouter.get('/find/all', async (req, res) => {
    const data = await RestaurantService.getAllRestaurants();
    res.status(200).send({ body: data });
});

// Get restuarants by borough
RestaurantsRouter.get('/find/borough/:borough_name', async (req, res) => {
    const data = await RestaurantService.getRestaurantsByBorough(req.params.borough_name);
    res.status(200).send({ body: data });
});

// Get restuarants by cuisine type
RestaurantsRouter.get('/find/cuisine/:cuisine_type', async (req, res) => {
    const data = await RestaurantService.getRestaurantsByCuisineType(req.params.cuisine_type);
    res.status(200).send({ body: data });
});

// Get restaurants by avg. grade
RestaurantsRouter.get('/find/avg_grade/', (req, res) => {
    res.status(200).send({ data: '/find/avg_grade/' });
});

// Get one restaurant by name
RestaurantsRouter.get('/find/name/:restaurant_name', async (req, res) => {
    const data = await RestaurantService.getRestaurantsByBorough(req.params.restaurant_name);
    res.status(200).send({ body: data });
});

module.exports = {
    RestaurantsRouter,
};