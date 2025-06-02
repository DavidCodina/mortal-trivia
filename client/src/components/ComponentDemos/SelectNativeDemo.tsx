'use client'

import { useState } from 'react'
import { SelectNative as Select } from '@/components/SelectNative'
import { Button } from '@/components'
import { toast } from 'sonner'
import { sleep } from '@/utils'

/* ========================================================================

======================================================================== */

export const SelectNativeDemo = () => {
  const [selectValue, setSelectValue] = useState('')
  const [selectError, setSelectError] = useState('')
  const [selectTouched, setSelectTouched] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  /* ======================
      validateSelect()
  ====================== */

  const validateSelect = (value?: string) => {
    value = typeof value === 'string' ? value : selectValue
    let error = ''

    if (typeof value !== 'string') {
      error = 'Invalid type'
      setSelectError(error)
      return error
    }

    if (!value || value.length === 0) {
      error = 'Required'
      setSelectError(error)
      return error
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
      selectValue
    }

    try {
      // Make API request, etc.
      await sleep(1500)
      console.log('requestData:', requestData)
      toast.success('Form validation success!')

      setIsSubmitting(false)

      setSelectValue('')
      setSelectError('')
      setSelectTouched(false)
    } catch (err) {
      console.log(err)
      toast.error('Unable to submit the form!')
    }
  }

  /* ======================
        renderSelect()
  ====================== */

  const renderSelect = () => {
    return (
      <Select
        // disabled
        className={selectValue === '' ? 'text-muted-foreground' : ''}
        error={selectError}
        fieldSize='sm'
        groupClassName=''
        // help='Make a selection...'
        // helpClassName='font-bold'
        id='fruits'
        label='Select One'
        labelRequired
        // The `value` prop supplied to <select> must be an array if `multiple` is true.
        // multiple
        onBlur={(e) => {
          if (!selectTouched) {
            setSelectTouched(true)
          }
          validateSelect(e.target.value)
        }}
        onChange={(e) => {
          // If using multiple...
          // const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value)
          setSelectValue(e.target.value)

          if (selectTouched) {
            validateSelect(e.target.value)
          }
        }}
        style={{}}
        touched={selectTouched}
        value={selectValue}
      >
        <option value=''>Select A Fruit...</option>
        <option value='apple'>Apple</option>
        <option value='banana'>Banana</option>
        <option value='blueberry'>Blueberry</option>
        <option value='grapes'>Grapes</option>
        <option value='pineapple'>Pineapple</option>
      </Select>
    )
  }

  /* ======================
            return
  ====================== */

  return (
    <form
      className='bg-background-light mx-auto max-w-[800px] space-y-6 rounded-xl border p-6 shadow'
      // key={formKey}
      onSubmit={(e) => {
        e.preventDefault()
      }}
      noValidate
    >
      <p className='mb-8'>
        The <code className='text-pink-500'>SelectNative</code> component was
        created as an alternative to the other{' '}
        <code className='text-pink-500'>Select</code>, which uses a Radix
        Primitive. While the Radix <code className='text-pink-500'>Select</code>{' '}
        provides a nicer UI, the trade-off is that it's <em>much</em> more
        complex to set up and use. The Radix{' '}
        <code className='text-pink-500'>Select</code> behavior is somewhat
        unintuitive. Consequently, this version of{' '}
        <code className='text-pink-500'>Select</code> might be preferable.
      </p>
      {renderSelect()}

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
  )
}
