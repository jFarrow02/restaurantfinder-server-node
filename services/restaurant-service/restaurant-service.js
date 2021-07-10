const { MongoClient } = require('mongodb');

const DB_USER = process.env.RESTAURANTFINDER_DB_USER;
const DB_PASSWORD = process.env.RESTAURANTFINDER_DB_PASSWORD;
const DB_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@localhost:27017`;
const DB_NAME = process.env.RESTAURANTFINDER_DB_NAME;
const COLLECTION_NAME = 'restaurants';

const RestaurantService = {

    // getAllRestaurants() {
    //     const client = new MongoClient(DB_URI);
    //     let foo = client.connect((err) => {
    //         if(err) {
    //             throw err;
    //         }
    //         const db = client.db(DB_NAME);
    //         const collection = db.collection(COLLECTION_NAME);
    //         return new Promise((resolve) => {
    //             resolve(99);
    //         });
            // Fetch all restaurants
            // collection.find({}).toArray()
            //     .then(data => {
            //         console.log('data:', data[0]);
            //         restaurants = data;
            //         client.close();
            //         return 'foo';
            //         // return new Promise((resolve) => {resolve(data)});
            //     })
            //     .catch(err => {
            //         client.close();
            //         throw err;
            //     });
            //     console.log('restaurants:', restaurants);
        // });
        
        // return true;
    // }

    getAllRestaurants() {
        const client = new MongoClient(DB_URI);
        const foo = client.connect()
            .then(res => {
                // return new Promise((resolve) => {
                //     resolve(res);
                // })
                return Promise.resolve('foo');
            })
            .catch(err => {
                throw err;
            })
        return foo;
    }
};

module.exports = RestaurantService;