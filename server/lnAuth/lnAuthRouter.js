const express = require('express');
const lnAuth = require('./lnAuthModel.js');
const router = express.Router();

router.get('/:k1', (req, res) => {
    const { k1 } = req.params;
    lnAuth.findByK1(k1)
        .then((lnAuth) => {
            if (lnAuth) {
                res.status(200).json(lnAuth);
            } else {
                res.status(404).json({ message: 'lnAuth not found' });
            }
        })
        .catch((error) => {
            res.status(500).json({ errorMessage: 'Error finding lnAuth' });
        });
})

router.post('/', (req, res) => {
    const lnAuth = req.body;
    if (lnAuth.k1 && lnAuth.pubkey) {
        lnAuth.addLnAuth(lnAuth)
            .then((lnAuth) => {
                res.status(201).json(lnAuth);
            })
            .catch((error) => {
                res.status(500).json({ errorMessage: 'Error adding lnAuth' });
            });
    } else {
        res.status(400).json({ message: 'Missing required fields' });
    }
})


router.delete('/:k1', (req, res) => {
    const { k1 } = req.params;
    lnAuth.removeLnAuth(k1)
        .then((lnAuth) => {
            if (!lnAuth) {
                res.status(404).json({
                    message: "The lnAuth with the specified k1 does not exist.",
                });
            } else {
                res.status(200).json(lnAuth);
            }
        })
})