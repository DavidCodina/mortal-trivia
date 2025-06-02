'use client'

import * as React from 'react'
import { toast } from 'sonner'

import { sleep } from '@/utils'
import { Button } from '@/components'
import { CustomSelect, SelectOption } from './'

type MaybeOption = SelectOption | null

// ⚠️ Currently, label is only allowed to be of type string.
// Longer labels will merely wrap to the next line.
const fruitOptions: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'watermelon', label: 'Watermelon' }
]

const defaultValue = fruitOptions[3]

/* ========================================================================

======================================================================== */

export const CustomSelectDemo = () => {
  const selectRef = React.useRef<HTMLDivElement | null>(null)

  const [selectValue, setSelectValue] =
    React.useState<MaybeOption>(defaultValue)
  const [selectTouched, setSelectTouched] = React.useState(false)
  const [selectError, setSelectError] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  /* ======================
      validateSelect()
  ====================== */

  const validateSelect = (value?: MaybeOption) => {
    value = typeof value !== 'undefined' ? value : selectValue

    if (!value) {
      setSelectError('Required')
      return 'Required'
    }

    setSelectError('')
    return ''
  }

  /* ======================
        validate()
  ====================== */

  const validate = () => {
    const errors: string[] = []
    // Set true on all toucher functions.
    const touchers: React.Dispatch<React.SetStateAction<boolean>>[] = [
      setSelectTouched
    ]

    touchers.forEach((toucher) => {
      toucher(true)
    })

    const validators: (() => string)[] = [validateSelect]

    validators.forEach((validator) => {
      const error = validator()
      if (error) {
        errors.push(error)
      }
    })

    // Return early if errors
    if (errors.length >= 1) {
      return { isValid: false, errors: errors }
    }

    return { isValid: true, errors: null }
  }

  /* ======================
      handleSubmit()()
  ====================== */

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const { isValid } = validate()

    if (!isValid) {
      toast.error('Unable to submit the form!')
      return
    }

    setIsSubmitting(true)

    const requestData = {
      fruit: selectValue?.value
    }

    try {
      // Make API request, etc.
      await sleep(1500)
      console.log('requestData:', requestData)
      toast.success('Form validation success!')

      setIsSubmitting(false)

      setSelectValue(null)
      setSelectError('')
      setSelectTouched(false)
    } catch (err) {
      console.log(err)
      toast.error('Unable to submit the form!')
    }
  }

  /* ======================
      renderCustomSelect()
  ====================== */

  const renderCustomSelect = () => {
    return (
      <CustomSelect
        allowDeselect={true}
        className=''
        checkIconPosition='right'
        // defaultValue={defaultValue}
        disabled={false}
        error={selectError}
        errorClassName=''
        errorStyle={{}}
        fieldSize='sm'
        groupClassName='mb-4'
        groupStyle={{}}
        help=''
        helpClassName=''
        helpStyle={{}}
        label='Select A Fruit'
        labelClassName='text-primary font-bold'
        labelStyle={{}}
        labelRequired
        menuClassName=''
        menuStyle={{}}
        onBlur={(value) => {
          if (!selectTouched) {
            setSelectTouched(true)
          }
          validateSelect(value)
        }}
        onChange={(newValue) => {
          setSelectValue(newValue)

          if (selectTouched) {
            validateSelect(newValue)
          }
        }}
        options={fruitOptions}
        placeholder='Select Fruit...'
        ref={selectRef}
        style={{}}
        touched={selectTouched}
        triggerClassName=''
        triggerStyle={{}}
        value={selectValue}
      />
    )
  }

  /* ======================
          return
  ====================== */

  return (
    <>
      <form
        className='bg-background-light mx-auto mb-6 max-w-[600px] rounded-lg border p-4 shadow'
        onSubmit={(e) => {
          e.preventDefault()
        }}
        noValidate
      >
        {renderCustomSelect()}

        <Button
          className='flex w-full'
          loading={isSubmitting}
          onClick={handleSubmit}
          size='sm'
          type='button'
          variant='success'
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </>
  )
}
