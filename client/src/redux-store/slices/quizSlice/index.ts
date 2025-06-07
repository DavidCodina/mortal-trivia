import {
  createSlice,
  PayloadAction,
  createListenerMiddleware
} from '@reduxjs/toolkit'
import { QuizUserAnswer } from '@/types'

import { RootState, /*, quizApi */ api } from '@/redux-store'

type QuizState = {
  userAnswers: QuizUserAnswer[] | null
  isAudio: boolean
}

const initialState: QuizState = {
  userAnswers: null,
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
    setUserAnswers: (state, action: PayloadAction<QuizUserAnswer[]>) => {
      state.userAnswers = action.payload
    },

    resetQuiz: (state) => {
      state.userAnswers = null
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

const quizListenerMiddleware = createListenerMiddleware()

quizListenerMiddleware.startListening({
  actionCreator: quizActions.resetQuiz,
  effect: async (_action, listenerApi) => {
    const beforeState = listenerApi.getState() as RootState
    console.log('\nbeforeQueries: ', beforeState.api.queries)
    const dispatch = listenerApi.dispatch

    ///////////////////////////////////////////////////////////////////////////
    //
    // Initially, I tried doing this:
    //
    //   listenerApi.dispatch(quizApi.util.invalidateTags([ 'Quiz', 'QuizResults']))
    //
    // While it seems like that should work, it doesn't. The 'current-results' cache
    // associated to the 'QuizResults' tag is not removed. In Quiz.index.tsx, we implement
    //
    //   const [getQuizResults, { ... }] = useLazyGetQuizResultsQuery()
    //
    // In theory, getQuizResults() should ONLY run when we manually call getQuizResults(localUserAnswers).
    // However, something about invalidating the cache in conjunction causes RTKQ to think it needs to refetch,
    // which is absolutely unexpected. The local solution is to call reset() 👈🏻 + resetQuiz() in handleResetQuiz().
    // However, another approach is to forciblye remove the caches here, rather than merely invalidating them.
    //
    // The other option is to call listenerApi.dispatch(quizApi.util.resetApiState()), but that's
    // going to remove the entire cache, which is not necessarily what we want.
    //
    ///////////////////////////////////////////////////////////////////////////

    dispatch(
      api.internalActions.removeQueryResult({
        queryCacheKey: ['current-quiz'] as any
      })
    )

    dispatch(
      api.internalActions.removeQueryResult({
        queryCacheKey: ['current-results'] as any
      })
    )

    const afterState = listenerApi.getState() as RootState
    console.log('\nafterQueries: ', afterState.api.queries)
  }
})

export { quizListenerMiddleware }
