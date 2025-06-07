import * as React from 'react'

import { useDispatch, useSelector, useStore } from 'react-redux'
import {
  type AppDispatch,
  type AppStore,
  type RootState,
  InternalReduxContext
} from '@/redux-store'

///////////////////////////////////////////////////////////////////////////
//
// https://redux.js.org/usage/usage-with-typescript#define-typed-hooks
// withTypes is a more concise way of doing this:
//
//   type DispatchFunc = () => AppDispatch
//   export const useAppDispatch: DispatchFunc = useDispatch
//
///////////////////////////////////////////////////////////////////////////

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

///////////////////////////////////////////////////////////////////////////
//
// withTypes is a more concise way of doing this:
//
//   import { TypedUseSelectorHook } from 'react-redux'
//   export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
//
///////////////////////////////////////////////////////////////////////////
export const useAppSelector = useSelector.withTypes<RootState>()

export const useAppStore = useStore.withTypes<AppStore>()

export const useBoundActions = () => {
  const { boundActionCreators, boundThunks } =
    React.useContext(InternalReduxContext)
  return {
    ...boundActionCreators,
    ...boundThunks
  }
}
