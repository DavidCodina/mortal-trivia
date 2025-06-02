import { createAsyncThunk } from '@reduxjs/toolkit'
import { QuizCategory, ResBody } from '@/types'

type Arg = void
type QuizCategoriesData = QuizCategory[] | null

/* ========================================================================
                          
======================================================================== */

export const getQuizCategories = createAsyncThunk<
  ResBody<QuizCategoriesData>,
  Arg
>(
  'quiz/getQuizCategories',
  async (_arg, _thunkAPI) => {
    // If there's no try/catch, or if there is a catch and you rethrow, it will go to the
    // getCategories.rejected case. For this reason, some people don't use try/catch at all
    // for async thunks. However, here we are catching internally and return a standardized
    // response object. This return in the catch matches the pattern used by the Express
    // server for all responses.
    try {
      const res = await fetch('api/categories')
      const data = await res.json()
      return data as ResBody<QuizCategory[]>
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
