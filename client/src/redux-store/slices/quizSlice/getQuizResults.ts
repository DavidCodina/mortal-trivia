import { createAsyncThunk } from '@reduxjs/toolkit'
import { QuizUserAnswer, ResBody, QuizResults } from '@/types'

type Arg = QuizUserAnswer[]
type QuizResultsData = QuizResults | null

/* ========================================================================
                          
======================================================================== */

export const getQuizResults = createAsyncThunk<ResBody<QuizResultsData>, Arg>(
  'quiz/getQuizResults',

  async (arg, _thunkAPI) => {
    try {
      const res = await fetch(`/api/quiz/score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_answers: arg })
      })
      const data = await res.json()
      return data as ResBody<QuizResultsData>
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
