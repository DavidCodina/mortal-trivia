///////////////////////////////////////////////////////////////////////////
//
// Checking for specific Prisma errors:
//
// Error mMessage Reference: https://www.prisma.io/docs/orm/reference/error-reference
// Handling Errors:          https://www.prisma.io/docs/orm/prisma-client/debugging-and-troubleshooting/handling-exceptions-and-errors
// Error Codes:              https://www.prisma.io/docs/orm/reference/error-reference#error-codes
//
// ⚠️ Gotcha: if (err instanceof Prisma.PrismaClientKnownRequestError) { ... }
// The `instanceof` check doesn't seem to work, even though the err.name is `PrismaClientKnownRequestError`.
// This occurs due to a module boundary mismatch. Prisma errors might not be recognized due to:
//
//   - Multiple Prisma Client instances
//   - Server/client module bundling differences
//   - Next.js server action execution environment quirks.
//
// Why instanceof Fails:
//
//   - Server actions run in different module contexts
//   - Multiple Prisma Client instances create different error prototypes
//   - Next.js optimizations may bundle dependencies differently
//
// This is not a problem with your code. This issue is common in Next.js. Why does this happen?
// In Next.js (and similar frameworks), server code can be bundled in a way that results in
// multiple instances of the @prisma/client package being loaded. When this happens, the error
// thrown and the error class you import are  not the same "instance," so instanceof fails
// — even though the error is clearly a Prisma error.
//
// The Prisma documentation still shows the instanceof pattern, but in practice, many users
// have had to switch to alternative checks, such as comparing error.constructor.name or checking
// the code property directly.
//
///////////////////////////////////////////////////////////////////////////

export const isPrismaError = (
  error: unknown
): error is Error & { code: string } => {
  if (!(error instanceof Error)) {
    return false
  }

  const prismaErrorNames = [
    'PrismaClientKnownRequestError',
    'PrismaClientUnknownRequestError',
    'PrismaClientRustPanicError',
    'PrismaClientInitializationError',
    'PrismaClientValidationError'
  ] as const

  if (
    !prismaErrorNames.includes(error.name as (typeof prismaErrorNames)[number])
  ) {
    return false
  }

  return 'code' in error && typeof error.code === 'string'
}
