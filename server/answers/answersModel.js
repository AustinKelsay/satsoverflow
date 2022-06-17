const db = require('../database/db-config');

module.exports = {
  addAnswer,
  findAnswers,
  findById,
  updateAnswer,
  removeAnswer
};

function findAnswers() {
  return db("answers");
}

function findById(id) {
  return db("answers").where({ id }).first();
}

async function addAnswer(question) {
    return db("answers").insert(question, "id")
}

function updateAnswer(id, changes) {
    return db('answers')
      .where({ id })
      .update(changes, '*');
  }

function removeAnswer(id) { 
    return db('answers')
    .where('id', Number(id))
    .del();
}