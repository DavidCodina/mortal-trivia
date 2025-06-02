'use client'

import { useState } from 'react'
import { Button, InputPassword } from '@/components'
import { toast } from 'sonner'
import { sleep } from '@/utils'

/* ========================================================================

======================================================================== */

export const InputPasswordDemo = () => {
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  /* ======================
      validatePassword()
  ====================== */

  const validatePassword = (value?: string) => {
    value = typeof value === 'string' ? value : password
    let error = ''

    if (typeof value !== 'string') {
      error = 'Invalid type'
      setPasswordError(error)
      return error
    }

    if (!value || value.length === 0) {
      error = 'Required'
      setPasswordError(error)
      return error
    }

    if (value.length < 5) {
      error = 'Must be at least 5 characters'
      setPasswordError(error)
      return error
    }

    setPasswordError('')
    return ''
  }

  /* ======================
        validate()
  ====================== */

  const validate = () => {
    const errors: string[] = []
    // Set true on all toucher functions.
    const touchers: React.Dispatch<React.SetStateAction<boolean>>[] = [
      setPasswordTouched
    ]

    touchers.forEach((toucher) => {
      toucher(true)
    })

    const validators: (() => string)[] = [validatePassword]

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
      password
    }

    try {
      // Make API request, etc.
      await sleep(1500)
      console.log('requestData:', requestData)
      toast.success('Form validation success!')

      setIsSubmitting(false)

      setPassword('')
      setPasswordError('')
      setPasswordTouched(false)
    } catch (err) {
      console.log(err)
      toast.error('Unable to submit the form!')
    }
  }

  /* ======================
    renderInputPassword()
  ====================== */

  const renderInputPassword = () => {
    return (
      <InputPassword
        autoCapitalize='none'
        autoComplete='off'
        autoCorrect='off'
        error={passwordError}
        //fieldSize='xs'
        id='password'
        label={'Password'}
        labelRequired={true}
        name='password'
        onBlur={(e) => {
          if (!passwordTouched) {
            setPasswordTouched(true)
          }
          validatePassword(e.target.value)
        }}
        onChange={(e) => {
          setPassword(e.target.value)

          if (passwordTouched) {
            validatePassword(e.target.value)
          }
        }}
        placeholder='Password...'
        spellCheck={false}
        touched={passwordTouched}
        value={password}
      />
    )
  }

  /* ======================
            return
  ====================== */

  return (
    <form
      className='bg-background-light mx-auto max-w-[800px] space-y-6 rounded-xl border p-6 shadow'
      onSubmit={(e) => {
        e.preventDefault()
      }}
      noValidate
    >
      {renderInputPassword()}

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
