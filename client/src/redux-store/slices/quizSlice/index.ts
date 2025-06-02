import {
  createSlice,
  PayloadAction
  // createAsyncThunk,
  // createAction,
  // createReducer
} from '@reduxjs/toolkit'
import { getQuizCategories } from './getQuizCategories'
import { getQuiz } from './getQuiz'
import { getQuizResults } from './getQuizResults'
import {
  QuizCategory,
  QuizQuestion,
  QuizUserAnswer,
  QuizResults
} from '@/types'

type QuizState = {
  categories: QuizCategory[] | null
  categoriesPending: boolean
  categoriesError: string
  quiz: QuizQuestion[] | null
  quizPending: boolean
  quizError: string
  userAnswers: QuizUserAnswer[] | null
  results: QuizResults | null
  resultsPending: boolean
  resultsError: string
  isAudio: boolean
}

const initialState: QuizState = {
  categories: null,
  categoriesPending: false,
  categoriesError: '',
  quiz: null,
  quizPending: false,
  quizError: '',
  userAnswers: null,
  results: null,
  resultsPending: false,
  resultsError: '',
  isAudio: false
}

/* ========================================================================
                                quizSlice          
======================================================================== */
// Normally, I would handle data fetching without using a Redux thunk.
// Then once the data was fetched, I would dispatch an action to update the store.
// Moreover, even if I was using a thunk I'd handle error and loading states locally.
//
// However, for this demo I've done it all in Redux. This strategy could make sense
// if you want to reduce bloat on the consuming side. It also makes sense if you have
// a large application that uses the thunk in many different places and you want to ensure
// a consistent and predictable error/loading/data pattern across all use cases.

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,

  reducers: {
    setUserAnswers: (state, action: PayloadAction<QuizUserAnswer[]>) => {
      state.userAnswers = action.payload
    },

    // resetUserAnswers: (state) => { state.userAnswers = null  },

    resetQuiz: (state) => {
      state.quizError = ''
      state.quizPending = false
      state.quiz = null
      state.userAnswers = null
      state.results = null
      state.resultsPending = false
      state.resultsError = ''
    },

    toggleIsAudio: (state) => {
      state.isAudio = !state.isAudio
    }
  },

  extraReducers: (builder) => {
    builder
      /* ======================
        getQuizCategories()
      ====================== */

      .addCase(getQuizCategories.pending, (state, _action) => {
        state.categoriesPending = true
        state.categoriesError = ''
      })
      .addCase(getQuizCategories.fulfilled, (state, action) => {
        const { data, success, message } = action.payload

        if (success === false && message) {
          state.categories = null
          // We could use the action.payload.message directly here, or use
          // action.payload?.code to create a message conditionally.
          state.categoriesError = 'Unable to get quiz categories.'
        } else if (success === true && data) {
          state.categories = data
        }
        state.categoriesPending = false
      })

      /* ======================
              getQuiz()
      ====================== */

      .addCase(getQuiz.pending, (state, _action) => {
        state.userAnswers = null // If we're getting a new quiz, then reset userAnswers to null.
        state.quizPending = true
        state.quizError = ''
      })

      .addCase(getQuiz.fulfilled, (state, action) => {
        const { code, data, success, message } = action.payload

        if (success === false && message) {
          state.quiz = null

          if (code === 'INSUFFICIENT_QUESTIONS') {
            state.quizError = message
          } else {
            state.quizError = 'Unable to get quiz.'
          }
        } else if (success === true && data) {
          state.quiz = data
        }
        state.quizPending = false
      })

      /* ======================
          getQuizResults()
      ====================== */

      .addCase(getQuizResults.pending, (state, _action) => {
        state.resultsPending = true
        state.resultsError = ''
      })

      .addCase(getQuizResults.fulfilled, (state, action) => {
        const { data, success, message } = action.payload

        if (success === false && message) {
          state.results = null
          state.resultsError = 'Unable to get quiz results.'
        } else if (success === true && data) {
          state.results = data
        }
        state.resultsPending = false
      })
  }
})

export const quizActions = quizSlice.actions
export const quizReducer = quizSlice.reducer
export const quizThunks = {
  getQuizCategories,
  getQuiz,
  getQuizResults
}
