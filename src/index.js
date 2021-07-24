const express = require('express');
const cors = require('cors');
const server = express();

const RestaurantService = require('./services/restaurant-service/restaurant-service');
const RestaurantsRouter = require('./routers/restaurants')(RestaurantService);
const CuisineTypeService = require('./services/cuisine-type/cuisine-type-service');
const CuisineTypeRouter = require('./routers/cuisine-types')(CuisineTypeService);

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
}

server.use(cors(corsOptions));
server.use('/restaurants', RestaurantsRouter);
server.use('/cuisine-type', CuisineTypeRouter);

server.listen(8000, () => {
    console.log('Server listening on port 8000');
});