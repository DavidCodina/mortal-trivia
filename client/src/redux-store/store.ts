'use client'

import { configureStore } from '@reduxjs/toolkit'
import { api } from './api'
import { quizReducer, quizListenerMiddleware } from './slices'

// import { createLogger } from 'redux-logger'
// const logger = createLogger() // Useful but a lot of noise.

/* ======================
      makeStore()
====================== */
///////////////////////////////////////////////////////////////////////////
//
// ⚠️ Important!
// The docs have a different approach for Next.js in which they create a makeStore()
// helper that allows them to create a redux store per request. This helps mitigate
// hydration mismatches, but it's also prevents security concerns.
//
//   https://redux-toolkit.js.org/usage/nextjs
//   https://redux-toolkit.js.org/usage/nextjs#creating-a-redux-store-per-request
//
// ❗️ Using a global Redux store singleton (i.e., export const store) is sometimes
// considered a bad practice, but why? AI:
//
//   "Server Concurrency: Next.js servers can serve multiple, independent users at once. If you use a global store,
//   data from one user/request can appear in another user/request, causing data leaks and security issues."
//
// What the docs actually say:
//
//   - No global stores - Because the Redux store is shared across requests, it should not
//
//   - Per-request safe Redux store creation: A Next.js server can handle multiple
//     requests simultaneously. This means that the Redux store should be created
//     per request and that the store should not be shared across requests.
//
//   -  if you define global variables (like the Redux store) they will be shared across
//      requests. This is a problem because the Redux store could be contaminated with data from other requests.
//
// So... Is it really bad? The security concern is actually only relevant for
// Server-Side Rendering (SSR), not client-side Redux state. But wait... Isn't
// react-redux and all its hooks a purely client-side library. Yes. However, the
// underlying Redux store (from @reduxjs/toolkit or plain redux) is just JavaScript
// and can run on the server.
//
// Conversely, on the client side (in the browser), each user has their own JavaScript
// context. There's no way for one user's browser Redux state to leak to another user's
//  browser - they're completely separate environments.
//
// Why makeStore() is still recommended:
//
//   - SSR Isolation: Creates fresh store instances for each server-side render
//   - Hydration Consistency: Ensures server and client start with the same initial state
//   - Clean Architecture: Avoids potential memory leaks in server environments.
//
// Conclusion: The security language in the Redux docs is a bit alarmist and
// overstated. We could technically still use the store singleton approach here.
// This is a client component after all. However, the mitigation of hydration
// mismatches is still a major benefit.
//
///////////////////////////////////////////////////////////////////////////

export const makeStore = () => {
  // https://redux-toolkit.js.org/api/configureStore
  return configureStore({
    reducer: {
      quiz: quizReducer,

      // https://redux-toolkit.js.org/rtk-query/overview#configure-the-store
      // Instead of adding individual reducer slices, we
      // add the generated reducer as a specific top-level slice.
      [api.reducerPath]: api.reducer
    },

    // See middleware tutorial for more info:
    // https://www.youtube.com/watch?v=dUVXHMHJio0&list=PLC3y8-rFHvwiaOAuTtVXittwybYIorRB3&index=22
    // https://egghead.io/lessons/redux-refactor-rtk-query-to-use-a-normal-redux-toolkit-store
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(
        /* logger, */ api.middleware,
        quizListenerMiddleware.middleware
      )
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']
export type RootState = ReturnType<AppStore['getState']>
