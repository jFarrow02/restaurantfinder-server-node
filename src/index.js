const express = require('express');
const server = express();
const RestaurantService = require('./services/restaurant-service/restaurant-service');
const RestaurantsRouter = require('./routers/restaurants')(RestaurantService);


server.use('/restaurants', RestaurantsRouter);
// const { MongoClient } = require('mongodb');
// const documents = require('./data/restaurants.json');


// server.get('/seed_db', async (req, res) => {
//     const url = 'mongodb://restaurantfinder_app:eqjsRSTFNDR2973@localhost:27017';
//     const dbName = 'restaurantfinder';
//     const client = new MongoClient(url);

//     // Connect to db
//     client.connect((err) => {
//         if(err){
//             throw(err);
//         }
//         const db = client.db(dbName);
//         const collection = db.collection('restaurants');
//         collection.insertMany(documents)
//             .then((result) => {
//                 console.log('Documents inserted OK: ' + result);
//                 client.close();
//                 res.status(200).send({ status: 200});
//             })
//             .catch((err) => {
//                 console.log(err);
//                 client.close();
//                 res.status(500).send({ status: 500});
//             });
//     });
// });

server.listen(8000, () => {
    console.log('Server listening on port 8000');
});