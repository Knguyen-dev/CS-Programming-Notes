const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("Error connecting to mongodb: ", err));