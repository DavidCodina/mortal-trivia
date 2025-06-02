// This is an example of a type that can be used as a client/server contract for API calls.

export type Code =
  | 'OK'
  | 'CREATED'
  | 'UPDATED'
  | 'DELETED'
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'INTERNAL_SERVER_ERROR'
  | 'INSUFFICIENT_QUESTIONS'

export type ResBody<DataType> = {
  code?: Code
  data: DataType
  message: string
  success: boolean
  errors?: Record<string, string> | null
  // Adding this makes the type more flexible, while still being informative. That
  // said, if you need additional properties, it's MUCH safer to write a custom type.
  // [key: string]: any
}

export type ResponsePromise<T = unknown> = Promise<ResBody<T>>

export type QuizCategory = {
  _id: string
  name: string
}

/** A question for the quiz. */
export type QuizQuestion = {
  _id: string
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  question: string
  answers: string[]
}

/** A user answer to a particular question */
export type QuizUserAnswer = {
  question_id: string
  user_answer: string
}

/** The result for an individual question. */
export type QuizQuestionResult = {
  question_id: string
  question: string
  user_answer: string
  correct_answer: string
  is_correct: boolean
}

export type QuizResults = {
  results: QuizQuestionResult[]
  correct_answers: number
  incorrect_answers: number
  total_questions: number
  percentage: number
}
