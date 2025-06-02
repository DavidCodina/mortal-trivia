'use client'

import React, { useState } from 'react'
import { toast /* useSonner */ } from 'sonner'

import { sleep } from '@/utils'
import { Button, Input } from '@/components'

/* ========================================================================

======================================================================== */

export const InputDemo = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [firstNameError, setFirstNameError] = useState('')
  const [firstNameTouched, setFirstNameTouched] = useState(false)

  /* ======================
      validateFirstName()
  ====================== */

  const validateFirstName = (value?: string) => {
    value = typeof value === 'string' ? value : firstName
    let error = ''

    if (typeof value !== 'string') {
      error = 'Invalid type'
      setFirstNameError(error)
      return error
    }

    if (!value || value.length < 2) {
      error = 'Must be at least 2 characters'
      setFirstNameError(error)
      return error
    }

    // Otherwise unset the title error in state and return ''
    setFirstNameError('')
    return ''
  }

  /* ======================
        validate()
  ====================== */

  const validate = () => {
    const errors: string[] = []

    // Set true on all toucher functions.
    const touchers: React.Dispatch<React.SetStateAction<boolean>>[] = [
      setFirstNameTouched
    ]

    touchers.forEach((toucher) => {
      toucher(true)
    })

    const validators: (() => string)[] = [validateFirstName]

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
      firstName
    }

    try {
      // Make API request, etc.
      await sleep(1500)
      console.log('requestData:', requestData)
      toast.success('Form validation success!')

      // setFormKey((prev) => prev + 1)
      setIsSubmitting(false)

      setFirstName('')
      setFirstNameError('')
      setFirstNameTouched(false)
    } catch (err) {
      console.log(err)
      toast.error('Unable to submit the form!')
    }
  }

  /* ======================
      renderFirstName()
  ====================== */

  const renderFirstName = () => {
    return (
      <Input
        autoCapitalize='none'
        autoComplete='off'
        autoCorrect='off'
        // disabled
        error={firstNameError}
        id='first-name'
        // groupClassName='mb-6'
        // help='(A hardcoded invalid example)'
        // helpClassName='text-xs'
        label={<span>First Name</span>}
        labelRequired={true}
        name='first_name'
        onBlur={(e) => {
          if (!firstNameTouched) {
            setFirstNameTouched(true)
          }
          validateFirstName(e.target.value)
        }}
        onChange={(e) => {
          setFirstName(e.target.value)

          if (firstNameTouched) {
            validateFirstName(e.target.value)
          }
        }}
        placeholder='First Name...'
        // renderInputBaseOnly
        spellCheck={false}
        touched={firstNameTouched}
        type='text'
        value={firstName}
      />
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
      {renderFirstName()}

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
  )
}
