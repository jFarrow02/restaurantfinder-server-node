const DB_USER = process.env.RESTAURANTFINDER_DB_USER;
const DB_PASSWORD = process.env.RESTAURANTFINDER_DB_PASSWORD;
const DB_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@localhost:27017`;
const DB_NAME = process.env.RESTAURANTFINDER_DB_NAME;

module.exports = {
    DB_USER,
    DB_PASSWORD,
    DB_URI,
    DB_NAME,
};