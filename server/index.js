const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);



const blogRoutes = require("./routes/blogroute");
const userRoutes = require("./routes/userroute");
const authRoutes = require("./routes/authroute");
const uploadRoutes = require("./routes/uploadroute");
const blockRoutes = require("./routes/blockroute");
const templateRoutes = require("./routes/templateroute");
const adminRoutes = require("./routes/adminroute")
const cors = require("cors");

// const express = require ('express')
const app = express();
dotenv.config(); // reach our data

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log(err));

// middlewares
app.use(cors());
app.use(express.json());
app.use("/api/", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/blocks", blockRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/images/", uploadRoutes);
app.use("/api/admin", adminRoutes)

//app.use("/api/users",userRoutes);

app.listen(8800, () => {
  console.log("Connected to backend. ");
});
