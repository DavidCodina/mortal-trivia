import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'

import Question from 'models/questionModel'
import { handleServerError, round2 } from 'utils'
import { ResBody } from 'types'

/** A user answer to a particular question. */
type QuizUserAnswer = {
  question_id: string
  user_answer: string
}

/** The result for an individual question. */
type QuizQuestionResult = {
  question_id: mongoose.Types.ObjectId
  question: string
  user_answer: string
  correct_answer: string
  is_correct: boolean
}

type QuizResults = {
  results: QuizQuestionResult[]
  correct_answers: number
  incorrect_answers: number
  total_questions: number
  percentage: number
}

// This typeguard helps with validation and type awareness.
// However, a better approach would be to use Zod.
const isUserAnswerArray = (value: unknown): value is QuizUserAnswer[] => {
  if (!Array.isArray(value)) {
    return false
  }

  return value.every((item): item is QuizUserAnswer => {
    if (typeof item !== 'object' || item === null) {
      return false
    }

    const hasQuestionId =
      'question_id' in item && typeof item.question_id === 'string'
    const hasUserAnswer =
      'user_answer' in item && typeof item.user_answer === 'string'

    return hasQuestionId && hasUserAnswer
  })
}

/* ========================================================================

======================================================================== */

export const getQuizScore = async (
  req: Request,
  res: Response<ResBody<QuizResults | null>>,
  _next: NextFunction
) => {
  ///////////////////////////////////////////////////////////////////////////
  //
  // Example user_answers:
  //
  //   [
  //     { "question_id": "683a02a1a5e2d0a621fa9c53", "user_answer": "A Case of Identity" }, // Incorrect
  //     { "question_id": "683a02a2a5e2d0a621fa9c72", "user_answer": "Roald Dahl" },         // Incorrect
  //     { "question_id": "683a02a2a5e2d0a621fa9c70", "user_answer": "Earth Alliance" },     // Incorrect
  //     { "question_id": "683a02a1a5e2d0a621fa9c57", "user_answer": "Falcon" },             // Correct
  //     { "question_id": "683a02a1a5e2d0a621fa9c55", "user_answer": "Fluffy" }              // Correct
  //   ]
  //
  // Expected score: 2/5.
  //
  ///////////////////////////////////////////////////////////////////////////
  const { user_answers } = req.body

  if (!isUserAnswerArray(user_answers)) {
    return res.status(400).json({
      code: 'BAD_REQUEST',
      data: null,
      message: 'The request must contain an array of `user_answers`.',
      success: false
    })
  }

  const user_answer_ids = user_answers.map((answer) => answer.question_id)

  try {
    const quiz_questions = await Question.find({
      _id: { $in: user_answer_ids }
    })

    if (quiz_questions.length !== user_answers.length) {
      return res.status(404).json({
        code: 'NOT_FOUND',
        data: null,
        message:
          'Unable to score the quiz. One or more questions could not be found for the associated `user_answers`.',
        success: false
      })
    }

    /* ======================
    Derive results, correct_answers, incorrect_answers, percentage
    ====================== */

    // Derive the more verbose results array.
    const results: QuizQuestionResult[] = user_answers
      .map(({ question_id, user_answer }) => {
        const question = quiz_questions.find((q) => q._id.equals(question_id))

        // This is primarily for Typescript's benefit.
        if (!question) {
          return
        }

        return {
          question_id: question._id,
          question: question.question,
          user_answer: user_answer,
          // The instructions indicate that, "The user should never be able to know the correct answer by using dev tools".
          // Presumably, that only pertains to the pre-scoring phase.
          correct_answer: question.correct_answer,
          is_correct: question.correct_answer === user_answer ? true : false
        }
      })
      .filter((x) => x !== undefined)

    const correct_answers = results.reduce((acc, result) => {
      if (result.is_correct) {
        return acc + 1
      }
      return acc
    }, 0)

    const incorrect_answers = quiz_questions.length - correct_answers

    const total_questions = quiz_questions.length

    const percentage = round2(correct_answers / total_questions) * 100

    return res.status(200).json({
      code: 'OK',
      data: {
        results,
        correct_answers,
        incorrect_answers,
        total_questions,
        percentage: percentage
      },
      message: 'Success.',
      success: true
    })
  } catch (err) {
    return handleServerError(res, err)
  }
}
