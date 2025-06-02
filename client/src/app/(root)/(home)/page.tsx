import * as React from 'react'
import { Page, PageContainer } from '@/components'
import { Quizzer } from './components'

/* ========================================================================

======================================================================== */

const Home = async () => {
  return (
    <Page className="min-h-screen bg-[url('/mortal-trivia.png')] bg-cover bg-[50%_20%] bg-no-repeat lg:bg-[50%_15%] xl:bg-[50%_10%]">
      <PageContainer>
        <Quizzer />
      </PageContainer>
    </Page>
  )
}

export default Home
