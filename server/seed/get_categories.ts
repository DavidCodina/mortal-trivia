/* ======================
    get_categories()
====================== */
// This function makes a fetch request for the categories from opentdb.com.
// If an Error is thrown, it will get caught in the consuming context of
// the seed script.

export const get_categories = async (
  limit?: number
): Promise<{ id: number; name: string }[]> => {
  const res = await fetch('https://opentdb.com/api_category.php')
  const { trivia_categories } = await res.json()

  if (Array.isArray(trivia_categories) && typeof limit === 'number') {
    return trivia_categories.slice(0, limit)
  }

  return trivia_categories
}
