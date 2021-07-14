const express = require('express');
const server = express();
const RestaurantService = require('./services/restaurant-service/restaurant-service');
const RestaurantsRouter = require('./routers/restaurants')(RestaurantService);

server.use('/restaurants', RestaurantsRouter);

server.listen(8000, () => {
    console.log('Server listening on port 8000');
});