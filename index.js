const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
require('dotenv/config');

//Import Routes
const userRouter = require('./routes/users');
app.use('/users', userRouter)


app.use(express.json());

app.set('port', process.env.port || 3040) 

// User Route
app.get('/', (req, res, next) =>{
    res.send('<h1>Thina ba shiyekayo..</h1>');
});

// app.get('/:id', (req, res, next) =>{
//     res.send('');
// });

// app.post('/:id', (req, res, next) =>{
//     res.send('');
// });

// app.put('/:id', (req, res, next) =>{
//     res.send('');
// });

// app.patch('/:id', (req, res, next) => {
//     res.send('');
// });

// app.delete('/:id', (req, res, next) =>{
//     res.send('');
// });

// Product Route

//Sign up 

// Register email


// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { userNewUrlParser: true }, () => 
    console.log('connected to DB!')
);

app.listen(app.get('port'), server =>{
    console.info(`Server listen on port ${app.get('port')}`);
})