'use client'

import * as React from 'react'
import { Mail, UserPlus, KeyRound, Info } from 'lucide-react'
import { useCycle } from '@/hooks'
import {
  Button,
  Stepper,
  Step,
  StepContent,
  CompletedContent
} from '@/components'

type Size = React.ComponentProps<typeof Stepper>['size']
type Variant = React.ComponentProps<typeof Stepper>['variant']

const variants: Variant[] = ['primary', 'secondary', 'default']
const sizes: Size[] = ['md', 'lg', 'xl', '2xl', '3xl', '4xl', 'xs', 'sm']

/* ========================================================================

======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// Generally, we'll want to to manually control the `activeIndex`.
// For example, when building a step form, the next `activeIndex` would
// get set only after the form fields were validated.
//
// Following this pattern of externalization, `isActive`, `isCompleted` and `isValid`
// and `isLoading` are also determined externally for Step. Similarly, `show` is determined
// externally for StepContent and CompletedContent. The tradeoff is a little more work when
// consuming, but all associated Stepper components are now merely presentational/dumb
// - no context, no nothing.
//
// This is not how Chakra, Mantine, or MUI do it, but it's actually a much
// less complex pattern, and allows for more fine-grained control on the
// consuming side.
//
///////////////////////////////////////////////////////////////////////////

export function StepperDemo() {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [alternativeLabel, setAlternativeLabel] = React.useState(false)
  const [size, runCycleSize] = useCycle(...sizes)

  const [variant, runCycleVariant] = useCycle(...variants)

  // Omit index because it will be added when mapping.
  const stepData: Omit<React.ComponentProps<typeof Step>, 'index'>[] = [
    {
      label: 'Step 1',
      description: 'Create Account',
      isActive: activeIndex === 0,
      isCompleted: activeIndex > 0,
      icon: <UserPlus />,
      isValid: undefined,
      isLoading: false
    },
    {
      // className: 'whitespace-nowrap',
      label: 'Step 2',
      description: (
        <div className='max-w-[160px]'>
          Confirm Email. A longer description for testing...
        </div>
      ),
      //description: 'Confirm Email. A longer description for testing...',
      isActive: activeIndex === 1,
      isCompleted: activeIndex > 1,
      icon: <Mail />,
      isValid: undefined,
      isLoading: false
    },
    {
      label: 'Step 3',
      description: 'Access Content',
      isActive: activeIndex === 2,
      isCompleted: activeIndex > 2,
      icon: <KeyRound />,
      isValid: undefined,
      isLoading: false
    }
  ]

  const totalSteps = stepData.length

  const handlePrevious = () => {
    setActiveIndex((v) => Math.max(v - 1, 0))
  }

  const handleNext = () => {
    setActiveIndex((v) => Math.min(v + 1, totalSteps))
  }

  // const handleStepClick = (step: number) => {
  //   setActiveIndex(step)
  // }

  /* ======================
    renderStepper()
  ====================== */

  const renderStepper = () => {
    const steps = stepData.map((step, index) => {
      return <Step key={index} index={index} {...step} />
    })

    ///////////////////////////////////////////////////////////////////////////
    //
    // Wrapping in a Fragment is fine:
    //
    //   const steps = (
    //     <>
    //       {stepData.map((step, index) => {
    //         return (
    //           <Step
    //             key={index}
    //             index={index}
    //             {...step}
    //           />
    //         )
    //       })}
    //     </>
    //   )
    //
    ///////////////////////////////////////////////////////////////////////////

    return (
      <Stepper
        alternativeLabel={alternativeLabel}
        separatorBreakpoint={800}
        // ⚠️ overflow-clip may be too opinionated to bake into Stepper,
        // but consider adding it on the consuming side.
        //
        // In the absence of an actual `size` variant, we can set size
        // by setting text-* on the `Stepper` itself. This works because
        // every Step button and everything inside of each Step that would
        // matter is based on em units. A text-* size here would override the
        // actual size variant. Similarly, a text-* size on a <Step> would
        // also override the size variant.
        className={`mb-8`}
        size={size}
        variant={variant}
      >
        {steps}
      </Stepper>
    )
  }

  /* ======================
      renderContent()
  ====================== */

  const renderContent = () => {
    return (
      <>
        <StepContent show={activeIndex === 0}>
          <h3 className='text-primary text-xl font-black'>Step 1</h3>
          <p className='mb-4'>
            This <code className='text-pink-500'>Stepper</code> is inspired by
            Chakra UI, Mantine and MUI. However, most associated components are
            representational/dumb. Ultimately, this means a litte more work on
            the consuming side, but a much less complex internal implementation.
          </p>

          <p>
            Generally, you're going to want to have external control over the{' '}
            <code className='text-pink-500'>activeIndex</code>. Following that
            pattern, it just made sense to externalize other things like{' '}
            <code className='text-pink-500'>isActive</code>,{' '}
            <code className='text-pink-500'>isCompleted</code>,{' '}
            <code className='text-pink-500'>isValid</code> etc.
          </p>
        </StepContent>

        <StepContent show={activeIndex === 1}>
          <h3 className='text-primary mb-2 text-xl font-black'>Step 2</h3>
          <p className='mb-4'>
            <Info className='text-primary mr-1 inline' /> Icons are optional.
            The default behavior is to show the step (i.e.,{' '}
            <code className='size-[1em] text-pink-500'>index + 1</code>), or a
            check when <code className='text-pink-500'>isCompleted</code>.
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad error
            voluptatum totam natus vero placeat velit veniam eum, blanditiis
            modi, quod laborum unde quidem similique, quos voluptatem delectus
            dolore optio dolores a eos in. Nam minima at modi, mollitia
            accusamus omnis sunt totam facilis inventore. Tempore itaque harum
            eaque explicabo?
          </p>
        </StepContent>

        <StepContent show={activeIndex === 2}>
          <h3 className='text-primary text-xl font-black'>Step 3</h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad error
          voluptatum totam natus vero placeat velit veniam eum, blanditiis modi,
          quod laborum unde quidem similique, quos voluptatem delectus dolore
          optio dolores a eos in. Nam minima at modi, mollitia accusamus omnis
          sunt totam facilis inventore. Tempore itaque harum eaque explicabo?
        </StepContent>

        <CompletedContent show={activeIndex === totalSteps}>
          <h3 className='text-primary text-xl font-black'>Completion!</h3>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores
          neque aut architecto accusantium ea laborum possimus libero optio
          consequuntur, deleniti ex facere explicabo alias repellat ipsa sequi
          placeat vel! Placeat harum quaerat consequuntur excepturi aspernatur
          veritatis facilis repellendus quis. Dicta similique dolorum qui omnis.
          Corrupti quaerat optio eius odio illo!
        </CompletedContent>
      </>
    )
  }

  /* ======================
      renderControls()
  ====================== */

  const renderControls = () => {
    return (
      <div className='mt-6 flex justify-center gap-4'>
        <Button
          onClick={handlePrevious}
          disabled={activeIndex === 0}
          style={{ minWidth: 100 }}
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={activeIndex === totalSteps}
          style={{ minWidth: 100 }}
        >
          {activeIndex === totalSteps ? 'Done' : 'Next'}
        </Button>
      </div>
    )
  }

  /* ======================
          return
  ====================== */

  return (
    <section className='mx-auto mt-12'>
      <div className='mb-12 flex flex-wrap justify-center gap-4'>
        <Button
          onClick={() => {
            runCycleVariant()
          }}
          style={{ minWidth: 200 }}
        >
          Variant: {variant}
        </Button>

        <Button
          onClick={() => {
            runCycleSize()
          }}
          style={{ minWidth: 200 }}
        >
          Size: {size}
        </Button>

        <Button
          className=''
          onClick={() => setAlternativeLabel((v) => !v)}
          style={{ minWidth: 200 }}
        >
          Alternative Label: {alternativeLabel ? 'On' : 'Off'}
        </Button>
      </div>

      {renderStepper()}

      {/* <div className='text-muted-foreground mb-8 text-center text-sm font-medium'>
        Intermediate JSX is okay...
      </div> */}

      {renderContent()}
      {renderControls()}
    </section>
  )
}
