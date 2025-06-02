import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import { encode } from 'html-entities'

import Question from 'models/questionModel'
import { handleServerError } from 'utils'
import { ResBody, Question as QuestionType } from 'types'

/** A question derived from the Question type. A DerivedQuestion[] is
 * sent back to the client when a quiz is requested. This type conceals
 * the actual answer.
 */
export type DerivedQuestion = {
  _id: mongoose.Types.ObjectId
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  question: string
  answers: string[]
}

type Quiz = DerivedQuestion[]

/* ========================================================================

======================================================================== */

export const getQuiz = async (
  req: Request,
  res: Response<ResBody<Quiz | null>>,
  _next: NextFunction
) => {
  // Example: http://localhost:5000/api/quiz?amount=5&category=General+Knowledge&difficulty=easy
  const query = req.query

  const amount =
    typeof query.amount === 'string' && !isNaN(Number(query.amount))
      ? Number(query.amount)
      : 5

  const category =
    typeof query.category === 'string' ? query.category : 'General Knowledge'

  ///////////////////////////////////////////////////////////////////////////
  //
  // ⚠️ Gotcha: the original categories list from https://opentdb.com/api_category.php
  // does NOT encode the category names. However, if you query the API for a particular
  // category (e.g., "Science & Nature" / category=17):
  //
  //   https://opentdb.com/api.php?amount=50&category=17&type=multiple
  //
  // Then each question object in the results array WILL be encoded. For example:
  //
  //   { "category": "Science &amp; Nature", "question": "...", ... }
  //
  // Encoding might be a good idea for security and data integrity, but if you're
  // going to do it, then be consistent about it.
  //
  // They also neglect to establish a one-to-many relationship between categories and questions.
  // In any case, fidelity can be established here by encoding the category name
  // prior to querying the database. Alternatively, we could fix the issue in prior
  // to seeding our own database.
  //
  ///////////////////////////////////////////////////////////////////////////

  const encoded_category = encode(category)

  const difficulty =
    typeof query.difficulty === 'string' ? query.difficulty : 'easy'

  try {
    // ⚠️ Using $match & $sample here works better than a standard .find({}) query.
    // However, there's a gotcha: Mongoose's aggregate() method doesn't automatically
    // infer the return type from your schema. To fix this, you need to explicitly
    // type the return value. Why does this happen? Pipeline Flexibility: The aggregation
    // pipeline is extremely flexible and can transform data in countless ways. Each
    // stage ($match, $project, $group, etc.) can completely change the shape of your documents.
    // TypeScript's type inference system can't automatically determine what the final
    // shape of your documents will be after going through multiple pipeline stages.
    const questions = await Question.aggregate<QuestionType>([
      // $match filters documents to only include questions by category and difficulty.
      {
        $match: {
          category: encoded_category,
          difficulty: difficulty
        }
      },
      // $sample randomizes the results and also allows us to set the size (i.e., limit).
      {
        $sample: { size: amount }
      }
    ])

    if (!questions) {
      return res.status(404).json({
        code: 'NOT_FOUND',
        data: null,
        message: 'Resource not found.',
        success: false
      })
    }

    if (questions.length < amount) {
      return res.status(400).json({
        code: 'INSUFFICIENT_QUESTIONS',
        data: null,
        message: `Insufficient questions. An amount of ${amount} questions was requested, but only ${questions.length} were found.`,
        success: false
      })
    }

    // Create a derived dataset, replacing `correct_answer`
    // and `incorrect_answers` with an ambigious `answers` array.
    const derivedQuestions = questions.map((question) => {
      // Randomize the order of answers.
      const answers = [
        question.correct_answer,
        ...question.incorrect_answers
      ].sort(() => Math.random() - 0.5)

      return {
        _id: question._id,
        difficulty: question.difficulty,
        category: question.category,
        question: question.question,
        answers: answers
      }
    })

    // Note: .json() will serialize the _id values to strings.
    // Technically, it's handled by a Mongoose toJSON() function.
    return res.status(200).json({
      code: 'OK',
      data: derivedQuestions,
      message: 'Success.',
      success: true
    })
  } catch (err) {
    return handleServerError(res, err)
  }
}
