///////////////////////////////////////////////////////////////////////////
//
// This function is used to get around the Next.js serialization error that
// sometimes occurs when getting data from a database:
//
//   Only plain objects can be passed to Client Components from Server Components.
//
// This error could occur, for example, when a Prisma object is passed across the
// server/client boundary. Why? Because some Prisma types are not serializable (e.g., Decimal).
// Additionally, some properties/methods on a Prisma object's prototype are not serializable.
// For the serializeData() definition, we have two options:
//
//   export function serializeData<T>(value: T): T {
//     const parsedValue = JSON.parse(JSON.stringify(value))
//     return parsedValue as T
//   }
//
// The above implementation will give you back the EXACT same data type as was passed in. This can be
// a good thing or a bad thing. In the case of Prisma, it will give you back the type inferred from the
// associated Prisma model. Again, this can potentially include types like Decimal, which most likely
// do not accurately reflect the actual Typescript type used throughout the application (i.e., the type
// AFTER serialization). This would ultimately lead to a Typescript conflict with the actual Typescript types.
// In such cases, it's better to use the next version where the returned type is simply unknown:
//
//   export function serializeData(value: unknown) {
//     const parsedValue = JSON.parse(JSON.stringify(value))
//     return parsedValue
//   }
//
// Then in the server action or request controller, you can either leave it as unknown or
// typecast it as needed.
//
// Using Prisma again as an example, it's actually possible to run transformations on top of the
// default Prisma client such that Decimal, Date, etc. can be transformed to strings ahead of time,
// and these transformations ARE reflected in Prisma's inferred type of data:
//
//   const data = await prisma.product.findMany({ ... })
//
// In this case, it's better to use the version of serializeData() that bakes in generics,
// and gives us back the initial data type. This way we maintain type information. Which version
// you use depends on your application setup.
//
// Also look into superjson. Jack Herrington has a tutorial on it:
// https://www.youtube.com/watch?v=PtcQwb1uBhc&t=183s
//
//   export const serializeData = <T>(value: T): T => {
//     return superjson.parse(superjson.stringify(value));
//   }
//
///////////////////////////////////////////////////////////////////////////

const _serializeDataToUnknown = (value: unknown) => {
  const parsedValue = JSON.parse(JSON.stringify(value))
  return parsedValue
}

export const serializeData = <T>(value: T): T => {
  const parsedValue = JSON.parse(JSON.stringify(value))
  return parsedValue as T
}
