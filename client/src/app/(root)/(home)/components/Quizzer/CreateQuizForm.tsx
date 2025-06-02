'use client'

import * as React from 'react'
import { AlertCircle, ClipboardPlus, Ban } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

import { useTypedSelector, useActions } from 'redux-store'
import {
  Alert,
  Button,
  ReactSelect,
  ReactSelectOption,
  RadioGroup,
  RadioItemType,
  RadioValue
} from '@/components'

/* ========================================================================

======================================================================== */

export const CreateQuizForm = () => {
  const { getQuiz, getQuizCategories } = useActions()

  /* ======================
  Global, Local, Derived State
  ====================== */

  // Global state
  const categories = useTypedSelector((state) => state.quiz.categories)
  // const categoriesPending = useTypedSelector((state) => state.quiz.categoriesPending)
  const categoriesError = useTypedSelector(
    (state) => state.quiz.categoriesError
  )
  const quizPending = useTypedSelector((state) => state.quiz.quizPending)
  const quizError = useTypedSelector((state) => state.quiz.quizError)

  const quiz = useTypedSelector((state) => state.quiz.quiz)
  const results = useTypedSelector((state) => state.quiz.results)
  const isAudio = useTypedSelector((state) => state.quiz.isAudio)

  // Local state
  const [category, setCategory] = React.useState<ReactSelectOption | null>(null)
  const [difficulty, setDifficulty] = React.useState<ReactSelectOption | null>(
    null
  )
  const [amount, setAmount] = React.useState<RadioValue>('')

  // Derived state
  const submitButtonDisabled = !category || !difficulty || !amount

  /* ======================
  Options For Form Elements
  ====================== */

  const categoryOptions = React.useMemo<ReactSelectOption[]>(() => {
    return Array.isArray(categories)
      ? categories?.map((c) => ({
          value: c.name,
          label: c.name
        }))
      : []
  }, [categories])

  const difficultyOptions: ReactSelectOption[] = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ]

  const amountOptions: RadioItemType[] = [
    { label: 'One', value: '1' },
    { label: 'Three', value: '3' },
    { label: 'Five', value: '5' },
    { label: 'Seven', value: '7' },
    { label: 'Nine', value: '9' },

    ...(process.env.NODE_ENV === 'development'
      ? [{ label: 'Too Many (dev only)', value: '51' }]
      : [])
  ]

  /* ======================
        handleSubmit()
  ====================== */

  const handleSubmit = () => {
    // Extremely basic validation. In practice, this will never
    // get triggered because the submit button will be disabled.
    if (!category || !difficulty || !amount) {
      toast.error('All fields are required.')
      return
    }

    // The arg that gets passed to the thunk payloadcreator.
    const requestData = {
      amount: amount,
      category: category?.value,
      difficulty: difficulty?.value
    }

    getQuiz(requestData)
  }

  /* ======================
      useEffect()
  ====================== */

  React.useEffect(() => {
    if (quizError) {
      toast.error(quizError)
    }
  }, [quizError])

  /* ======================
        useEffect()
  ====================== */

  React.useEffect(() => {
    if (!isAudio || quiz || results) {
      return
    }

    const audio = new Audio('/get-over-here.mp3')
    audio.volume = 0.5
    audio.play().catch((_err) => {
      // console.error('Failed to play get-over-here.mp3', err)
    })
  }, [quiz, results, isAudio])

  /* ======================
        renderForm()
  ====================== */

  const renderForm = () => {
    if (categoriesError) {
      return (
        <Alert
          className='mb-auto max-w-[800px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]'
          leftSection={<AlertCircle />}
          rightSection={
            <Button
              className='self-center'
              onClick={() => {
                getQuizCategories()
              }}
              size='xs'
              title='Get Quiz Categories'
              variant='destructive'
            >
              Try Again
            </Button>
          }
          title='Error'
          variant='destructive'
        >
          {categoriesError}
        </Alert>
      )
    }

    ///////////////////////////////////////////////////////////////////////////
    //
    // categoriesPending is set to false by default.
    // It's only set to true when getCategories() is dispatched.
    // In development, if you refresh the page, you won't IMMEDIATELY see loading UI.
    // However, that's not the case in production. That said, if you really want to
    // mitigate the issue, you can also add a `categories === null` check here.
    // This works because categories will not be null unless it's pending or there's an error
    // - assuming we've called getCategories() at this point.
    //
    ///////////////////////////////////////////////////////////////////////////

    // if (categoriesPending || categories === null) {
    //   return (
    //     <div className='text-primary text-center text-4xl font-black'>
    //       Loading...
    //     </div>
    //   )
    // }

    if (Array.isArray(categories)) {
      if (categories.length === 0) {
        return (
          <div className='bg-destructive mx-auto max-w-2xl rounded-lg p-4 text-white shadow'>
            Error! There seems to be no categories!
          </div>
        )
      }

      return (
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1, ease: 'linear' }}
          className='bg-background-light/95 border-primary mb-6 w-full max-w-[800px] space-y-6 rounded-lg border p-4 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]'
          onSubmit={(e) => {
            e.preventDefault()
          }}
          noValidate
        >
          <h4 className='text-primary text-center text-2xl font-bold'>
            Create Quiz
          </h4>
          <ReactSelect
            label='Select Category'
            labelRequired
            minMenuHeight={500}
            // maxMenuHeight={200} // Set the max menu height
            name='category-select'
            noOptionsMessage={(_obj) => {
              return (
                <div className='text-center text-sm'>
                  No value matches that search criteria.
                </div>
              )
            }}
            onChange={(value, _actionMeta) => {
              setCategory(value as ReactSelectOption | null)
            }}
            options={categoryOptions}
            fieldSize='sm'
            placeholder='Select Category...'
            value={category}
          />

          <ReactSelect
            label='Select Difficulty'
            labelRequired
            name='difficulty-select'
            noOptionsMessage={(_obj) => {
              return (
                <div className='text-center text-sm'>
                  No value matches that search criteria.
                </div>
              )
            }}
            onChange={(value, _actionMeta) => {
              setDifficulty(value as ReactSelectOption | null)
            }}
            options={difficultyOptions}
            fieldSize='sm'
            placeholder='Select Difficulty...'
            value={difficulty}
          />

          <RadioGroup
            items={amountOptions}
            label='Amount'
            name='amount-radios'
            onChange={(value) => {
              setAmount(value)
            }}
            value={amount}
          />

          {/* =====================
                Submit Button
          ===================== */}

          {quizPending ? (
            <Button
              className='flex w-full'
              loading={true}
              size='sm'
              type='button'
              variant='primary'
            >
              Submitting...
            </Button>
          ) : (
            <Button
              className='flex w-full'
              leftSection={submitButtonDisabled ? <Ban /> : <ClipboardPlus />}
              disabled={submitButtonDisabled}
              onClick={handleSubmit}
              size='sm'
              type='button'
              variant='primary'
            >
              {submitButtonDisabled
                ? 'All Fields Required Prior To Submitting'
                : 'Submit'}
            </Button>
          )}
        </motion.form>
      )
    }

    return null
  }

  /* ======================
         return
  ====================== */

  return renderForm()
}
