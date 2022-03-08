const express = require('express');

const router = express.Router();

// User Route
router.get('/', (req, res, next) =>{
    res.send('Thina ba shiyekayo..');
});

// router.get('/:id', (req, res, next) =>{
//     res.send('');
// });

// router.post('/:id', (req, res, next) =>{
//     res.send('');
// });

// router.put('/:id', (req, res, next) =>{
//     res.send('');
// });

// router.patch('/:id', (req, res, next) => {
//     res.send('');
// });

// router.delete('/:id', (req, res, next) =>{
//     res.send('');
// });

module.exports = router;