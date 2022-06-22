const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lnauthModel = new Schema({
  k1: { type: String, unique: true },
  pubkey: { type: String },
  created: { type: Date, default: Date.now }
});

userModel.set('toJSON', { getters: true });
userModel.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('lnauth', lnauthModel);
