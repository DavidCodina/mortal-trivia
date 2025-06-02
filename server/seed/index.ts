import * as dotenv from 'dotenv'
import mongoose from 'mongoose'

import Category from '../src/models/categoryModel'
import Question from '../src/models/questionModel'
import { get_categories } from './get_categories'
import { get_questions } from './get_questions'

dotenv.config()

/* ========================================================================

======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// To run this script do: npx tsx ./seed
// There is also a seed script in package.json: npm run seed
// In yarn I think it's yarn run tsx ./seed
// If you're using Yarn 2+, then this might also work: yarn dlx tsx ./seed
//
// ⚠️ Note: If you want limit to the number of seeded categories, the
// get_categories() function can also take in a limit arg:  get_categories(10).
//
///////////////////////////////////////////////////////////////////////////

const seed = async () => {
  const MONGO_URI = process.env.MONGO_URI

  if (typeof MONGO_URI !== 'string') {
    throw new Error('MONGO_URI environment variable is not set.')
  }

  try {
    /* ======================
      Step 1: Connect to DB
    ====================== */

    const conn = await mongoose.connect(MONGO_URI, {})
    console.log(`\nMongoDB Connected to ${conn.connection.host}`)

    /* ======================
    Step 2: Fetch trivia_categories
    ====================== */

    let trivia_categories = await get_categories() // Optional limit arg: get_categories(10)

    if (!Array.isArray(trivia_categories) || trivia_categories.length === 0) {
      throw new Error(
        `Unable to get categories from 'https://opentdb.com/api_category.php'.`
      )
    }

    /* ======================
    Step 3: Fetch & seed trivia_questions
    ====================== */

    const { successResults, failedResults } =
      await get_questions(trivia_categories)
    const trivia_questions = successResults.flatMap(
      (result) => result.questions
    )

    await Question.deleteMany({})

    const insertedQuestions = await Question.insertMany(trivia_questions)
    console.log('\nTotal inserted questions:', insertedQuestions.length)

    /* ======================
    Step 4: Prune trivia_categories
    ====================== */
    ///////////////////////////////////////////////////////////////////////////
    //
    // ⚠️ Gotcha: https://opentdb.com/api GET requests for questions
    //
    // If the API has 50 results and you request 100, it gives you back 50.
    // That is the expected behavior: "A Maximum of 50 Questions can be retrieved per call."
    // However, if it only has 32 results and you request 50, it responds with an error:
    //
    //   https://opentdb.com/api.php?amount=33&type=multiple&category=13
    //   { "response_code": 1, "results": [] }
    //
    // In order to mitigate cases where we have a category but no questions, we can
    // prune the initial trivia_categories prior to seeding the database.
    //
    ///////////////////////////////////////////////////////////////////////////

    if (failedResults.length > 0) {
      // Get the category names that failed
      const names_of_categories_that_failed_to_get_questions =
        failedResults.map((result) => result.category?.name)

      console.log(
        '\nThe following categories will be pruned from the seed data because the questions could not be fetched:\n',
        names_of_categories_that_failed_to_get_questions
      )

      // For each element in names_of_categories_that_failed_to_get_questions
      // Remove that element from trivia_categories.
      trivia_categories = trivia_categories.filter(
        (category) =>
          !names_of_categories_that_failed_to_get_questions.includes(
            category.name
          )
      )
    }

    /* ======================
    Step 5: Seed categories
    ====================== */

    await Category.deleteMany({})

    // Each trivia_category has its own `id`. However, the Mongoose
    // categorySchema will ignore that and generate its own `_id` field.
    const insertedCategories = await Category.insertMany(trivia_categories)
    console.log('\nTotal inserted categories:', insertedCategories.length)

    /* ======================
    Step 6: Log success, disconnect, exit.
    ====================== */

    console.log('\nSeeding complete!!!\n')

    // mongoose.disconnect() is idempotent.
    // It won't throw an error if already disconnected.
    await mongoose.disconnect()
    process.exit(0)
  } catch (err: any) {
    console.log(
      '\nAn error occurred while attempting to seed the database.',
      err
    )
    await mongoose.disconnect()
    process.exit(1)
  }
}

seed()
