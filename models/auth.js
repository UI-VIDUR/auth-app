const mongoose = require("mongoose");
const { Schema , model } = mongoose;


const authSchema = new Schema({
    fullname : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const authModel = model('authuser', authSchema );

module.exports = authModel;