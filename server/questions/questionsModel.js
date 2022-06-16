const db = require('../database/db-config');

module.exports = {
  addQuestion,
  findQuestions,
  findById,
  updateQuestion,
  removeQuestion
};

function findQuestions() {
  return db("questions");
}

function findById(id) {
  return db("questions").where({ id }).first();
}

async function addQuestion(question) {
    return db("questions").insert(question, "id")
}

function updateQuestion(id, changes) {
    return db('questions')
      .where({ id })
      .update(changes, '*');
  }

function removeQuestion(id) { 
    return db('questions')
    .where('id', Number(id))
    .del();
}