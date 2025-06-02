import { sleep } from '../src/utils'

/* ======================
      get_questions()
====================== */
///////////////////////////////////////////////////////////////////////////
//
// In practice, https://opentdb.com/api.php only return a max of 50 trivia questions.
// If the dificulty param is not specified, it returns an assortment. For example:
//
//   Category 11 : easy: 17 medium: 23, hard: 10
//   Category 12 : easy: 14 medium: 27, hard: 9
//
// If we really want to ensure a sufficient number of questions per category per difficulty, the number of
// total categories derived from https://opentdb.com/api.php can be limited. In turn, three requests
// can be made per category, one for each difficulty level. This would ensure that there is enough seed data
// per category per difficulty. Limiting total categories would not affect the overall ability
// to test the behavior of the app. That said, the above approach was not taken here. Instead, I'm relying
// on the 50 results for eachcategory to be sufficient.
//
// ⚠️ Gotcha: the API does NOT character encode string data in the category names here.
// However, when querying the API for questions, the category names and possibly other data
// is character encoded. This makes it challenging to work with, but this applicate uses
// the html-entities package in different places to convert values. The client uses a custom
// utils/decodeHtmlEntities.ts helper.
//
///////////////////////////////////////////////////////////////////////////

export const get_questions = async (
  trivia_categories: Record<string, any>[]
) => {
  // ⚠️ If one tries to make parallel requests for all categories, you'll get rate limited
  // with a 429 error. Their docs indicate a `response_code: 5` for rate limiting. The
  // docs also indicate that "Each IP can only access the API once every 5 seconds."

  trivia_categories = trivia_categories.filter((category) => {
    return (
      typeof category.name === 'string' &&
      category.name?.trim() !== '' &&
      typeof category.id === 'number'
    )
  })

  const results: any[] = []

  console.log(
    '\nThis will take a moment. Each IP can only access the API once every 5 seconds due to the rate-limiting constraint.'
  )

  for (let i = 0; i < trivia_categories.length; i++) {
    const category = trivia_categories[i]

    try {
      console.log('Waiting 5 second before next request...')
      await sleep(5500)

      console.log(
        `\nFetching questions for category: ${category.name} (${i + 1}/${trivia_categories.length})`
      )

      const res = await fetch(
        `https://opentdb.com/api.php?amount=50&type=multiple&category=${category.id}`
      )

      if (!res.ok) {
        throw new Error(
          `Failed to fetch questions for category ${category.name} (ID: ${category.id}). Status: ${res.status}`
        )
      }

      const data = await res.json()

      if (data.response_code !== 0) {
        throw new Error(
          `API returned error code ${data.response_code} for category ${category.name}`
        )
      }

      results.push({
        status: 'fulfilled',
        value: {
          category: category,
          questions: data.results
        }
      })

      console.log(
        `✓ Successfully fetched ${data.results.length} questions for category: ${category.name}`
      )
    } catch (err) {
      results.push({
        status: 'rejected',
        reason: err
      })
      console.error(
        `✗ Failed to fetch questions for category: ${category.name}`,
        `\n${err.message}`
      )
    }
  }

  // Process the results
  const successResults: any[] = []
  const failedResults: any[] = []

  console.log('\n\nSummary:')

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      successResults.push(result.value)
      console.log(
        `✓ Successfully fetched ${result.value.questions.length} questions for category: ${result.value.category.name}`
      )
    } else {
      failedResults.push({
        category: trivia_categories[index],
        error: result.reason
      })
      console.error(
        `✗ Failed to fetch questions for category: ${trivia_categories[index].name}`,
        `\n${result.reason.message}`
      )
    }
  })

  console.log(
    '\n...............................................................................'
  )
  console.log(
    `\nFinal Result for API requests for questions: ${successResults.length} categories succeeded, ${failedResults.length} categories failed.`
  )

  return { successResults, failedResults }
}
