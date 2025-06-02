/* ======================
        sleep()
====================== */
// Used to in API calls to test/simulate a slow call
// Example: await sleep(4000)
export const sleep = (delay = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, delay))
}
