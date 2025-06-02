import mongoose from 'mongoose'

/** Codes to match various HTTP status codes and application specific cases. */
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

// This is used in each of the controllers to create a custom ResBody. For example:
// export const createOrder = async (req: Request, res: Response<ResBody<OrderType | null>>) => { ... }
export type ResBody<DataType> = {
  code: Code
  data: DataType
  message: string
  success: boolean
  errors?: Record<string, string> | null
  // Adding this makes the type more flexible, while still being informative. That
  // said, if you need additional properties, it's MUCH safer to write a custom type.
  // [key: string]: any
}

export type Question = {
  _id: mongoose.Types.ObjectId
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

// Used in getCategories.ts controller and in categoryModel.ts
export type Category = {
  _id: mongoose.Types.ObjectId
  name: string
}
