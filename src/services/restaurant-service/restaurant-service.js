const { MongoClient } = require('mongodb');

// const RestaurantInterface = require('../../models/Restaurant');
const DB_USER = process.env.RESTAURANTFINDER_DB_USER;
const DB_PASSWORD = process.env.RESTAURANTFINDER_DB_PASSWORD;
const DB_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@localhost:27017`;
const DB_NAME = process.env.RESTAURANTFINDER_DB_NAME;
const COLLECTION_NAME = 'restaurants';
const client = new MongoClient(DB_URI);

const RestaurantService = {

    getAllRestaurants() {
        let result = client.connect()
            .then(async () => {
                const db = client.db(DB_NAME);
                const collection = db.collection(COLLECTION_NAME);

                // Fetch all restaurants
                let restaurants = await collection.find({}).toArray();
                client.close();
                return restaurants;
            })
            .catch((err) => {
                client.close();
                throw err;
            });
        return result;
    },

    getRestaurantsByBorough(boroughName){
        let result = client.connect()
            .then(async () => {
                const db = client.db(DB_NAME);
                const collection = db.collection(COLLECTION_NAME);

                // Fetch all restaurants for borough name
                let restaurants = await collection.find({ borough: boroughName}).toArray();
                client.close();
                return restaurants;
            })
            .catch((err) => {
                client.close();
                throw err;
            });
            return result;
    },

    getRestaurantByName(name) {
        let result = client.connect()
            .then(async () => {
                const db = client.db(DB_NAME);
                const collection = db.collection(COLLECTION_NAME);

                // Fetch restaurants by name
                let restaurants = await collection.findOne({ name: name});
                client.close();
                return restaurants;
            })
            .catch((err) => {
                client.close();
                throw err;
            });
            return result;
    },

    getRestaurantByCusineType(cuisineType) {
        let result = client.connect()
            .then(async () => {
                const db = client.db(DB_NAME);
                const collection = db.collection(COLLECTION_NAME);

                // Fetch all restaurants for borough name
                let restaurants = await collection.find({ cusine: cuisineType}).toArray();
                client.close();
                return restaurants;
            })
            .catch((err) => {
                client.close();
                throw err;
            });
            return result;
    },
};

module.exports = RestaurantService;