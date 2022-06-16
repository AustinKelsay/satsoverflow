exports.up = function(knex) {
    return knex.schema.createTable("users", (users) => {
        users.increments("id").primary();

        users
            .string('username', 128)
            .notNullable()
            .unique();

        users
            .timestamp('created_at')
            .defaultTo(knex.fn.now())

        users
            .string("description", 256)
    })
    .createTable('lnAuth', (lnAuth) => {
        lnAuth.increments();

        lnAuth
            .timestamp('created_at')
            .defaultTo(knex.fn.now())

        lnAuth
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')

        lnAuth
            .string('k1')
            .notNullable()

        lnAuth
            .string('pubkey')
            .unique()
            .notNullable()
    })
    .createTable("questions", (questions) => {
        questions.increments();

        questions
            .integer('user_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('users')
            .onUpdate("CASCADE")
            .onDelete("CASCADE");

        questions
            .string('user')
            .notNullable()
            .references('username')
            .inTable('users')
            .onUpdate("CASCADE")
            .onDelete("CASCADE");

        questions
            .string('title', 256)
            .notNullable()
            .unique()

        questions
            .string('description', 1024)
            .notNullable()

        questions
            .integer('bounty')
            .notNullable()
            .defaultTo(0)
        
        questions
            .boolean('answered')
            .defaultTo(false)
    })
    .createTable('answers', (answers) => {
        answers.increments();

        answers
            .integer('user_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('users')
            .onUpdate("CASCADE")
            .onDelete("CASCADE");

        answers
            .string('user')
            .notNullable()
            .references('username')
            .inTable('users')
            .onUpdate("CASCADE")
            .onDelete("CASCADE");

        answers
            .integer('question_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('questions')
            .onUpdate("CASCADE")
            .onDelete("CASCADE");

        answers
            .string('answer')
            .notNullable()
            .unique()
        
        answers
            .boolean('best_answer')
            .defaultTo(false)

        answers
            .integer('votes')
            .defaultTo(0)
    })
}


exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("answers")
        .dropTableIfExists("questions")
        .dropTableIfExists("lnAuth")
        .dropTableIfExists("users");
}

