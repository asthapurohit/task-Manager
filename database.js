const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;
const DATABASE_NAME = process.env.DATABASE_NAME;

mongoose.connect(MONGO_URL, {
    dbName: DATABASE_NAME
}).then(
    () => {
    console.log('Connected with the Database ;)');
    }
).catch((err) => {
    console.log('Error in connecting to Database:(' + err);
});