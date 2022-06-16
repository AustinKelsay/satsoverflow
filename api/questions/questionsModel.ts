import db from "../../database/db-config";

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

function findById(id: Number) {
  return db("questions").where({ id }).first();
}

async function addQuestion(question: any) {
    return db("questions").insert(question, "id")
}

function updateQuestion(id: Number, changes: any) {
    return db('questions')
      .where({ id })
      .update(changes, '*');
  }

function removeQuestion(id: Number) { 
    return db('questions')
    .where('id', Number(id))
    .del();
}