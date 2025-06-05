// import { createSelector } from '@reduxjs/toolkit'
import { api } from './api'

import { quizSlice } from '../slices'
import {
  QuizCategory,
  QuizQuestion,
  QuizUserAnswer,
  QuizResults,
  ResBody
} from '@/types'

type GetCategoriesArg = void
type GetCategoriesData = QuizCategory[] | null
type GetCategoriesResponse = ResBody<GetCategoriesData>

type GetQuizArg = {
  amount: string
  category: string
  difficulty: string
}
type GetQuizData = QuizQuestion[] | null
type GetQuizResponse = ResBody<GetQuizData>

type GetQuizResultsArg = QuizUserAnswer[]
type GetQuizResultsData = QuizResults | null
type GetQuizResultsResponse = ResBody<GetQuizResultsData>

/* ========================================================================

======================================================================== */

export const quizApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.mutation<GetCategoriesResponse, GetCategoriesArg>({
      query: () => {
        return {
          url: '/categories'
        }
      },

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          // Store the results directly in your quiz slice
          if (data.data !== null) {
            // console.log('setting categories in quizSlice...')
            dispatch(quizSlice.actions.setCategories(data.data))
          }
        } catch (_err) {
          // Handle error
        }
      }
    }),

    getQuiz: builder.mutation<GetQuizResponse, GetQuizArg>({
      query: (arg) => {
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

        return {
          url: `/quiz?${queryString}`
        }
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          // Store the results directly in your quiz slice
          if (data.data !== null) {
            // console.log('setting quiz in quizSlice...')
            dispatch(quizSlice.actions.setQuiz(data.data))
          }
        } catch (_err) {
          // Handle error
        }
      }
    }),

    // Initially, I tried to cache the results by making this a builder.query.
    // However, that makes it very difficult to access the cache again, because
    // you need the original arguments. This is more of a hybrid approach where
    // we have a mutator function but it also injects the result into the quizSlice.
    getQuizResults: builder.mutation<GetQuizResultsResponse, GetQuizResultsArg>(
      {
        query: (arg) => {
          return {
            url: '/quiz/score',
            method: 'POST',
            body: { user_answers: arg }
          }
        },

        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled
            // Store the results directly in your quiz slice

            if (data.data !== null) {
              // console.log('setting results in quizSlice...')
              dispatch(quizSlice.actions.setResults(data.data))
            }
          } catch (_err) {
            // Handle error
          }
        }
      }
    )
  })
})

export const {
  useGetCategoriesMutation,
  useGetQuizMutation,
  useGetQuizResultsMutation
} = quizApi
