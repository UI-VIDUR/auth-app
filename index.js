const express = require("express");
const cors = require('cors');
const connectDB = require("./connection");
const PORT = 3001;
const app = express();
const userAuth = require("./routes/auth");

// Configure CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

/** Db connection */
connectDB();

// Apply CORS middleware
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1" , userAuth);


app.listen(PORT, () => `Server is running on ${PORT}`);