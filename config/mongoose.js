const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb+srv://aditya26:psCQAJrfVi1f8c4D@stock-talks-cluster.e36bl.mongodb.net/${env.db}?retryWrites=true&w=majority&wtimeout=1000/`);

//psCQAJrfVi1f8c4D

 //mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to mongodb"));

db.once('open',function () {
   console.log("Connected to Database!"); 
});


module.exports = db;