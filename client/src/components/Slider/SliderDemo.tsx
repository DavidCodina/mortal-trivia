'use client'
import React, { useState } from 'react'

import { Button, Slider } from '@/components'
import { sleep } from '@/utils'
import { toast /* useSonner */ } from 'sonner'

/* ========================================================================

======================================================================== */

export const SliderDemo = () => {
  // The key hack is not necessary since this form is fully controlled,
  // and can therefore be reset through resetting state.
  // const [formKey, setFormKey] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [rangeSliderValue, setRangeSliderValue] = useState<number[]>([25, 75]) // [25, 75]
  const [rangeSliderError, setRangeSliderError] = useState('')
  const [rangeSliderTouched, setRangeSliderTouched] = useState(false)

  /* ======================
    validateRangeSlider()
  ====================== */

  const validateRangeSlider = (value?: number[]) => {
    value = Array.isArray(value) ? value : rangeSliderValue
    let error = ''

    if (!Array.isArray(value)) {
      error = 'Invalid type'
      setRangeSliderError(error)
      return error
    }

    if (value.length < 1) {
      error = 'Must be at least 1 number.'
      setRangeSliderError(error)
      return error
    }

    // Check that every element in the value array is a number
    if (!value.every((val) => typeof val === 'number')) {
      error = 'All elements must be numbers.'
      setRangeSliderError(error)
      return error
    }

    //# const firstNumber = value[0]

    //# if (firstNumber < 51) {
    //#   error = 'First number must be greater than 50.'
    //#   setRangeSliderError(error)
    //#   return error
    //# }

    setRangeSliderError('')
    return ''
  }

  /* ======================
        validate()
  ====================== */

  const validate = () => {
    const errors: string[] = []

    // Set true on all toucher functions.
    const touchers: React.Dispatch<React.SetStateAction<boolean>>[] = [
      setRangeSliderTouched
    ]

    touchers.forEach((toucher) => {
      toucher(true)
    })

    const validators: (() => string)[] = [validateRangeSlider]

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
      rangeSliderValue
    }

    try {
      await sleep(1500)
      console.log('requestData:', requestData)
      toast.success('Form validation success!')

      // setFormKey((prev) => prev + 1)
      setIsSubmitting(false)

      setRangeSliderValue([50])
      setRangeSliderError('')
      setRangeSliderTouched(false)
    } catch (err) {
      console.log(err)
      toast.error('Unable to submit the form!')
    }
  }

  /* ======================
      renderRangeSlider()
  ====================== */

  const renderRangeSlider = () => {
    return (
      <Slider
        // defaultValue is only used on initializattion. Even though
        // rangeSliderValue changes often afterward, that shouldn't matter.
        // defaultValue={rangeSliderValue} // Or for multiple thumbs: [25, 75]
        // disabled
        error={rangeSliderError}
        id='percent'
        label='Percent'
        labelRequired
        max={100}
        name='percent'
        onBlur={(value) => {
          if (!rangeSliderTouched) {
            setRangeSliderTouched(true)
          }
          validateRangeSlider(value)
        }}
        // Radix Slider has an onCommit prop. However, if you have a controlled implementation,
        // then the value you pass in is used to set the value position of the slider. This means
        // that you'll need to use onChange no matter what, so in most cases the onCommit prop is
        // not needed. The onCommit props is only practical in an uncontrolled implementation.
        onChange={(value) => {
          setRangeSliderValue(value)
          if (rangeSliderTouched) {
            validateRangeSlider(value)
          }
        }}
        // showLabelOnHover={false}
        labelAlwaysOn
        // step={10} // Default is 1.
        // help='Slide me!'
        touched={rangeSliderTouched}
        defaultValue={rangeSliderValue}
        //! value={rangeSliderValue}
      />
    )
  }

  /* ======================
          return
  ====================== */

  return (
    <>
      <form
        className='bg-background-light mx-auto max-w-[800px] space-y-6 rounded-xl border p-6 shadow'
        // key={formKey}
        onSubmit={(e) => {
          e.preventDefault()
        }}
        noValidate
      >
        {renderRangeSlider()}

        <Button
          loading={isSubmitting}
          className='flex w-full'
          type='button'
          variant='success'
          onClick={handleSubmit}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </>
  )
}
