import { createAsyncThunk } from '@reduxjs/toolkit'
import { QuizQuestion, ResBody } from '@/types'

type Arg = {
  amount: string
  category: string
  difficulty: string
}
type QuizData = QuizQuestion[] | null

/* ========================================================================
                          
======================================================================== */

export const getQuiz = createAsyncThunk<ResBody<QuizData>, Arg>(
  'quiz/getQuiz',
  // https://redux-toolkit.js.org/api/createAsyncThunk#payloadcreator
  // arg: a single value, containing the first parameter that was passed to the thunk action creator when
  // it was dispatched. This is useful for passing in values like item IDs that may be needed as part of
  // the request. If you need to pass in multiple values, pass them together in an object.
  async (arg, _thunkAPI) => {
    const params = Object.entries({
      amount:
        typeof arg.amount === 'string' && !isNaN(Number(arg.amount))
          ? arg.amount
          : '',
      category: typeof arg.category === 'string' ? arg.category : '',
      difficulty: typeof arg.difficulty === 'string' ? arg.difficulty : ''
    })
      // Remove empty values
      .filter(([_, value]) => value)
      // Convert filtered array of key/value pairs back to object.
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

    const queryString = new URLSearchParams(params).toString()

    try {
      const res = await fetch(`/api/quiz?${queryString}`)
      const data = await res.json()
      return data as ResBody<QuizQuestion[]>
    } catch (_err) {
      return {
        code: 'INTERNAL_SERVER_ERROR',
        data: null,
        message: 'Server Error.',
        success: false
      }
    }
  },
  {}
)
