import db from "../../database/db-config";

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

function findById(id: Number) {
  return db("answers").where({ id }).first();
}

async function addAnswer(question: any) {
    return db("answers").insert(question, "id")
}

function updateAnswer(id: Number, changes: any) {
    return db('answers')
      .where({ id })
      .update(changes, '*');
  }

function removeAnswer(id: Number) { 
    return db('answers')
    .where('id', Number(id))
    .del();
}