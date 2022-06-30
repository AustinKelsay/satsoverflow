const User = require('../models/user');
const jwtDecode = require('jwt-decode');
const { body, validationResult } = require('express-validator');
const { createToken, hashPassword, verifyPassword } = require('../utils/authentication');

async function sign(req, res) {
  /* Validate the signature received from a signing device. 
   */
  const { key, ref, sig } = req.query;

  if (key && ref && sig && pending.has(ref)) {
    /* If all params are present, fetch reference msg. */
    const data = pending.get(ref)

    if (data.msg && verifySig(sig, data.msg, key)) {
      /* Verify that the reference message has been signed. */
      pending.set(ref, { key, ...data })
      return res.status(200).json({ 'status': 'ok' })
    }
  }
}

exports.signup = async (req, res) => {
  // const result = validationResult(req);
  // if (!result.isEmpty()) {
  //   const errors = result.array({ onlyFirstError: true });
  //   return res.status(422).json({ errors });
  // }

  if (req.method !== 'POST') return res.status(405).end();

    const {username} = req.body
    const {session} = req

    if (!session?.user?.key || !username) {
        res.status(402).json({msg: "Missing either key or username"})
    }

    const userData = {
      username: username.toLowerCase(),
      key: session?.user?.key
    };

    const existingUsername = await User.findOne({
      username: userData.username
    });

    if (existingUsername) {
      return res.status(400).json({
        message: 'Username already exists.'
      });
    }

    const newUser = new User(userData);
    const savedUser = await newUser.save();

    if (savedUser) {
      // const token = createToken(savedUser);
      // const decodedToken = jwtDecode(token);
      // const expiresAt = decodedToken.exp;

      const { username, role, id, created, profilePhoto } = savedUser;
      const userInfo = {
        username,
        role,
        id,
        created,
        profilePhoto
      };

      return res.json({
        message: 'User created!',
        // token,
        userInfo,
        // expiresAt
      });
    } else {
      return res.status(400).json({
        message: 'There was a problem creating your account.'
      });
    }
};

exports.authenticate = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      username: username.toLowerCase()
    });

    if (!user) {
      return res.status(403).json({
        message: 'Wrong username or password.'
      });
    }

    const passwordValid = await verifyPassword(password, user.password);

    if (passwordValid) {
      const token = createToken(user);
      const decodedToken = jwtDecode(token);
      const expiresAt = decodedToken.exp;
      const { username, role, id, created, profilePhoto } = user;
      const userInfo = { username, role, id, created, profilePhoto };

      res.json({
        message: 'Authentication successful!',
        token,
        userInfo,
        expiresAt
      });
    } else {
      res.status(403).json({
        message: 'Wrong username or password.'
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: 'Something went wrong.'
    });
  }
};

exports.listUsers = async (req, res, next) => {
  try {
    const { sortType = '-created' } = req.body;
    const users = await User.find().sort(sortType);
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.search = async (req, res, next) => {
  try {
    const users = await User.find({ username: { $regex: req.params.search, $options: 'i' } });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.find = async (req, res, next) => {
  try {
    const users = await User.findOne({ username: req.params.username });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.findByID = async (req, res, next) => {
  try {
    const users = await User.findOne({ _id: req.params.id });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.findByPub = async (req, res, next) => {
  try {
    const users = await User.findOne({ pubkey: req.params.pubkey });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.validateUser = [
  body('username')
    .exists()
    .trim()
    .withMessage('is required')

    .notEmpty()
    .withMessage('cannot be blank')

    .isLength({ max: 16 })
    .withMessage('must be at most 16 characters long')

    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('contains invalid characters'),

  body('password')
    .exists()
    .trim()
    .withMessage('is required')

    .notEmpty()
    .withMessage('cannot be blank')

    .isLength({ min: 6 })
    .withMessage('must be at least 6 characters long')

    .isLength({ max: 50 })
    .withMessage('must be at most 50 characters long')
];
