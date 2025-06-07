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

///////////////////////////////////////////////////////////////////////////
//
// This works by taking the action creators and binding them to dispatch.
// This way, we don't have to manually import dispatch everywhere when
// consuming action creators.
//
// Note also that Typescript/Redux is smart enough to know what
// is returned. Thus, you have type safety when consuming.
//
//  const { increment, decrement, reset } = useActions()
//
// For the most part it seems that RTK Query eliminates the need
// for useActions() and useTypedSelector(). Why? Because accessing
// data is done through the RTK Query generated hooks.
//
///////////////////////////////////////////////////////////////////////////

export const useBoundActions = () => {
  const { boundActionCreators, boundThunks } =
    React.useContext(InternalReduxContext)
  return {
    ...boundActionCreators,
    ...boundThunks
  }
}
