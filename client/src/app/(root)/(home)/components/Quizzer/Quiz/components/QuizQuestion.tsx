'use client'

import * as React from 'react'

import { cn } from '@/utils'
import { useTypedSelector } from 'redux-store'
import { decodeHtmlEntities } from '@/utils'
import { QuizQuestion as QuizQuestionType, QuizUserAnswer } from '@/types'

type QuizQuestionProps = {
  question: QuizQuestionType
  userAnswer: QuizUserAnswer | null
  onClick: (userAnswer: QuizUserAnswer) => void
}

/* ========================================================================

======================================================================== */

export const QuizQuestion = ({
  onClick,
  question,
  userAnswer
}: QuizQuestionProps) => {
  const results = useTypedSelector((state) => state.quiz.results)
  const resultsPending = useTypedSelector((state) => state.quiz.resultsPending)

  // The specific result for the particular question.
  const currentResult =
    results?.results.find((x) => x.question_id === question._id) || null

  const isCurrentResult = !!currentResult

  /* ======================
         return
  ====================== */

  return (
    <section className=''>
      <h6 className='text-primary mb-2 font-semibold select-none'>
        {decodeHtmlEntities(question.question)}
      </h6>

      <div className='grid gap-2 md:grid-cols-2 xl:grid-cols-4'>
        {question.answers.map((answer, index: number) => {
          const isSelected = userAnswer?.user_answer === answer

          return (
            <button
              key={index}
              className={cn(
                'bg-accent/10 text-muted-foreground flex cursor-pointer items-center justify-center rounded border p-1 text-center text-sm font-medium text-balance',
                isSelected &&
                  !isCurrentResult &&
                  'bg-primary/10 text-primary border-primary',

                // If isCurrentResult and  the user selected an incorrect answer, then mark it with red/destructive.
                isSelected &&
                  isCurrentResult &&
                  currentResult.correct_answer !== answer &&
                  'bg-destructive/10 border-destructive text-destructive',

                // If isCurrentResult, always mark the correct answer with green/success,
                // regardless of whether the user selected it or not.
                isCurrentResult &&
                  currentResult.correct_answer === answer &&
                  'bg-success/10 border-success text-success'
              )}
              onClick={() => {
                if (results || resultsPending) {
                  //toast.error('Answers are final after submission!')
                  return
                }
                onClick({
                  question_id: question._id,
                  user_answer: answer
                })
              }}
            >
              {decodeHtmlEntities(answer)}
            </button>
          )
        })}
      </div>
    </section>
  )
}
