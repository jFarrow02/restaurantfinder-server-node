export {};

const { MongoClient } = require('mongodb');
const { CUISINE_CONFIG } = require('../config');
const CUISINE_COLLECTION = 'cuisine-types';

const {CuisineType} = require('../../models/CuisineType');

const CuisineTypeService = {

    getAllCuisineTypes(): Promise<typeof CuisineType[]>{
        const client = new MongoClient(CUISINE_CONFIG.DB_URI);
        let results = client.connect()
            .then(async () => {
                const db = client.db(CUISINE_CONFIG.DB_NAME);
                const cuisineTypes = await db.collection(CUISINE_COLLECTION).find({}).project({ _id: 0 }).toArray();
                return cuisineTypes;
                    
            })
            .catch((err: Error) => {
                throw err;
            });
            
        client.close();
        return results;
    },
};

module.exports = CuisineTypeService;