// import { createSelector } from '@reduxjs/toolkit'
import { api } from './api'
import { RootState } from '@/redux-store'
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
    ///////////////////////////////////////////////////////////////////////////
    //
    // Previously, I was using mutations, then dipatching the result to state
    // in the quizSlice for all three functions. This solution worked, but it
    // didn't really feel idiomatic to RTKQ.
    //
    //   getCategories: builder.mutation<GetCategoriesResponse, GetCategoriesArg>({
    //     query: () => { return { url: '/categories' }},
    //     async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    //       try {
    //         const { data } = await queryFulfilled
    //         if (data.data !== null) { dispatch(quizSlice.actions.setCategories(data.data)) }
    //       } catch (_err) {}
    //     }
    //   }),
    //
    // The challenge with RTKQ is that any query that has args then gets cached with a query
    // key that uses those args. This makes retrieval slightly more complicated. However, there
    // are workarounds to achieve static cache keys, which I've now solved for...
    //
    ///////////////////////////////////////////////////////////////////////////
    getCategories: builder.query<GetCategoriesResponse, GetCategoriesArg>({
      query: () => {
        return {
          url: '/categories'
        }
      },
      providesTags: ['Categories'],
      keepUnusedDataFor: Infinity
    }),

    getQuiz: builder.query<GetQuizResponse, GetQuizArg>({
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
      providesTags: ['Quiz'],
      keepUnusedDataFor: Infinity,
      ///////////////////////////////////////////////////////////////////////////
      //
      // ⚠️ serializeQueryArgs: () => 'current-quiz' makes ALL quiz requests use the same cache key
      // regardless of different parameters (amount, category, difficulty). This allows us to select
      // the quiz without actually knowing the original arguments (i.e., normally the serialized args
      //  are used to contruct the cache key).
      //
      //   export const selectQuizData = (state: RootState) => quizApi.endpoints.getQuiz.select('current-quiz' as any)(state).data?.data
      //   const quiz = useTypedSelector(selectQuizData)
      //
      // The downside of serialized args for cache keys is that we have to always know what the args are.
      // That's why it's easier to just use a static cache key. On the other hand, a static key can
      // lead to cache results stacking up if we don't carefully manage cache invalidation and/or
      // the more aggressive (and effective) removeQueryResult() method. This is managed in a side-effect
      // within the quizSlice's quizListenerMiddleware.
      //
      ///////////////////////////////////////////////////////////////////////////
      serializeQueryArgs: () => 'current-quiz'
    }),

    getQuizResults: builder.query<GetQuizResultsResponse, GetQuizResultsArg>({
      query: (arg) => {
        return {
          url: '/quiz/score',
          method: 'POST',
          body: { user_answers: arg }
        }
      },

      providesTags: ['QuizResults'],
      serializeQueryArgs: () => 'current-results'
    })
  })
})

// createSelector is sometimes used in these kinds of selectors, but it's not necessary.
// In fact, it will likely diminish performance in simple use cases like this.
export const selectQuizData = (state: RootState) =>
  quizApi.endpoints.getQuiz.select('current-quiz' as any)(state).data?.data

export const selectQuizResultsData = (state: RootState) =>
  quizApi.endpoints.getQuizResults.select('current-results' as any)(state).data
    ?.data

export const {
  useGetCategoriesQuery,
  useLazyGetCategoriesQuery,
  useGetQuizQuery,
  useLazyGetQuizQuery,
  useGetQuizResultsQuery,
  useLazyGetQuizResultsQuery
} = quizApi
