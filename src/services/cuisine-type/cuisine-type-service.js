const { MongoClient } = require('mongodb');
const DB_USER = process.env.RESTAURANTFINDER_DB_USER;
const DB_PASSWORD = process.env.RESTAURANTFINDER_DB_PASSWORD;
const DB_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@localhost:27017`;
const DB_NAME = process.env.RESTAURANTFINDER_DB_NAME;
const COLLECTION_NAME = 'cuisine-types';

// const {CuisineType} = require('../../models/CuisineType');

const CuisineTypeService = {

    getAllCuisineTypes() {
        const client = new MongoClient(DB_URI);
        let results = client.connect()
            .then(async () => {
                const db = client.db(DB_NAME);
                const cuisineTypes = await db.collection(COLLECTION_NAME).find({}).project({ _id: 0 }).toArray();
                return cuisineTypes;
                    
            })
            .catch((err) => {
                throw err;
            });
            
        client.close();
        return results;
    },
};

module.exports = CuisineTypeService;