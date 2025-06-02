import { Response } from 'express'
import { ResBody } from 'types'

export * from './randomFail'
export * from './round2'

/* ======================
        sleep()
====================== */
// Used in API calls to test/simulate a slow call
// Example: await sleep(4000)

export const sleep = async (delay = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, delay)) // eslint-disable-line
}

/* ======================
      isOneOf()
====================== */
// Used as a conditional check in if statements to determine
// if the value is one of an array of allowedValues.

export const isOneOf = (value: any, allowedValues: any[]) => {
  if (allowedValues.indexOf(value) !== -1) {
    return true
  }
  return false
}

/* ======================
      getZodErrors()
====================== */

export const getZodErrors = (issues: Record<string, any>[] = []) => {
  const errors: Record<string, string> = {}

  for (let i = 0; i < issues.length; i++) {
    const issue = issues[i]
    errors[issue?.path?.[0]] = issue?.message
  }
  return errors
}

/*
///////////////////////////////////////////////////////////////////////////
//
// Get concise Zod errors from the result of <Somechema>.safeParse(data)
//
// Usage:
//
//   const DataSchema = z.object({
//     id: z.string().nonempty(),
//     name: z.string().nonempty(),
//     email: z.string().email()
//   })
//
//   type DataType = z.infer<typeof DataSchema>
//
//   const data: DataType = {
//     id: 123,
//     name: '',
//     email: 'david@example.com'
//   }
//
//   const result = DataSchema.safeParse(data)
//
//   if (!result.success) {
//     // console.log('\n\nError issues:', result?.error?.issues)
//     const errors = getZodErrors(result?.error?.issues)
//     console.log(errors)
//   }
//
// Logs:
//
//   [
//     { name: 'id',   message: 'Expected string, received number' },
//     { name: 'name', message: 'String must contain at least 1 character(s)' }
//   ]
//
///////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
//
// The name property naively assumes that there is a 1:1 relationship
// between a key and the invalid value. For example, a client-side input
// generally only has one value, so sending an error back for that
// issue.path[0] makes sense.
//
// However, things get more complex when an object has nested objects within it,
// which is actually quite common:
//
//   const DataSchema = z.object({
//     user: z.object({ name: z.string().nonempty(), age: z.number().int().gt(0)
//     })
//   })
//
//   type DataType = z.infer<typeof DataSchema>
//
//   const data: DataType = {
//     user: { name: 'David', age: -1 }
//   }
//
//   const result = DataSchema.safeParse(data)
//   console.log(result)
//
//   if (!result.success) {
//     console.log('\n\nError issues:', result.error.issues)
//     const errors = getZodErrors(result?.error?.issues)
//     console.log(errors)
//   }
//
// In this case, issue/error would occur at path: [ 'user', 'age' ]
// This could actually be very important information for the client,
// when it comes to user UI message, debugging, etc.
// Thus, the 'name' property is convenient, but potentially oversimplified.
// On the other hand, the path array is precise, but not necessarily the most convenient.
// For this reason, it may be useful to send both back. This was a previous version:
//
// export const getZodErrors = (issues: Record<string, any>[] = []) => {
//   const errors: { name: string; message: string; path: string[] }[] = []
//   for (let i = 0; i < issues.length; i++) {
//     const issue = issues[i]
//     // Could use continue keyword if not name or message.
//     errors.push({
//       name: issue?.path?.[0],
//       message: issue?.message,
//       path: issue?.path
//     })
//   }
//   return errors
// }
//
///////////////////////////////////////////////////////////////////////////



/* ======================
     getErrorMessage
====================== */
// This is for getting error messages in the client.

export const getErrorMessage = (
  err: Record<any, any> | null,
  fallBackMessage = 'The request failed!'
) => {
  if (err === null) {
    return fallBackMessage
  }
  return err?.response?.data?.message
    ? err?.response?.data?.message
    : err.message
      ? err.message
      : fallBackMessage
}

/* ======================
    transformToSlug()
====================== */

export const transformToSlug = (str: string) => {
  if (!str || typeof str !== 'string') {
    return str
  }

  const transformed = str
    .replaceAll(/[^a-zA-Z0-9 ]/g, '')
    .replaceAll(' ', '-')
    .toLowerCase()

  return transformed
}

/* ======================
    propInObj()
====================== */
// https://dmitripavlutin.com/check-if-object-has-property-javascript/
export const propInObj = (prop: string, obj: Record<any, any>) => {
  return prop in obj
}

