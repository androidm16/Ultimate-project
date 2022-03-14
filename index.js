require('dotenv/config');

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { userNewUrlParser: true }, () => 
    console.log('connected to DB!')
);

//Import Routes
const userRouter = require('./routes/users');
app.use('/users', userRouter)


app.use(express.json());


// User Route
app.get('/', (req, res, next) =>{
    res.send('<h1>Thina ba shiyekayo..</h1>');
});


app.set("port", process.env.PORT || 6969);
app.listen(app.get("port"), (server) => {
  console.info(`Server listen on port ${app.get("port")}`);
});