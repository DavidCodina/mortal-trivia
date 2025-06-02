/* ======================

====================== */
///////////////////////////////////////////////////////////////////////////
//
// Note: When consuming, passing T is optional: isPromise<API_Response>(promise)
// The type guard does not actually check T. Rather, if value is a Promise, then
// we're TELLING Typescript that the return value of the resolved Promise will be T.
// That said, if you properly type your API functions, you shouldn't need to explicitly
// set T at all. For example:
//
//   import { ResponsePromise } from '@/types'
//
//   type Data = unknown // Or be more specific.
//   export type GetDataResponsePromise = ResponsePromise<Data>
//   export type GetData = (url: string) => GetDataResponsePromise
//   export type GetDataResolvedResponse = Awaited<GetDataResponsePromise>
//   export const getData: GetData = async (url: string) => {  ... }
//
///////////////////////////////////////////////////////////////////////////

export function isPromise<T>(value: unknown): value is Promise<T> {
  return value instanceof Promise
}
