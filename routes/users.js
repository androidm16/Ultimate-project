const express = require('express');
const router = express.Router();
const user = require('../models/user');

// User Route
router.get('/', async (req, res, next) =>{
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

router.get('/:id', async (req, res, next) =>{
    res.send(req.params.id);
});

router.post('/', async (req, res, next) =>{
    const { name, email, password, contact } = req.body;
    
    const User = new user({
        name,
        email,
        contact,
        password,
    })
    try{
        const newUser = await User.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

router.put('/:id', async (req, res) =>{
    const { name, contact, password } = req.body;
    if (name) res.user.name = name;
    if (contact) res.user.contact = contact;
    if (password) res.user.password = password;
    try {
        const updateUser = await res.user.save();
        res.status(201).send(updateUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/:id', (req, res, next) => {
    res.send('');
});

router.delete('/:id', (req, res, next) =>{
    res.send('');
});

module.exports = router;