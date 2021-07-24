const { MongoClient } = require('mongodb');
const { STATUS_CODES } = require('../../config/constants/http');
const DB_USER = process.env.RESTAURANTFINDER_DB_USER;
const DB_PASSWORD = process.env.RESTAURANTFINDER_DB_PASSWORD;
const DB_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@localhost:27017`;
const DB_NAME = process.env.RESTAURANTFINDER_DB_NAME;
const COLLECTION_NAME = 'cuisine-types';

// const {CuisineType} = require('../../models/CuisineType');
const { OK, SERVER_ERR } = STATUS_CODES;
const CuisineTypeService = {

    getAllCuisineTypes() {
        const client = new MongoClient(DB_URI, { useUnifiedTopology: true });
        let results = client.connect()
            .then(async () => {
                const db = client.db(DB_NAME);
                const cuisineTypes = await db.collection(COLLECTION_NAME).find({}).project({ _id: 0 }).toArray();
                client.close();
                // return cuisineTypes;
                return { status: OK, data: cuisineTypes };
                    
            })
            .catch((err) => {
                console.log(err);
                client.close();
                return { status: SERVER_ERR, err: err.message };
            });
        return results;
    },
};

module.exports = CuisineTypeService;