/* ======================
      stripObj()
====================== */
///////////////////////////////////////////////////////////////////////////
//
// Inspired by Zod's default parsing behavior of stripping
// a raw data object of any properties not defined by the
// schema. Incidentally, Mongoose also does this against
// it's own schema. Thus, this function would generally
// not be needed, but it's a nice-to-have.
//
// This function takes in an object an an array of allowedKeys.
// It returns a NEW object with only the allowed keys. Example:
//
//   const object = { name: 'David', age: 45 }
//   const allowedKeys = ['name']
//   const strippedObject = stripObject(object, allowedKeys) // => { name: 'David' }
//
///////////////////////////////////////////////////////////////////////////

export const stripObj = <T extends object>(
  obj: T,
  allowedKeys: string[] = []
): Partial<T> => {
  const newObject = { ...obj } // shallow copy
  const keys = Object.keys(newObject)

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (!allowedKeys.includes(key)) {
      delete newObject[key as keyof typeof newObject]
    }
  }

  return newObject
}

/* ======================
      docToObj()
====================== */
// This function is used to get around the Next.js serialization error that
// sometimes occurs when getting data from the database withing getServerSideProps.
// Pass a document directly to it, or if you're working with an array of documents,
// you can map over that array as follows: products.map(docToObj),
// As an alternate solution, I've also seen people do: JSON.parse(JSON.stringify(products))
//
// Another possible solution that might work entails making a deep clone:
// https://www.youtube.com/watch?v=wAj074hO_3g
export const docToObj = (doc: any) => {
  if (doc?._id) {
    doc._id = doc._id.toString()
  }

  if (doc?.createdAt) {
    doc.createdAt = doc.createdAt.toString()
  }

  if (doc?.updatedAt) {
    doc.updatedAt = doc.updatedAt.toString()
  }

  return doc
}

/* ======================
      formatDate()
====================== */
// By default, I've set this to timeZone: 'UTC'.
// This means that if we're expecting a UTC date
// that it will output correctly against the users own time.

export const formatDate = (
  date: Date,
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric', // "numeric" | "2-digit" | undefined
    month: 'long', //  "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined'
    day: 'numeric', // 'numeric' | '2-digit' | undeined
    weekday: 'long', // "long" | "short" | "narrow" | undefined'
    hour: 'numeric', // "numeric" | "2-digit" | undefined
    minute: '2-digit', // '"numeric" | "2-digit" | undefined
    // second: '2-digit', // '"numeric" | "2-digit" | undefined
    // dayPeriod: 'long' // "long" | "short" | "narrow" | undefined
    timeZone: 'UTC'
    // Using timeZoneName makes it more confusing.
    // timeZoneName: 'short' // "short" | "long" | "shortOffset" | "longOffset" | "shortGeneric" | "longGeneric" | undefined
  }
) => {
  if (!(date instanceof Date) || isNaN(Date.parse(date.toISOString()))) {
    return
  }
  return date.toLocaleDateString('en-US', options)
}

/* ======================
   stripObjOfUndefined
====================== */
///////////////////////////////////////////////////////////////////////////
//
// Usage:
//
//   const myObject: Record<string, any> = {
//     name: 'David',
//     age: 46,
//     weight: undefined
//     height: undefined
//   }
//
//   const strippedObject = stripObjOfUndefined(myObject);
//
//   console.log({
//     strippedObject,                      // { name: 'David', age: 46 }
//     isEqual: strippedObject === myObject // true
//   })
//
///////////////////////////////////////////////////////////////////////////

// Here, we're using a Generic which is slightly more flexible than Record<string, any>,
// but both work essentially the same.
export const stripObjOfUndefined = <T extends object>(obj?: T) => {
  if (!obj || typeof obj !== 'object') {
    return obj
  }

  const copy = { ...obj }

  for (const key in copy) {
    if (copy[key] === undefined) {
      delete copy[key]
    }
  }
  return copy
}

/* ======================
  handleServerError()
====================== */
// Log error to Sentry...

export const handleServerError = (res: Response, err: unknown) => {
  const isDevelopment = process.env.NODE_ENV === 'development' ? true : false
  let message = 'Server error.'

  if (isDevelopment) {
    if (err instanceof Error) {
      message = err.message
      console.log({ name: err.name, message: message, stack: err.stack })
    } else {
      console.log(err)
    }
  }

  const ResponseBody: ResBody<null> = {
    code: 'INTERNAL_SERVER_ERROR',
    data: null,
    message: message,
    success: false
  }

  return res.status(500).json(ResponseBody)
}
