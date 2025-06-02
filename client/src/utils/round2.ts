/* ======================
        round2()
====================== */
///////////////////////////////////////////////////////////////////////////
//
// Round number to 2 decimal places.
// This utility accepts either a number or a string and returns a number.
//
// The Number.EPSILON is a super tiny number (approximately 2.220446049250313e-16) that represents
// the smallest difference between two floating-point numbers in JavaScript/TypeScript.
//
// The reason we add it in the round2 function is to handle a common issue with floating-point
// arithmetic in JavaScript. When dealing with decimal numbers, JavaScript (like many programming
// languages) can sometimes have tiny rounding errors due to how floating-point numbers are
// represented in binary.
//
// By adding Number.EPSILON before multiplying by 100, we ensure that any tiny floating-point imprecisions
// are handled correctly. It's like a tiny nudge that helps push the number in the right direction when rounding.
// Here, we would expect to get back 1.01:
//
//   const n      = 1.005
//   const result = Math.round(n * 100) / 100
//
// But we actually get back 1. Number.EPSILON fixes this issue.
//
// This is particularly important in financial calculations where precision
// is crucial. Here's an example of round2() in action:
//
//   const result1 = 0.1 + 0.2         // => 0.30000000000000004
//   const result2 = round2(0.1 + 0.2) // => 0.3
//
// 🤔 For financial calculations, it's generally better to use a dedicated decimal library
// that handles these edge cases properly (e.g., decimal.js).
//
///////////////////////////////////////////////////////////////////////////

export const round2 = (value: number | string): number => {
  if (typeof value === 'number' && !isNaN(value)) {
    return Math.round((value + Number.EPSILON) * 100) / 100
  }

  // ⚠️ Values like '$123' will be converted to NaN by the Number() function. Use !isNaN(Number(value))
  // check to opt out in such cases.  Values of '' or ' ' will be converted to 0 by the Number() function.
  // Use value.trim() !== '' to opt out in such cases.
  if (
    typeof value === 'string' &&
    value.trim() !== '' &&
    !isNaN(Number(value))
  ) {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100
  }

  // Prevents silent failures, but also could lead to potential runtime errors.
  throw new Error(
    'The value arg passed to `round2()` must be of type number or string.'
  )
}
