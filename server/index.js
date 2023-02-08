const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogroute');
const userRoutes = require('./routes/userroute');
const authRoutes = require('./routes/authroute');
const uploadRoutes = require('./routes/uploadroute');
const cors = require("cors");

  
// const express = require ('express')
const app = express();
dotenv.config() // reach our data

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true


}).then(() => {
    console.log('DB connected')
}).catch(err => console.log(err))

// middlewares
app.use(cors());
app.use(express.json());
app.use("/api/", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/images/",uploadRoutes)
// app.use("/api/users",userRoutes);


app.listen(8800, () => {

    console.log("Connected to backend. ")

})
