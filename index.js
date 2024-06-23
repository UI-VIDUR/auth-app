const express = require("express");
const connectDB = require("./connection");
const PORT = 3001;
const app = express();
const userAuth = require("./routes/auth");


/** Db connection */
connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1" , userAuth);


app.listen(PORT, () => `Server is running on ${PORT}`);