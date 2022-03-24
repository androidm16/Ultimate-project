require('dotenv/config');

const cors = require("cors");
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const User = require("./models/user");
const bodyParser = require('body-parser');

app.use(bodyParser.json());
// Connect to DB
// const DB_CONNECTION = async () => {
//   try {
//     await mongoose.connect(`mongodb://${6969}/${DB_CONNECTION}`, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       // useFindAndModify: false,
//       // useCreateIndex: true,
//     });
//     console.log('MongoDB Connected!');
//   } catch (err) {
//     console.log('Failed to connect to MongoDB', err)
//   }
// ;}

// DB_CONNECTION()
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));
app.use(cors());
    app.use(express.json());
//Import Routes
const userRouter = require('./routes/users');
app.use('/users', userRouter)
const productsRouter = require('./routes/products')
app.use('/products', productsRouter)

// User Route
app.get('/', (req, res, next) =>{
    res.send('<h1>Hey there Lectures, take a look at my project and bare with me. Alright, thank you in advance..</h1>');
});


app.set("port", process.env.PORT || 6969);
app.listen(app.get("port"), (server) => {
  console.info(`Server listen on port ${app.get("port")}`);
});