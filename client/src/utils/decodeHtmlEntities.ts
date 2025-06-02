///////////////////////////////////////////////////////////////////////////
//
// Kind of hacky, but this also works.
//
//   export const decodeHtmlEntities = (str: string): string => {
//     const textarea = document.createElement('textarea')
//     textarea.innerHTML = str
//     return textarea.value
//   }
//
// Or use html-entities from NPM.
//
///////////////////////////////////////////////////////////////////////////

export const decodeHtmlEntities = (text: string): string => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(text, 'text/html')
  return doc.documentElement.textContent || text
}
