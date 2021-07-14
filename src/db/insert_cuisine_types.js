const { MongoClient } = require('mongodb');

const DB_CONN_STRING = `mongodb://${process.env.RESTAURANTFINDER_DB_USER}:${process.env.RESTAURANTFINDER_DB_PASSWORD}@localhost:27017`;
const DB_NAME = process.env.RESTAURANTFINDER_DB_NAME;
const insertCuisineType = () => {
    const client = new MongoClient(DB_CONN_STRING);

    client.connect()
        .then(() => {
            const db = client.db(DB_NAME);
            const collection = db.collection('restaurants');
            collection.find({}, { cuisine: 1 }).toArray()
                .then(results => {
                    const typeHolder = [];
                    results.forEach(restaurant => {
                        const { cuisine } = restaurant;
                        if(typeHolder.indexOf(cuisine) === -1){
                            typeHolder.push(cuisine);
                        }
                    });
                    const cuisineTypes = typeHolder.map(type => {
                        return { cuisine_type: type };
                    });
                    const cuisineCollection = db.collection('cuisine-types');
                    cuisineCollection.insertMany(cuisineTypes)
                        .then(result => {
                            console.log(`Cuisine collection insert succeeded`);
                            client.close();
                        })
                        .catch(err => {
                            client.close();
                            throw err;
                        })
                });
        })
        .catch(err => {
            client.close();
            throw err;
        });
};

module.exports = insertCuisineType;