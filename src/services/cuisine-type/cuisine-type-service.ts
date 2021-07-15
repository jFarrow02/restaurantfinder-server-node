export {}
const { MongoClient } = require('mongodb');
const DB_USER = process.env.RESTAURANTFINDER_DB_USER;
const DB_PASSWORD = process.env.RESTAURANTFINDER_DB_PASSWORD;
const DB_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@localhost:27017`;
const DB_NAME = process.env.RESTAURANTFINDER_DB_NAME;
const COLLECTION_NAME = 'cuisine-types';
const client = new MongoClient(DB_URI);
const {CuisineType} = require('../../models/CuisineType');

const CuisineTypeService = {

    getAllCuisineTypes():Promise<[typeof CuisineType]> {
        let results = client.connect()
            .then(async () => {
                const db = client.db(DB_NAME);
                const cuisineTypes = await db.collection(COLLECTION_NAME).find({}).toArray();
                client.close();
                return cuisineTypes;
                    
            })
            .catch((err:Error) => {
                throw err;
            });
        return results;
    },
};

module.exports = CuisineTypeService;