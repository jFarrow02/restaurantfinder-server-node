const Router = require('express').Router;
const RestaurantsRouter = new Router();
const RestaurantService = require('../services/restaurant-service/restaurant-service');


// Get all restaurants
RestaurantsRouter.get('/find/all', async (req, res) => {
    const data = await RestaurantService.getAllRestaurants();
    console.log(data);
    res.status(200).send({ body: data });
});

// Get restuarants by borough
RestaurantsRouter.get('/find/borough/:borough_name', (req, res) => {
    res.status(200).send({ data: 'hello from /find/borough/:borough_name' });
});

// Get restuarants by cuisine type
RestaurantsRouter.get('/find/cuisine/:cuisine_type', (req, res) => {
    res.status(200).send({ data: '/find/cuisine/:cuisine_type' });
});

// Get restaurants by avg. grade
RestaurantsRouter.get('/find/avg_grade/', (req, res) => {
    res.status(200).send({ data: '/find/avg_grade/' });
});

// Get one restaurant by name
RestaurantsRouter.get('/find/name/:restaurant_name', (req, res) => {
    res.status(200).send({ data: '/find/name/:restaurant_name' });
});

module.exports = {
    RestaurantsRouter,
};