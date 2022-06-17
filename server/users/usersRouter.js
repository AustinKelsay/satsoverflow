const express = require('express');
const Users = require('./usersModel');
const router = express.Router();

router.get('/:pubkey', (req, res) => {
    const { pubkey } = req.params;
    Users.findByPubkey(pubkey)
        .then((user) => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        })
        .catch((error) => {
            res.status(500).json({ errorMessage: 'Error finding user' });
        });
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Users.findById(id)
        .then((user) => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        })
        .catch((error) => {
            res.status(500).json({ errorMessage: 'Error finding user' });
        });
})

router.post('/', (req, res) => {
    const user = req.body;
    Users.addUser(user)
        .then((user) => {
            res.status(201).json(user);
        })
        .catch((error) => {
            res.status(500).json({ errorMessage: 'Error adding user', error });
        });
})