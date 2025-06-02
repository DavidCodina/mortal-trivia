import { Schema, model } from 'mongoose'
import { Question } from 'types'

/* ======================
      questionSchema
====================== */

const questionSchema = new Schema<Question>(
  {
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: true
    },
    category: {
      type: String,
      required: true
    },
    question: {
      type: String,
      required: true
    },
    correct_answer: {
      type: String,
      required: true
    },
    incorrect_answers: {
      type: [String],
      required: true
    }
  }
  // { timestamps: true}
)

export default model('Question', questionSchema)
