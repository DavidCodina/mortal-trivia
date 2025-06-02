'use client'

import {
  configureStore,
  AsyncThunk,
  ThunkDispatch,
  PayloadAction,
  SerializedError
} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
// import { createLogger } from 'redux-logger'
import { bindActionCreators, Action } from 'redux'

import { quizReducer, quizActions, quizThunks } from './slices'
export { ReduxProvider } from './ReduxProvider'

/* ======================
    logger middleware
====================== */

// const logger = createLogger() // Useful but a lot of noise.

/* ======================
      actionCreators
====================== */
// Export all actions from each slice. For example:
// export const contactActions = contactSlice.actions;
// Then import them here, and spread them into a single actionCreators object,
// which will then be passed into bindActionCreators().

const actionCreators = {
  ...quizActions
}

const asyncThunks = {
  ...quizThunks
}

/* ======================
        store
====================== */

export const store = configureStore({
  reducer: {
    quiz: quizReducer
  },

  // See middleware tutorial for more info:
  // https://www.youtube.com/watch?v=dUVXHMHJio0&list=PLC3y8-rFHvwiaOAuTtVXittwybYIorRB3&index=22
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware() //.concat(logger)
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

/* ======================
        Bindings
====================== */
// Wrap action creators in dispatch() with bindActionCreators()
// https://redux-toolkit.js.org/api/other-exports/#bindactioncreators
// https://redux.js.org/api/bindactioncreators
// https://www.youtube.com/watch?v=1Hp8ATFL_fc&list=PLC3y8-rFHvwiaOAuTtVXittwybYIorRB3&index=9

const boundActionCreators = bindActionCreators(actionCreators, store.dispatch)

///////////////////////////////////////////////////////////////////////////
//
// ❌ const boundThunks = bindActionCreators(actionCreators, store.dispatch)
//
// bindActionCreators doesn't preserve the type information for async thunks,
// which means you lose type info when consuming for methods like unwrap().
//
//   getCategories().unwrap().then( ... ).catch( ... )
//
// The solution is to manually wrap asyncThunks with store.dispatch().
//
//   const boundThunks = {
//     getCategories: () => store.dispatch(asyncThunks.getCategories())
//   }
//
// However, we can also create a bindThunks() helper to do this for us.
// The trick is to get typescipt to play along. This is where things get complicated,
// especially because we want to have the correct type hinting with/without .unwrap().
//
// ⚠️ AI used for this solution.
//
///////////////////////////////////////////////////////////////////////////

interface AnyAction extends Action {
  [extraProps: string]: any
}

// Define the structure that RTK thunks return when dispatched
type AsyncThunkFulfilledAction<Returned> = PayloadAction<
  Returned,
  string,
  {
    arg: any
    requestId: string
    requestStatus: 'fulfilled'
  },
  never
>

type AsyncThunkRejectedAction = PayloadAction<
  undefined,
  string,
  {
    arg: any
    requestId: string
    requestStatus: 'rejected'
    aborted: boolean
    condition: boolean
  },
  SerializedError
>

// The promise that RTK returns with unwrap method
interface AsyncThunkPromise<Returned>
  extends Promise<
    AsyncThunkFulfilledAction<Returned> | AsyncThunkRejectedAction
  > {
  unwrap(): Promise<Returned>
}

// Type for bound thunk
type BoundThunk<T> =
  T extends AsyncThunk<infer Returned, infer ThunkArg, any>
    ? ThunkArg extends void
      ? () => AsyncThunkPromise<Returned>
      : (arg: ThunkArg) => AsyncThunkPromise<Returned>
    : never

// Type to map over all thunks in an object
type BoundThunks<T extends Record<string, AsyncThunk<any, any, any>>> = {
  [K in keyof T]: BoundThunk<T[K]>
}

// Helper function to bind thunks
export function bindThunks<T extends Record<string, AsyncThunk<any, any, any>>>(
  asyncThunks: T,
  dispatch: ThunkDispatch<any, any, AnyAction>
): BoundThunks<T> {
  const boundThunks = {} as any

  for (const key in asyncThunks) {
    if (asyncThunks.hasOwnProperty(key)) {
      boundThunks[key] = (arg: any) => dispatch(asyncThunks[key](arg))
    }
  }

  return boundThunks as BoundThunks<T>
}

const boundThunks = bindThunks(asyncThunks, store.dispatch)

/* ======================
        Hooks
====================== */

export const useActions = () => {
  return { ...boundActionCreators, ...boundThunks }
}

// https://redux.js.org/usage/usage-with-typescript#define-typed-hooks
// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch

// Generally, there shouldn't be a need to consume useTypedDispatch(). Instead prefer useActions().
export const useTypedDispatch: DispatchFunc = useDispatch
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
