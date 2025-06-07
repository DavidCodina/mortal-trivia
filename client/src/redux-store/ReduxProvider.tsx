'use client'

import React, { PropsWithChildren, useRef, createContext } from 'react'
import { bindActionCreators, Dispatch, Action } from 'redux'
import { Provider } from 'react-redux'
import {
  AsyncThunk,
  ThunkDispatch,
  PayloadAction,
  SerializedError
} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { makeStore, AppStore } from './store'
import { quizActions, quizThunks } from './slices'

/* ========================================================================

======================================================================== */

const actionCreators = {
  ...quizActions
}

// Helper to infer the type of bound action creators
// This works around the ReturnType issue with overloaded bindActionCreators
const _inferBoundActionCreators = () =>
  bindActionCreators(actionCreators, {} as Dispatch)
type InferredBoundActionCreators = ReturnType<typeof _inferBoundActionCreators>

/* ========================================================================

======================================================================== */
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

const asyncThunks = {
  ...quizThunks
}

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
function bindThunks<T extends Record<string, AsyncThunk<any, any, any>>>(
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

///////////////////////////////////////////////////////////////////////////
//
// But does it actually work? Yes!
// The type is correctly inferred with/without the .unwrap() method.
//
//   import {  useBoundActions } from '@/hooks'
//
//   ...
//
//   const { getRandom } = useBoundActions()
//
//   React.useEffect(() => {
//     getRandom()
//       .unwrap()
//       .then((result) => {
//         console.log('\n getRandom().unwrap().then(result):', result)
//         return result
//       })
//       .catch((err) => err)
//   }, [getRandom])
//
///////////////////////////////////////////////////////////////////////////

// Helper to infer the type of bound thunks
const _inferBoundThunks = () => bindThunks(asyncThunks, {} as Dispatch)

// Infer the BoundThunks type using the helper
export type InferredBoundThunks = ReturnType<typeof _inferBoundThunks>

/* ========================================================================
                              ReduxProvider
======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// <ApiProvider />: Can be used as a Provider if you do not already have a Redux store.
//   However, we already have a Redux store!
//
//   https://redux-toolkit.js.org/rtk-query/api/ApiProvider
//   Using this together with an existing Redux store will cause them to
//   conflict with each other. If you are already using Redux, please follow
//   the instructions as shown in the Getting Started guide.
//
//
//     import { ApiProvider } from '@reduxjs/toolkit/query/react';
//     ...
//     <ApiProvider api={apiSlice}>
//
///////////////////////////////////////////////////////////////////////////

type InternalContextValue = {
  boundActionCreators: InferredBoundActionCreators
  boundThunks: InferredBoundThunks
}

export const InternalReduxContext = createContext({} as InternalContextValue)

export const ReduxProvider = ({ children }: PropsWithChildren) => {
  // https://redux-toolkit.js.org/usage/nextjs#creating-a-redux-store-per-request
  const storeRef = useRef<AppStore>(undefined)

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  /* ======================
          Bindings
  ====================== */
  // Wrap action creators in dispatch() with bindActionCreators()
  // https://redux-toolkit.js.org/api/other-exports/#bindactioncreators
  // https://redux.js.org/api/bindactioncreators
  // https://www.youtube.com/watch?v=1Hp8ATFL_fc&list=PLC3y8-rFHvwiaOAuTtVXittwybYIorRB3&index=9

  const boundActionCreators = bindActionCreators(
    actionCreators,
    storeRef.current.dispatch
  )

  const boundThunks = bindThunks(asyncThunks, storeRef.current.dispatch)

  /* ======================
  useEffect() to call setupListeners()
  ====================== */
  ///////////////////////////////////////////////////////////////////////////
  //
  // This is necessary for the implementation of things like:
  //
  //   refetchOnFocus: true,
  //   refetchOnReconnect: true,
  //
  // which may occur in the api slice, or individual query hook configurations.
  // See this Jamund Ferguson video for an example:
  // https://egghead.io/lessons/redux-refetch-data-on-focus-and-reconnect-with-rtk-query-s-setuplisteners
  // https://redux-toolkit.js.org/rtk-query/api/setupListeners
  //
  ///////////////////////////////////////////////////////////////////////////

  React.useEffect(() => {
    if (!storeRef.current) {
      return
    }
    setupListeners(storeRef.current.dispatch)
  }, [])

  /* ======================
          return
  ====================== */

  return (
    <Provider store={storeRef.current}>
      <InternalReduxContext.Provider
        value={{
          boundActionCreators: boundActionCreators,
          boundThunks: boundThunks
        }}
      >
        {children}
      </InternalReduxContext.Provider>
    </Provider>
  )
}
