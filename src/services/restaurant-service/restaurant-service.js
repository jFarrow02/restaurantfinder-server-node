const { MongoClient } = require('mongodb');

// const RestaurantInterface = require('../../models/Restaurant');
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
                let restaurants = await collection.find({}).project({ _id: 0 }).toArray();
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
        const client = new MongoClient(DB_URI);
        let result = client.connect()
            .then(async () => {
                const db = client.db(DB_NAME);
                const collection = db.collection(COLLECTION_NAME);

                // Fetch all restaurants for borough name
                let restaurants = await collection.find({ borough: boroughName}).project({ _id: 0 }).toArray();
                return restaurants;
            })
            .catch((err) => {
                client.close();
                throw err;
            });
            return result;
    },

    getRestaurantByName(name) {
        const client = new MongoClient(DB_URI);
        let result = client.connect()
            .then(async () => {
                const db = client.db(DB_NAME);
                const collection = db.collection(COLLECTION_NAME);

                // Fetch restaurants by name
                let restaurant = await collection.findOne({ name: name}, { projection: { _id: 0 } });
                client.close();
                return restaurant;
            })
            .catch((err) => {
                client.close();
                throw err;
            });
            return result;
    },

    getRestaurantsByCuisineType(cuisineType) {
        const client = new MongoClient(DB_URI);
        let result = client.connect()
            .then(async () => {
                const db = client.db(DB_NAME);
                const collection = db.collection(COLLECTION_NAME);

                // Fetch all restaurants for borough name
                let restaurants = await collection.find({ cuisine: cuisineType}).project({ _id: 0 }).toArray();
                client.close();
                console.log('restaurants:', restaurants);
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