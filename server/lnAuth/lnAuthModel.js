const db = require('../database/db-config');

module.exports = {
    findByK1,
}

function findByK1(k1) {
    return db("lnAuth").where({ k1 }).first();
}

function addLnAuth(lnAuth) {
    return db("lnAuth").insert(lnAuth, "id")
}

function removeLnAuth(k1) {
    return db('lnAuth')
    .where('k1', Number(k1))
    .del();
}