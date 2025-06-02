'use client'
import React, { useState } from 'react'

import {
  Button,
  Checkbox,
  CheckboxGroup,
  CheckboxValue,
  CheckboxItemType,
  CheckedState,
  Input,
  RadioGroup,
  RadioItemType,
  RadioValue,
  Select,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectValueType,
  Slider,
  Switch,
  Textarea
} from '@/components'

import { sleep } from '@/utils'
// import { Input, Textarea } from '@/components'

// import { Select, SelectItemType, SelectValueType } from '@/components/Select'

// import { Slider } from '@/components/Slider'
// import { Checkbox, CheckedState } from '@/components/Checkbox'
// import { Button } from '@/components'
// import { RadioGroup, RadioItemType, RadioValue } from '@/components/RadioGroup'
// import { Switch } from '@/components/Switch'
// import {
//   CheckboxGroup,
//   CheckboxValue,
//   CheckboxItemType
// } from '@/components/CheckboxGroup'

import { toast /* useSonner */ } from 'sonner'

/* ========================================================================

======================================================================== */

export const ControlledFormDemo = () => {
  // The key hack is not necessary since this form is fully controlled,
  // and can therefore be reset through resetting state.
  // const [formKey, setFormKey] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [firstNameError, setFirstNameError] = useState('')
  const [firstNameTouched, setFirstNameTouched] = useState(false)

  const [lastName, setLastName] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [lastNameTouched, setLastNameTouched] = useState(false)

  const [singleCheck, setSingleCheck] = useState<CheckedState>(false)
  const [singleCheckError, setSingleCheckError] = useState('')
  const [singleCheckTouched, setSingleCheckTouched] = useState(false)

  const [checkboxGroupValue, setCheckboxGroupValue] = useState<CheckboxValue[]>(
    []
  )
  const [checkboxGroupError, setCheckboxGroupError] = useState('')
  const [checkboxGroupTouched, setCheckboxGroupTouched] = useState(false)

  const [radioGroupValue, setRadioGroupValue] = useState<RadioValue>('')
  const [radioGroupError, setRadioGroupError] = useState('')
  const [radioGroupTouched, setRadioGroupTouched] = useState(false)

  const [switchChecked, setSwitchChecked] = useState(false)
  const [switchError, setSwitchError] = useState('')
  const [switchTouched, setSwitchTouched] = useState(false)

  const [rangeSliderValue, setRangeSliderValue] = useState<number[]>([50]) // [25, 75]
  const [rangeSliderError, setRangeSliderError] = useState('')
  const [rangeSliderTouched, setRangeSliderTouched] = useState(false)

  const [textareaValue, setTextareaValue] = useState('')
  const [textareaError, setTextareaError] = useState('')
  const [textareaTouched, setTextareaTouched] = useState(false)

  const [selectValue, setSelectValue] = useState<SelectValueType>('')
  const [selectError, setSelectError] = useState('')
  const [selectTouched, setSelectTouched] = useState(false)

  const [file, setFile] = useState<File>()
  // const [fileValue, setFileValue] = useState('')
  const [fileError, setFileError] = useState('')
  const [fileTouched, setFileTouched] = useState(false)
  const fileRef = React.useRef<HTMLInputElement>(null)

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)

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
      validateLastName()
  ====================== */

  const validateLastName = (value?: string) => {
    value = typeof value === 'string' ? value : lastName
    let error = ''

    if (typeof value !== 'string') {
      error = 'Invalid type'
      setLastNameError(error)
      return error
    }

    if (!value || value.length < 2) {
      error = 'Must be at least 2 characters'
      setLastNameError(error)
      return error
    }

    setLastNameError('')
    return ''
  }

  /* ======================
    validateSingleCheck()
  ====================== */

  const validateSingleCheck = (value?: CheckedState) => {
    value = typeof value === 'boolean' ? value : singleCheck
    let error = ''

    if (typeof value !== 'boolean') {
      error = 'Invalid type'
      setSingleCheckError(error)
      return error
    }

    if (value !== true) {
      error = 'Single check must be checked.'
      setSingleCheckError(error)
      return error
    }

    setSingleCheckError('')
    return ''
  }

  /* ======================
  validateCheckboxGroup()
  ====================== */

  const validateCheckboxGroup = (value?: CheckboxValue[]) => {
    value = Array.isArray(value) ? value : checkboxGroupValue
    let error = ''

    if (!Array.isArray(value)) {
      error = 'Invalid type'
      setCheckboxGroupError(error)
      return error
    }

    if (value.length < 1) {
      error = 'At least one item must be checked.'
      setCheckboxGroupError(error)
      return error
    }

    setCheckboxGroupError('')
    return ''
  }

  /* ======================
    validateRadioGroup()
  ====================== */

  const validateRadioGroup = (value?: RadioValue) => {
    value = typeof value === 'string' ? value : radioGroupValue
    let error = ''

    if (typeof value !== 'string') {
      error = 'Invalid type'
      setRadioGroupError(error)
      return error
    }

    if (value.length < 1) {
      error = 'Required'
      setRadioGroupError(error)
      return error
    }

    setRadioGroupError('')
    return ''
  }

  /* ======================
      validateSwitch()
  ====================== */

  const validateSwitch = (value?: boolean) => {
    value = typeof value === 'boolean' ? value : switchChecked
    let error = ''

    if (typeof value !== 'boolean') {
      error = 'Invalid type'
      setSwitchError(error)
      return error
    }

    if (value !== true) {
      error = 'Switch must be checked.'
      setSwitchError(error)
      return error
    }

    setSwitchError('')
    return ''
  }

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

    const firstNumber = value[0]

    if (firstNumber < 51) {
      error = 'First number must be greater than 50.'
      setRangeSliderError(error)
      return error
    }

    setRangeSliderError('')
    return ''
  }

  /* ======================
      validateTextarea()
  ====================== */

  const validateTextarea = (value?: string) => {
    value = typeof value === 'string' ? value : textareaValue
    let error = ''

    if (typeof value !== 'string') {
      error = 'Invalid type'
      setTextareaError(error)
      return error
    }

    if (!value || value.trim() === '') {
      error = 'Required'
      setTextareaError(error)
      return error
    }

    if (!value || value.length < 10) {
      error = 'Must be at least 10 characters'
      setTextareaError(error)
      return error
    }

    setTextareaError('')
    return ''
  }

  /* ======================
      validateSelect()
  ====================== */

  const validateSelect = (value?: SelectValueType) => {
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
      validateFile()
  ====================== */

  const validateFile = (value?: File | '') => {
    value = typeof value !== 'undefined' ? value : file
    let error = ''

    if (value === '') {
      error = 'Required'
      setFileError(error)
      return error
    }

    if (!(value instanceof File)) {
      error = 'Invalid type'
      setFileError(error)
      return error
    }

    // Example check: limit file size to 5MB
    if (value.size > 5 * 1024 * 1024) {
      error = 'File size must be less than 5MB'
      setFileError(error)
      return error
    }

    setFileError('')
    return ''
  }

  /* ======================
      validateEmail()
  ====================== */

  const validateEmail = (value?: string) => {
    value = typeof value === 'string' ? value : email
    let error = ''

    if (typeof value !== 'string') {
      error = 'Invalid type'
      setEmailError(error)
      return error
    }

    if (value.trim() === '') {
      error = 'Required'
      setEmailError(error)
      return error
    }

    if (!value.includes('@')) {
      error = 'Invalid email'
      setEmailError(error)
      return error
    }

    // Otherwise unset the title error in state and return ''
    setEmailError('')
    return ''
  }

  /* ======================
        validate()
  ====================== */

  const validate = () => {
    const errors: string[] = []

    // Set true on all toucher functions.
    const touchers: React.Dispatch<React.SetStateAction<boolean>>[] = [
      setFirstNameTouched,
      setLastNameTouched,
      setSingleCheckTouched,
      setCheckboxGroupTouched,
      setRadioGroupTouched,
      setSwitchTouched,
      setRangeSliderTouched,
      setTextareaTouched,
      setSelectTouched,
      setFileTouched,
      setEmailTouched
    ]

    touchers.forEach((toucher) => {
      toucher(true)
    })

    const validators: (() => string)[] = [
      validateFirstName,
      validateLastName,
      validateSingleCheck,
      validateCheckboxGroup,
      validateRadioGroup,
      validateSwitch,
      validateRangeSlider,
      validateTextarea,
      validateSelect,
      validateFile,
      validateEmail
    ]

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
  ///////////////////////////////////////////////////////////////////////////
  //
  // Trying to get values and/or reset values through refs is extremely tedious.
  // The fact is that Radix primitives just don't seem to be designed to be
  // consumed in this way. Initially, I really tried to get each value through
  // refs. The breaking point was the Slider component. The only place to find
  // the value(s) is by drilling into the DOM to find each input. It's just
  // way too complicated. If you try to access inner input elements through refs
  // to force a reset, you're essentially fighting against the component's
  // encapsulated state. The Select doesn't even have a <select> in it! In contrast,
  // Checkbox includes a native <input type="checkbox" />, which can sometimes
  // be easier to manipulate directly, but even then, the synchronization between
  // the DOM's native state and the rendered state in the Radix component isn't guaranteed.
  //
  //
  // A better solution is to simply track all the values in local state.
  // And if you're doing that, then your halfway to a controlled implementation,
  // which is probably the easiest way to go because it doesn't entail hacks to
  // reset the form, etc.
  //
  ///////////////////////////////////////////////////////////////////////////

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const { isValid } = validate()

    if (!isValid) {
      toast.error('Unable to submit the form!')
      return
    }

    setIsSubmitting(true)

    const requestData = {
      firstName,
      lastName,
      singleCheck,
      checkboxGroupValue,
      radioGroupValue,
      switchChecked,
      rangeSliderValue,
      textareaValue,
      selectValue,
      file,
      email
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

      setLastName('')
      setLastNameError('')
      setLastNameTouched(false)

      setSingleCheck(false)
      setSingleCheckError('')
      setSingleCheckTouched(false)

      setCheckboxGroupValue([])
      setCheckboxGroupError('')
      setCheckboxGroupTouched(false)

      setRadioGroupValue('')
      setRadioGroupError('')
      setRadioGroupTouched(false)

      setSwitchChecked(false)
      setSwitchError('')
      setSwitchTouched(false)

      setRangeSliderValue([50])
      setRangeSliderError('')
      setRangeSliderTouched(false)

      setTextareaValue('')
      setTextareaError('')
      setTextareaTouched(false)

      setSelectValue('')
      setSelectError('')
      setSelectTouched(false)

      setFile(undefined)
      setFileError('')
      setFileTouched(false)

      // Again, we could do this: setFileValue('')
      // But, it's still preferable to use a ref. Resetting the
      //  value property actually resets the FileList, which
      // may seem unintuitive, but it works.
      if (fileRef.current) {
        fileRef.current.value = ''
      }

      setEmail('')
      setEmailError('')
      setEmailTouched(false)
    } catch (err) {
      console.log(err)
      toast.error('Unable to submit the form!')
    }

    ///////////////////////////////////////////////////////////////////////////
    //
    // Trying to reset the form fields through refs gets tricky.
    // This is what I had to do for the first few inputs:
    //
    //   if (firstNameRef.current) firstNameRef.current.value = ''
    //   if (lastNameRef.current) lastNameRef.current.value = ''
    //   if (singleCheckRef.current) {
    //     const isChecked =
    //       singleCheckRef.current.getAttribute('data-state') === 'checked' ? true : false
    //     if (isChecked) { singleCheckRef.current.click() }
    //   }
    //
    // However, it would get even more complex with CheckboxGroup and RadioGroup.
    // The best solution is probably just to remount the form. One way to reset the
    // from would be to call setShowForm(false),then reset it here with:
    // useLayoutEffect(() => { if (!showForm) { setShowForm(true) } }, [showForm])
    // A cleaner solution is to use a key prop.
    //
    ///////////////////////////////////////////////////////////////////////////
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
      renderLastName()
  ====================== */

  const renderLastName = () => {
    return (
      <Input
        autoCapitalize='none'
        autoComplete='off' //! Still getting autoComplete
        autoCorrect='off'
        // disabled
        error={lastNameError}
        id='last-name'
        label='Last Name'
        labelRequired={true}
        name='last_name'
        onBlur={(e) => {
          if (!lastNameTouched) {
            setLastNameTouched(true)
          }
          validateLastName(e.target.value)
        }}
        onChange={(e) => {
          setLastName(e.target.value)

          if (lastNameTouched) {
            validateLastName(e.target.value)
          }
        }}
        placeholder='Last Name...'
        spellCheck={false}
        // help='(A hardcoded valid example)'
        touched={lastNameTouched}
        type='text' //! What happens if we make this 'checkbox' or 'radio'?
        value={lastName}
      />
    )
  }

  /* ======================
    renderSingleCheckbox()
  ====================== */

  const renderSingleCheckbox = () => {
    return (
      <Checkbox
        checked={singleCheck}
        // defaultChecked={singleCheck}
        // disabled
        error={singleCheckError}
        // help='Do it!'
        id='singe-check'
        label='Agree To Terms'
        // labelRequired
        name='single-check'
        onBlur={(checkedState) => {
          if (!singleCheckTouched) {
            setSingleCheckTouched(true)
          }
          validateSingleCheck(checkedState)
        }}
        onChange={(checkedState) => {
          setSingleCheck(checkedState)
          if (singleCheckTouched) {
            validateSingleCheck(checkedState)
          }
        }}
        touched={singleCheckTouched}
        value='Single Checkbox checked!'
      />
    )
  }

  /* ======================
    renderCheckboxGroup()
  ====================== */

  const renderCheckboxGroup = () => {
    const checkboxItems: CheckboxItemType[] = [
      { label: 'Red', value: 'red' },
      { label: 'Orange', value: 'orange' },
      { label: 'Yellow', value: 'yellow' },
      { label: 'Green', value: 'green' },
      { label: 'Blue', value: 'blue' },
      { label: 'Purple', value: 'purple' }
    ]

    return (
      <CheckboxGroup
        // defaultValue={['red', 'orange']}
        // disabled
        error={checkboxGroupError}
        items={checkboxItems}
        label='Checkbox Colors'
        name='checkbox-colors'
        onBlur={(value) => {
          if (!checkboxGroupTouched) {
            setCheckboxGroupTouched(true)
          }
          validateCheckboxGroup(value)
        }}
        onChange={(value) => {
          setCheckboxGroupValue(value)

          if (checkboxGroupTouched) {
            validateCheckboxGroup(value)
          }
        }}
        // help='Pick one or more...'
        touched={checkboxGroupTouched}
        value={checkboxGroupValue}
      />
    )
  }

  /* ======================
      renderRadioGroup()
  ====================== */

  const renderRadioGroup = () => {
    const radioItems: RadioItemType[] = [
      { label: 'Red', value: 'red' },
      { label: 'Orange', value: 'orange' },
      { label: 'Yellow', value: 'yellow' },
      { label: 'Green', value: 'green' },
      { label: 'Blue', value: 'blue' },
      { label: 'Purple', value: 'purple' }
    ]

    return (
      <RadioGroup
        // defaultValue={radioGroupValue}
        // disabled
        error={radioGroupError}
        items={radioItems}
        label='Radio Colors'
        name='radio-colors'
        onBlur={(value) => {
          if (!radioGroupTouched) {
            setRadioGroupTouched(true)
          }
          validateRadioGroup(value)
        }}
        onChange={(value) => {
          setRadioGroupValue(value)
          if (radioGroupTouched) {
            validateRadioGroup(value)
          }
        }}
        ///////////////////////////////////////////////////////////////////////////
        //
        // className and style are applied to the top-level <div>
        // RadioGroupBase is a child of that <div>.
        // For cases when you want to style the RadioGroupBase directly,
        // use radioGroupBaseClassName and radioGroupBaseStyle. Primarily,
        // this would be useful for increading the gap between the child
        // <div>s that containe both the radio and the label.
        //
        ///////////////////////////////////////////////////////////////////////////

        // radioGroupBaseStyle={{ outline: '2px dashed deeppink' }}
        // radioGroupBaseClassName=''
        // help='Pick one.'
        touched={radioGroupTouched}
        value={radioGroupValue}
      />
    )
  }

  /* ======================
        renderSwitch()
  ====================== */

  const renderSwitch = () => {
    return (
      <Switch
        checked={switchChecked}
        // disabled
        error={switchError}
        // help='Switch me!'
        id='airplane-mode'
        // label='Airplane Mode'
        labelOn='Airplane Mode On'
        labelOff='Airplane Mode Off'
        onBlur={(checked) => {
          if (!switchTouched) {
            setSwitchTouched(true)
          }
          validateSwitch(checked)
        }}
        onChange={(checked) => {
          setSwitchChecked(checked)

          if (switchTouched) {
            validateSwitch(checked)
          }
        }}
        touched={switchTouched}
      />
    )
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
        labelAlwaysOn
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
        // step={10} // Default is 1.
        // help='Slide me!'
        touched={rangeSliderTouched}
        value={rangeSliderValue}
      />
    )
  }

  /* ======================
      renderTextarea()
  ====================== */

  const renderTextarea = () => {
    return (
      <Textarea
        autoCapitalize='none'
        autoComplete='off'
        autoCorrect='off'
        // disabled
        error={textareaError}
        help='Write a thoughtful message...'
        id='message'
        label={'Message'}
        labelRequired={true}
        name='message'
        onBlur={(e) => {
          if (!textareaTouched) {
            setTextareaTouched(true)
          }
          validateTextarea(e.target.value)
        }}
        onChange={(e) => {
          setTextareaValue(e.target.value)

          if (textareaTouched) {
            validateTextarea(e.target.value)
          }
        }}
        placeholder='Message here...'
        // renderTextareaBaseOnly
        spellCheck={false}
        touched={textareaTouched}
        value={textareaValue}
      />
    )
  }

  /* ======================
        renderSelect()
  ====================== */

  const renderSelect = () => {
    return (
      <Select
        // disabled
        error={selectError}
        // errorClassName='font-bold text-right'
        // className='outline-2 outline-pink-500 outline-dashed' // Assigned to SelectTrigger

        // groupClassName='outline-2 outline-pink-500 outline-dashed'
        // groupStyle={{ outline: '2px dashed deeppink' }}
        id='snack'
        label='Select One'
        // labelClassName='font-bold'

        onBlur={(value) => {
          if (!selectTouched) {
            setSelectTouched(true)
          }
          validateSelect(value)
        }}
        onChange={(value) => {
          setSelectValue(value)

          if (selectTouched) {
            validateSelect(value)
          }
        }}
        // placeholder={
        //   <span className='rounded-full bg-blue-100 px-2'>Select Fruit...</span>
        // }

        // sideOffset={20}
        // style={{ outline: '2px dashed deeppink' }}  // Assigned to SelectTrigger

        touched={selectTouched}
        value={selectValue}
      >
        <SelectGroup>
          <SelectLabel>Fruit</SelectLabel>
          <SelectItem value='apple'>Apple</SelectItem>
          <SelectItem value='banana'>Banana</SelectItem>
          <SelectItem value='cherry'>Cherry</SelectItem>
        </SelectGroup>

        <SelectSeparator />

        <SelectGroup>
          <SelectLabel>Veggie</SelectLabel>
          <SelectItem value='carrot'>Carrot</SelectItem>
          <SelectItem value='broccoli'>Broccoli</SelectItem>
          <SelectItem value='spinach'>Spinach</SelectItem>
        </SelectGroup>
      </Select>
    )
  }

  /* ======================
      renderFileInput()
  ====================== */

  const renderFileInput = () => {
    return (
      <Input
        // disabled
        error={fileError}
        // help='Upload a picture...'
        id='picture'
        label='Picture'
        labelRequired
        name='picture'
        onBlur={(e) => {
          const currentTarget = e.currentTarget
          const fileOrUndefined = e.target.files?.[0]

          setTimeout(() => {
            // For file inputs, run an extra check to avoid executing blur logic
            // on file browser open.  Strangely, even though a blur occurs when
            // the computer's file browser opens, the activeElement is still the
            // input element. This seems to be true regardless of whether or not
            // this logic is wrapped in a setTimeout (i.e., new macrotask), so
            // setTimeout is likely not necessary.
            const activeElement = document.activeElement

            if (activeElement === currentTarget) {
              return
            }

            if (!fileTouched) {
              setFileTouched(true)
            }

            validateFile(fileOrUndefined || '')
          }, 0)
        }}
        onChange={(e) => {
          const fileOrUndefined = e.target.files?.[0]

          // Gotcha: Don't do this: if (file){ setFile(file) }
          // That will allow the user to open the computer's file browser,
          // then cancel out, thereby clearing the file, but the file state
          // will now be out of sync.
          setFile(fileOrUndefined)
          // setFileValue(e.target.value)

          if (fileTouched) {
            // In this case, we want to pass '' and not undefined.
            // This is important for how the current validateFile() function works.
            validateFile(fileOrUndefined || '')
          }
        }}
        ref={fileRef}
        touched={fileTouched}
        type='file'
        ///////////////////////////////////////////////////////////////////////////
        //
        // https://legacy.reactjs.org/docs/forms.html#the-file-input-tag
        // "Because its value is read-only, it is an uncontrolled component in React."
        //
        // https://legacy.reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
        // In React, an <input type="file" /> is always an uncontrolled component because
        // its value can only be set by a user, and not programmatically.
        //
        // File inputs are never controlled! However, this means you need
        // to use a ref to remove e.target.files when resetting the form.
        //
        // Technically, you can create additional `fileValue` state that actually tracks the
        // fileValue (i.e., not the FileList), then you could do setFileValue('') in the
        // handleSubmit() when resetting the form.
        //
        //   value={fileValue}
        //
        // The argument against this approach is that it may work in many modern browsers, but overall
        // could be inconsistent.
        //
        // The "don't control file inputs" advice is largely based on historical browser behaviors,
        // but modern browsers have become much more consistent. The original concerns stemmed from
        // browsers like:
        //
        //   - Internet Explorer (pre-IE10)
        //   - Very old versions of Firefox and Chrome (pre-2012)
        //
        // In any case, if a user has an old browser, in this app we've got bigger problems because
        // Tailwind v4 will fail. That said, it's still a good idea to stick to the ref approach.
        //
        ///////////////////////////////////////////////////////////////////////////
        // ❌ value={file}
      />
    )
  }

  /* ======================
      renderEmail()
  ====================== */

  const renderEmail = () => {
    return (
      <Input
        autoCapitalize='none'
        autoComplete='off'
        autoCorrect='off'
        error={emailError}
        id='email'
        label='Email'
        labelRequired
        name='email'
        onBlur={(e) => {
          if (!emailTouched) {
            setEmailTouched(true)
          }
          validateEmail(e.target.value)
        }}
        onChange={(e) => {
          setEmail(e.target.value)

          if (emailTouched) {
            validateEmail(e.target.value)
          }
        }}
        placeholder='Email...'
        spellCheck={false}
        touched={emailTouched}
        type='email'
        value={email}
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
        {renderFirstName()}

        {renderLastName()}

        {renderSingleCheckbox()}

        {renderCheckboxGroup()}

        {renderRadioGroup()}

        {renderSwitch()}

        {renderRangeSlider()}

        {renderTextarea()}

        {renderSelect()}

        {renderFileInput()}

        {renderEmail()}

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
