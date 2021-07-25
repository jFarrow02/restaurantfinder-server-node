const { MongoClient } = require('mongodb');
const { STATUS_CODES } = require('../../config/constants/http');
// const RestaurantInterface = require('../../models/Restaurant');
const DB_USER = process.env.RESTAURANTFINDER_DB_USER;
const DB_PASSWORD = process.env.RESTAURANTFINDER_DB_PASSWORD;
const DB_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@localhost:27017`;
const DB_NAME = process.env.RESTAURANTFINDER_DB_NAME;
const COLLECTION_NAME = 'restaurants';

const { OK, SERVER_ERR } = STATUS_CODES;
const RestaurantService = {

    getAllRestaurants() {
        const client = new MongoClient(DB_URI, { useUnifiedTopology: true });
        let result = client.connect()
            .then(async () => {
                const db = client.db(DB_NAME);
                const collection = db.collection(COLLECTION_NAME);

                try{
                    // Fetch all restaurants
                    let restaurants = await collection.find({}).project({ _id: 0 }).toArray();
                    client.close();
                    return { status: OK, data: restaurants.filter(restaurant => restaurant.name.length > 0) };
                } catch(err) {
                    return { status: SERVER_ERR, err: err.message };
                }
                
            })
            .catch((err) => {
                client.close();
                return { status: SERVER_ERR, err: err.message };
            });
        return result;
    },

    getRestaurantsByBorough(boroughName){
        const client = new MongoClient(DB_URI, { useUnifiedTopology: true });
        let result = client.connect()
            .then(async () => {
                const db = client.db(DB_NAME);
                const collection = db.collection(COLLECTION_NAME);

                try {
                     // Fetch all restaurants for borough name
                    let restaurants = await collection.find({ borough: boroughName}).project({ _id: 0 }).toArray();
                    client.close();
                    return { status: OK, data: restaurants.filter(restaurant => restaurant.name.length > 0) };
                } catch(err) {
                    return { status: SERVER_ERR, err: err.message };
                }
               
            })
            .catch((err) => {
                client.close();
                return { status: SERVER_ERR, err: err.message };
            });
            return result;
    },

    getRestaurantByName(name) {
        const client = new MongoClient(DB_URI, { useUnifiedTopology: true });
        let result = client.connect()
            .then(async () => {
                const db = client.db(DB_NAME);
                const collection = db.collection(COLLECTION_NAME);

                try {
                    // Fetch restaurants by name
                    let restaurant = await collection.findOne({ name: name}, { projection: { _id: 0 } });
                    client.close();
                    return { status: OK, data: [ restaurant ] };
                } catch(err){
                    return { status: SERVER_ERR, err: err.message };
                }
                
            })
            .catch((err) => {
                client.close();
                return { status: SERVER_ERR, err: err.message };
            });
            return result;
    },

    getRestaurantsByCuisineType(cuisineType) {
        const client = new MongoClient(DB_URI, { useUnifiedTopology: true });
        let result = client.connect()
            .then(async () => {
                const db = client.db(DB_NAME);
                const collection = db.collection(COLLECTION_NAME);

                try {
                    // Fetch all restaurants for borough name
                    let restaurants = await collection.find({ cuisine: cuisineType}).project({ _id: 0 }).toArray();
                    client.close();
                    return { status: OK, data: restaurants.filter(restaurant => restaurant.name.length > 0)}
                } catch(err) {
                    client.close();
                    return { status: SERVER_ERR, err: err.message };
                }
            })
            .catch((err) => {
                client.close();
                return { status: SERVER_ERR, err: err.message };
            });
            return result;
    },

    async getRestaurantsByAverageGrade(gradeParam) {
        const client = new MongoClient(DB_URI, { useUnifiedTopology: true });
        let restaurantsByGrade = [];
        let avgLetterGrades = [];
        let result = client.connect()
            .then( async () => {
                const db = client.db(DB_NAME);
                const collection = db.collection(COLLECTION_NAME);

                try {
                    let restaurants = await collection.find({}).toArray();

                    restaurants.forEach((d) => {
                        let totalPoints = 0;
                        let count = 0;
                        let grades = [ ...d.grades ];
                        grades.forEach((grade) => {
                            switch(grade.grade){
                                case 'A':
                                    totalPoints+= 100;
                                    count+= 1;
                                    break;
                                case 'B':
                                    totalPoints+= 90;
                                    count+= 1;
                                    break;
                                case 'C':
                                    totalPoints+= 80;
                                    count+= 1;
                                    break;
                                case 'D':
                                    totalPoints+= 70;
                                    count+= 1;
                                    break;
                                case 'Not Yet Graded':
                                    break;
                                default:
                                    totalPoints+= 60;
                                    count+= 1;
                            }
                        });
                        restaurantsByGrade.push({ ...d, avgGrade: totalPoints/count});
                    });

                    restaurantsByGrade.forEach((r) => {
                        let avgLetterGrade;
                        let avgGrade = r.avgGrade

                        if(avgGrade >= 90) {
                            avgLetterGrade = 'A'
                        }
                        else if(avgGrade >= 80) {
                            avgLetterGrade = 'B'
                        }
                        else if(avgGrade >= 70) {
                            avgLetterGrade = 'C'
                        }
                        else if(avgGrade >= 60) {
                            avgLetterGrade = 'D'
                        }
                        else {
                            avgLetterGrade = 'F'
                        }
                        r.avgGrade = avgLetterGrade;
                        avgLetterGrades.push(r);
                    });

                    avgLetterGrades = avgLetterGrades.filter((restaurant) => restaurant.avgGrade === gradeParam);
                    client.close();
                    return { status: OK, data: avgLetterGrades};
                } catch(err) {
                    return { status: SERVER_ERR, err: err.message };
                }
                
            }) // end .then()
            .catch(err => {
                client.close();
                return { status: SERVER_ERR, err: err.message };
            });
        return result;
    }
};

module.exports = RestaurantService;