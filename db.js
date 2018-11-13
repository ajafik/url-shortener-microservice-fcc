const mongoose = require('mongoose');
require("dotenv").config();
const db = mongoose.connection;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
db.on('connected', () => console.log('db connected successfully'));
db.on('error', () => console.log('Ooops! something went wrong with db connection'));


module.exports = db;