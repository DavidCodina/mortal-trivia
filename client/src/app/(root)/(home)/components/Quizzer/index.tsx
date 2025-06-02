'use client'

import * as React from 'react'
import { Volume, VolumeX } from 'lucide-react'
import { useTypedSelector, useActions } from 'redux-store'
import { CreateQuizForm } from './CreateQuizForm'
import { Quiz } from './Quiz'

/* ========================================================================

======================================================================== */

export const Quizzer = () => {
  const { getQuizCategories, toggleIsAudio } = useActions()
  const quiz = useTypedSelector((state) => state.quiz.quiz)
  const isAudio = useTypedSelector((state) => state.quiz.isAudio)

  /* ======================
        useEffect()
  ====================== */

  React.useEffect(() => {
    getQuizCategories()
  }, [getQuizCategories])

  /* ======================
         return
  ====================== */

  return (
    <>
      <div className='flex h-full flex-col items-center justify-center'>
        {!quiz && <CreateQuizForm />}
        {quiz && <Quiz />}
      </div>
      <div className='border-primary bg-background-light fixed top-0 right-0 flex overflow-hidden rounded-bl-xl border-b border-l'>
        <button
          onClick={() => {
            toggleIsAudio()
          }}
          className='text-primary hover:bg-primary/10 flex cursor-pointer items-center justify-center px-2 py-1'
          title={isAudio ? 'Disable Sound' : 'Enable Sound'}
        >
          {isAudio ? (
            <Volume
              className='pointer-events-none relative size-6'
              style={{ left: 5 }}
            />
          ) : (
            <VolumeX className='pointer-events-none size-6' />
          )}

          <span className='sr-only'>
            {isAudio ? 'Disable Sound' : 'Enable Sound'}
          </span>
        </button>
      </div>
    </>
  )
}
