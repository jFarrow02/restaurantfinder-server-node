const { MongoClient } = require('mongodb');

const DB_USER = process.env.RESTAURANTFINDER_DB_USER;
const DB_PASSWORD = process.env.RESTAURANTFINDER_DB_PASSWORD;
const DB_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@localhost:27017`;
const DB_NAME = process.env.RESTAURANTFINDER_DB_NAME;
const COLLECTION_NAME = 'restaurants';

const RestaurantService = {

    getAllRestaurants() {
        const client = new MongoClient(DB_URI);
        let result = client.connect()
            .then(async () => {
                const db = client.db(DB_NAME);
                const collection = db.collection(COLLECTION_NAME);

                // Fetch all restaurants
                let restaurants = await collection.find({}).toArray();
                return restaurants;
            })
            .catch(err => {
                throw err;
            })
        return result;
    }
};

module.exports = RestaurantService;