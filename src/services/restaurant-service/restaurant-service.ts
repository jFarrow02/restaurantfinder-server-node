export {};
const { MongoClient } = require('mongodb');
const { RESTAURANT_CONFIG } = require('../config');
const RestaurantInterface = require('../../models/Restaurant');
const COLLECTION_NAME = 'restaurants';

const RestaurantService = {

    getAllRestaurants():Promise<typeof RestaurantInterface[]> {
        const client = new MongoClient(RESTAURANT_CONFIG.DB_URI);
        let result = client.connect()
            .then(async () => {
                const db = client.db(RESTAURANT_CONFIG.DB_NAME);
                const collection = db.collection(COLLECTION_NAME);

                // Fetch all restaurants
                let restaurants = await collection.find({}).project({ _id: 0 }).toArray();
                client.close();
                return restaurants;
            })
            .catch((err: Error) => {
                client.close();
                throw err;
            });
        return result;
    },

    getRestaurantsByBorough(boroughName: string){
        const client = new MongoClient(RESTAURANT_CONFIG.DB_URI);
        let result = client.connect()
            .then(async () => {
                const db = client.db(RESTAURANT_CONFIG.DB_NAME);
                const collection = db.collection(COLLECTION_NAME);

                // Fetch all restaurants for borough name
                let restaurants = await collection.find({ borough: boroughName}).project({ _id: 0 }).toArray();
                client.close();
                return restaurants;
            })
            .catch((err: Error) => {
                client.close();
                throw err;
            });
            return result;
    },

    getRestaurantByName(name: string) {
        const client = new MongoClient(RESTAURANT_CONFIG.DB_URI);
        let result = client.connect()
            .then(async () => {
                const db = client.db(RESTAURANT_CONFIG.DB_NAME);
                const collection = db.collection(COLLECTION_NAME);

                // Fetch restaurants by name
                let restaurants = await collection.findOne({ name: name}, { _id: 0 });
                client.close();
                return restaurants;
            })
            .catch((err: Error) => {
                client.close();
                throw err;
            });
            return result;
    },

    getRestaurantByCusineType(cuisineType: string) {
        const client = new MongoClient(RESTAURANT_CONFIG.DB_URI);
        let result = client.connect()
            .then(async () => {
                const db = client.db(RESTAURANT_CONFIG.DB_NAME);
                const collection = db.collection(COLLECTION_NAME);

                // Fetch all restaurants for borough name
                let restaurants = await collection.find({ cusine: cuisineType}).project({ _id: 0 }).toArray();
                client.close();
                return restaurants;
            })
            .catch((err: Error) => {
                client.close();
                throw err;
            });
            return result;
    },
};

module.exports = RestaurantService;