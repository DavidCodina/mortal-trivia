/* ======================
      formatDate()
====================== */
// By default, I've set this to timeZone: 'UTC'.
// This means that if we're expecting a UTC date
// that it will output correctly against the users own time.
//
// See shadcdn for a similar formatDate that take in string | number as an arg.
// https://github.com/shadcn-ui/ui/blob/main/apps/www/lib/utils.ts

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
