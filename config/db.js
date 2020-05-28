const mongoose = require('mongoose');
const config= require('config');
const dB= config.get('mongoURI');

const connectDB = async ()=> {
    try{
        await mongoose.connect(dB, {
            useNewUrlParser:true
        });
        console.log('Connect to Mongoose DB');
    }
    catch(err)
    {
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;