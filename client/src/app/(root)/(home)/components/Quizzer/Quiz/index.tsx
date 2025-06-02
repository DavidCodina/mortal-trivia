'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import {
  AlertCircle,
  CircleCheckBig,
  TriangleAlert,
  ClipboardCheck,
  RotateCw
} from 'lucide-react'

import { Alert, Button } from '@/components'
import { decodeHtmlEntities } from '@/utils'
import { useTypedSelector, useActions } from 'redux-store'
import { QuizQuestion } from './components'
import { QuizUserAnswer } from '@/types'

/* ========================================================================

======================================================================== */

export const Quiz = () => {
  const { getQuizResults, setUserAnswers, resetQuiz } = useActions()

  /* ======================
  Global, Local, Derived State
  ====================== */

  // Global state
  // const quizError = useTypedSelector((state) => state.quiz.quizError)
  // const quizPending = useTypedSelector((state) => state.quiz.quizPending)
  const quiz = useTypedSelector((state) => state.quiz.quiz)
  const quizLength = Array.isArray(quiz) ? quiz.length : 0

  const resultsError = useTypedSelector((state) => state.quiz.resultsError)
  const resultsPending = useTypedSelector((state) => state.quiz.resultsPending)
  const results = useTypedSelector((state) => state.quiz.results)

  const isAudio = useTypedSelector((state) => state.quiz.isAudio)

  // Local state
  const [localUserAnswers, setLocalUserAnswers] = React.useState<
    QuizUserAnswer[]
  >([])

  // Derived state
  const showSubmitButton =
    localUserAnswers.length > 0 && localUserAnswers.length === quizLength

  /* ======================
      updateUserAnswers()
  ====================== */

  const updateUserAnswers = (userAnswer: QuizUserAnswer) => {
    setLocalUserAnswers((prev) => {
      // Filter out any existing answer for this question_id
      const filteredAnswers = prev.filter(
        (x) => x.question_id !== userAnswer.question_id
      )
      return [...filteredAnswers, userAnswer]
    })
  }

  /* ======================
        handleSubmit()
  ====================== */

  const handleSubmit = () => {
    setUserAnswers(localUserAnswers)
    getQuizResults(localUserAnswers)
  }

  /* ======================
        useEffect() 
  ====================== */

  React.useEffect(() => {
    if (resultsError) {
      toast.error(resultsError)
    }
  }, [resultsError])

  /* ======================
  useEffect() for quiz initialization
  ====================== */

  React.useEffect(() => {
    if (!isAudio || results) {
      return
    }
    if (quiz) {
      const audio = new Audio('/test-your-might.mp3')
      audio.volume = 0.5
      audio.play().catch((_err) => {
        // console.error('Failed to play test-your-might.mp3', err)
      })
    }
  }, [quiz, results, isAudio])

  /* ======================
  useEffect() for result sounds
  ====================== */

  React.useEffect(() => {
    if (!isAudio || !results) {
      return
    }

    const perfectScore = results.percentage === 100
    const goodScore = results.percentage >= 80
    const mediumScore = results.percentage < 80 && results.percentage >= 60
    const badScore = results.percentage < 60
    const horribleScore = results.percentage === 0

    if (perfectScore) {
      const audio = new Audio('/flawless-victory.mp3')
      audio.play().catch((_error) => {
        // console.error('Failed to play flawless-victory.mp3', error)
      })
    } else if (goodScore) {
      const audio = new Audio('/well-done.mp3')
      audio.play().catch((_err) => {
        // console.error('Failed to play well-done.mp3', err)
      })
    } else if (mediumScore) {
      const audio = new Audio('/impressive.mp3')
      audio.play().catch((_err) => {
        // console.error('Failed to play impressive.mp3', err)
      })
    } else if (badScore && !horribleScore) {
      const audio = new Audio('/sinister-laugh.mp3')
      audio.play().catch((_err) => {
        // console.error('Failed to play sinister-laugh.mp3:', err)
      })
    } else if (horribleScore) {
      const audio = new Audio('/fatality.mp3')
      audio.play().catch((_err) => {
        // console.error('Failed to play fatality.mp3', err)
      })
    }
  }, [results, isAudio])

  /* ======================
        useEffect()
  ====================== */

  React.useEffect(() => {
    if (!results) {
      return
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [results])

  /* ======================
        renderResults()
  ====================== */

  const renderResults = () => {
    if (!results) {
      return null
    }

    const perfectScore = results.percentage === 100
    const goodScore = results.percentage >= 80
    const mediumScore = results.percentage < 80 && results.percentage >= 60
    const _badScore = results.percentage < 60
    const horribleScore = results.percentage === 0

    return (
      <Alert
        className='mb-6 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]'
        leftSection={
          goodScore ? (
            <CircleCheckBig />
          ) : mediumScore ? (
            <TriangleAlert />
          ) : (
            <AlertCircle />
          )
        }
        rightSection={
          <Button
            className='self-center'
            onClick={() => {
              resetQuiz()
            }}
            size='xs'
            variant={
              goodScore ? 'success' : mediumScore ? 'warning' : 'destructive'
            }
          >
            Create New Quiz
          </Button>
        }
        title={`${perfectScore ? 'Flawless Victory!' : goodScore ? 'Well Done!' : mediumScore ? 'Impressive!' : horribleScore ? 'Fatality!' : 'Ha, ha, ha!'}`}
        variant={
          goodScore ? 'success' : mediumScore ? 'warning' : 'destructive'
        }
      >
        You scored <span className='font-bold'>{results.correct_answers}</span>{' '}
        out of <span className='font-bold'> {results.total_questions}</span>.
      </Alert>
    )
  }

  /* ======================
        renderQuiz()
  ====================== */

  const renderQuiz = () => {
    // If quizError, it's handled in CreateQuizForm with a toast.

    // We shouldn't really need loading UI, assuming that the API call is going to happen fairly quickly.
    // if (quizPending) {
    //   return (
    //     <div className='text-primary text-center text-3xl font-bold'>
    //       Loading...
    //     </div>
    //   )
    // }

    if (Array.isArray(quiz)) {
      // Technically, this should never happen because the server checks the number of
      // requested questions (i.e., amount) against the number of available questions and
      // sends back a 404 with an INSUFFICIENT_QUESTIONS code if there are not enough questions.
      if (quiz.length === 0) {
        return (
          <Alert
            className='mb-auto max-w-[800px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]'
            leftSection={<AlertCircle />}
            rightSection={
              <Button
                className='self-center'
                onClick={() => {
                  resetQuiz()
                }}
                size='xs'
                variant='destructive'
              >
                Create New Quiz
              </Button>
            }
            title='Error'
            variant='destructive'
          >
            Error! There seems to be no quiz questions!
          </Alert>
        )
      }

      /* ======================
              return
      ====================== */

      return (
        <>
          {renderResults()}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'linear' }}
            className='bg-background-light border-primary relative w-full space-y-6 overflow-hidden rounded-xl border p-4 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]'
          >
            <h3 className='text-primary text-2xl font-bold'>
              {typeof quiz?.[0].category === 'string'
                ? `${decodeHtmlEntities(quiz[0].category)} (${typeof quiz[0].difficulty === 'string' ? quiz[0].difficulty.charAt(0).toUpperCase() + quiz[0].difficulty.slice(1) : ''})`
                : 'Quiz'}
            </h3>
            {quiz.map((question, index: number) => {
              const userAnswer =
                localUserAnswers.find((x) => x.question_id === question._id) ||
                null

              return (
                <QuizQuestion
                  userAnswer={userAnswer}
                  key={index}
                  onClick={updateUserAnswers}
                  question={question}
                />
              )
            })}

            {showSubmitButton && !results && (
              <Button
                leftSection={<ClipboardCheck />}
                loading={resultsPending}
                size='sm'
                className='flex w-full'
                variant='primary'
                onClick={handleSubmit}
              >
                {resultsPending ? 'SUBMITTING...' : 'SUBMIT QUIZ'}
              </Button>
            )}

            {results && (
              <>
                <Button
                  size='sm'
                  className='flex w-full'
                  variant='primary'
                  onClick={() => {
                    resetQuiz()
                  }}
                  title='Reset Quiz'
                >
                  Create A New Quiz
                </Button>
              </>
            )}

            <div className='border-primary absolute top-0 right-0 flex overflow-hidden rounded-bl-xl border-b border-l'>
              <button
                className='border-primary text-primary hover:bg-primary/10 flex cursor-pointer items-center justify-center border-r px-2 py-1'
                onClick={() => {
                  resetQuiz()
                }}
                style={{ minHeight: 32 }}
                title='Create A New Quiz'
              >
                <RotateCw className='pointer-events-none size-5' />
                <span className='sr-only'>Create A New Quiz</span>
              </button>
            </div>
          </motion.section>
        </>
      )
    }

    return null
  }

  /* ======================
         return
  ====================== */

  return renderQuiz()
}
