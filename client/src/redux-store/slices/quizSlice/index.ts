import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  QuizUserAnswer,
  QuizResults,
  QuizQuestion,
  QuizCategory
} from '@/types'

type QuizState = {
  categories: QuizCategory[] | null
  userAnswers: QuizUserAnswer[] | null
  isAudio: boolean

  quiz: QuizQuestion[] | null
  results: QuizResults | null
}

const initialState: QuizState = {
  categories: null,
  quiz: null,
  userAnswers: null,
  results: null,
  isAudio: false
}

/* ========================================================================
                                quizSlice          
======================================================================== */
// Rather than having quizThunks, quizSlice works in conjunction with queries
// and mutations in the RTK Query API.

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,

  reducers: {
    setCategories: (state, action: PayloadAction<QuizCategory[]>) => {
      state.categories = action.payload
    },

    setQuiz: (state, action: PayloadAction<QuizQuestion[]>) => {
      state.quiz = action.payload
    },

    setUserAnswers: (state, action: PayloadAction<QuizUserAnswer[]>) => {
      state.userAnswers = action.payload
    },

    setResults: (state, action: PayloadAction<QuizResults>) => {
      state.results = action.payload
    },

    resetQuiz: (state) => {
      state.quiz = null
      state.userAnswers = null
      state.results = null
    },

    toggleIsAudio: (state) => {
      state.isAudio = !state.isAudio
    }
  },

  extraReducers: (_builder) => {}
})

export const quizActions = quizSlice.actions
export const quizReducer = quizSlice.reducer
export const quizThunks = {}
