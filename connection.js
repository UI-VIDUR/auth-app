const mongoose = require("mongoose");


async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://testuser:test-123@mern-cluster.co5ulbw.mongodb.net/auth-system?retryWrites=true&w=majority&appName=mern-cluster");
        console.log('Db Connected!');
    }
    catch (err) {
        console.log(err.message)
        process.exit(1);
    }
}

module.exports = connectDB;