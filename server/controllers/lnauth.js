import lnauth from '../../client/pages/api/auth/lnurl/lnauth';
const lnAuth = require('../models/lnauth');
const jwtDecode = require('jwt-decode');
const { body, validationResult } = require('express-validator');

exports.createLnAuth = async (req, res) => {
  try {
    const { k1 } = req.body;

    const lnauthData = {
      k1: k1
    };

    const newLnAuth = new lnAuth(lnauthData);
    const savedLnAuth = await newLnAuth.save();

    if (savedLnAuth) {
      return res.json({
        message: 'lnAuth created!',
        savedLnAuth
      });
    } else {
      return res.status(400).json({
        message: 'There was a problem creating lnAuth.'
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: 'There was a problem creating lnAuth.'
    });
  }
};

exports.findLNByk1 = async (req, res, next) => {
  try {
    const lnauth = await lnAuth.findOne({ k1: req.params.k1 });
    res.json(lnauth);
  } catch (error) {
    next(error);
  }
};

exports.deleteLNByk1 = async (req, res, next) => {
  try {
    const lnauth = await lnAuth.remove({ k1: req.params.k1 });
    res.json(lnauth);
  } catch (error) {
    next(error);
  }
};
