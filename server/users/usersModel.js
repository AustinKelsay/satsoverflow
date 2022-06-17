const db = require('../database/db-config');

module.exports = {
    findByPubkey,
    findById,
    addUser
}

function findByPubkey(pubkey) {
    return db("users").where({ pubkey }).first();
  }

function findById(id) {
    return db("users").where({ id }).first();
  }

function addUser(user) {
    return db("users").insert(user, "id")
}