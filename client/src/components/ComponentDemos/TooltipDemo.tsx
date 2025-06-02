'use client'

import * as React from 'react'

import { Button, Tooltip } from '@/components'

/* ========================================================================
                                TooltipDemo
======================================================================== */

export const TooltipDemo = () => {
  const [open1, setOpen1] = React.useState(false)
  const [open2, setOpen2] = React.useState(false)
  const clickedOpen = React.useRef(false)
  const tooltipContentRef = React.useRef<HTMLDivElement | null>(null)

  /* ======================
        useEffect()
  ====================== */

  React.useEffect(() => {
    // tooltipContentRef.current will be null until the tooltip is activated.
    // However, even then we would generally need to create a new macrotask
    // in order to avoid any race conditions between the local state and the
    // internal logic of the Tooltip.

    if (open1 === true) {
      setTimeout(() => {
        console.log('tooltipContentRef on open', tooltipContentRef) // should be <div>
      }, 0)
    } else {
      // Note: Currently the Tooltip is using tailwindcss-animate.
      // The animate-out class uses theme("animationDuration.DEFAULT") internally.
      // https://github.com/jamiebuilds/tailwindcss-animate/blob/main/index.js
      // This seems to affect when the tooltipContentRef.current unmounts.
      // The default animation duation is 150ms, but you should wait 250ms to
      // avoid race conditions. This way you will reliably get the null result.

      setTimeout(() => {
        console.log('tooltipContentRef on close', tooltipContentRef) // should be null
      }, 250)
    }
  }, [open1])

  /* ======================
  renderUncontrolledTooltip()
  ====================== */

  const renderUncontrolledTooltip = () => {
    return (
      <Tooltip
        // side='right'
        delayDuration={0}
        // defaultOpen
        // onPointerDownOutside={(e) => {}}
        trigger={
          <Button variant='primary' size='sm'>
            Hover Me
          </Button>
        }
        contentClassName={`
          max-w-[clamp(0px,400px,calc(100vw-48px))]
        `}

        // arrow={false}
        // sideOffset={15}
      >
        <h6 className='mb-1 font-bold'>Uncontrolled Tooltip 1</h6>
        <p className='mb-2'>
          I'm the most basic uncontrolled tooltip, which is probably what you'll
          want 99% of the time.
        </p>
        <div className='flex items-center gap-1'>
          <span className='text-4xl'>😃</span>
          <span>
            Clamp me with:
            <br />
            <code className='text-pink-500'>{`max-w-[clamp(0px,400px,calc(100vw-48px))]`}</code>
          </span>
        </div>
      </Tooltip>
    )
  }

  /* ======================
  renderControlledTooltip1()
  ====================== */

  const renderControlledTooltip1 = () => {
    return (
      <div className='flex gap-2'>
        <Tooltip
          delayDuration={0}
          open={open1}
          onOpenChange={(open) => {
            setOpen1(open)
          }}
          trigger={
            <Button className='' variant='secondary' size='sm'>
              Hover Me
            </Button>
          }
          contentClassName={`max-w-[clamp(0px,300px,calc(100vw-48px))]`}
          // sideOffset={15}
          tooltipContentRef={tooltipContentRef}
        >
          <h6 className='mb-1 font-bold'>Controlled Tooltip 1</h6>

          <p className='mb-2'>
            Just a regular two-way binding that allows for external programmatic
            control. The tooltip will automatically close when the folowing
            occurs:
          </p>

          <ul className='mx-2 list-inside list-disc space-y-2'>
            <li>Click the trigger</li>
            <li>mouseleave the trigger or menu</li>
            <li>Hover over another tooltip trigger</li>
            <li>Click outside</li>
          </ul>
        </Tooltip>

        <Button
          onClick={() => {
            setOpen1((v) => !v)
          }}
          variant='secondary'
          size='sm'
        >
          {open1 ? 'External Close' : 'External Open'}
        </Button>
      </div>
    )
  }

  /* ======================
  renderControlledTooltip2()
  ====================== */

  const renderControlledTooltip2 = () => {
    return (
      <div className='flex gap-2'>
        <Tooltip
          delayDuration={0}
          open={open2}
          ///////////////////////////////////////////////////////////////////////////
          //
          // For controlled implementations you may not want the two-way binding.
          // If implemented, the tooltip will close onPointerDownOutside and when
          // the mouse leaves the menu and/or trigger.  Conversely, if omitted then
          // the menu will only be opened/closed on click - like a popover. But what
          // if you want behavior that's both like a tooltip and a popover? Then
          // toggle a boolean ref on click + use onMouseEnter to open + use onMouseLeave
          // to conditionally close.
          //
          ///////////////////////////////////////////////////////////////////////////

          // ❌ onOpenChange={(open) => { setOpen(open) }}
          // onPointerDownOutside={(e) => {}}
          trigger={
            <Button
              className=''
              onClick={() => {
                clickedOpen.current = !clickedOpen.current
              }}
              onMouseEnter={() => {
                setOpen2(true)
              }}
              onMouseLeave={() => {
                if (clickedOpen.current) {
                  return
                }
                setOpen2(false)
              }}
              variant='primary'
              size='sm'
            >
              Hover Me
            </Button>
          }
          contentClassName={`
          max-w-[clamp(0px,300px,calc(100vw-48px))]
        `}
          // sideOffset={15}
        >
          <h6 className='mb-1 font-bold'>Controlled Tooltip 2</h6>

          <p className='mb-2'>
            A one-way binding is used here. Consequently, outside clicks,
            mouseleave and hovering over other tooltip triggers don't close me.
          </p>

          <p className='mb-2'>
            Click the 'Hover Me' trigger button to keep open, or open/close
            programmatically with the external button.
          </p>

          <p>
            This particular implementation is designed to behave both like a
            tooltip and a popover.
          </p>
        </Tooltip>

        <Button
          onClick={() => {
            clickedOpen.current = !clickedOpen.current
            setOpen2((v) => !v)
          }}
          variant='primary'
          size='sm'
        >
          {open2 ? 'External Close' : 'External Open'}
        </Button>
      </div>
    )
  }

  /* ======================
          return
  ====================== */

  return (
    <>
      <section className='bg-background-light mt-24 mb-6 rounded-lg border p-4 shadow'>
        <h2 className='text-primary mb-4 font-bold'>
          Uncontrolled & Controlled Examples:
        </h2>

        <div className='flex flex-wrap items-center justify-center gap-4'>
          {renderUncontrolledTooltip()}
          {renderControlledTooltip1()}
          {renderControlledTooltip2()}
        </div>
      </section>

      <section className='bg-background-light mt-24 mb-6 rounded-lg border p-4 shadow'>
        <h2 className='text-primary mb-4 font-bold'>
          Custom Variant Examples:
        </h2>

        <div className='flex flex-wrap items-center justify-center gap-4'>
          <Tooltip
            contentClassName={`max-w-[clamp(0px,400px,calc(100vw-48px))]`}
            delayDuration={0}
            trigger={
              <Button variant='neutral' size='sm'>
                Hover Me
              </Button>
            }
            variant='default'
          >
            <h6 className='mb-1 font-bold'>Default Variant</h6>
            <p className='mb-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus vitae cumque atque doloremque amet enim inventore quos
              animi fugit consequuntur?
            </p>
          </Tooltip>

          <Tooltip
            contentClassName={`max-w-[clamp(0px,400px,calc(100vw-48px))]`}
            delayDuration={0}
            trigger={
              <Button variant='primary' size='sm'>
                Hover Me
              </Button>
            }
            variant='primary'
          >
            <h6 className='mb-1 font-bold'>Primary Variant</h6>
            <p className='mb-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus vitae cumque atque doloremque amet enim inventore quos
              animi fugit consequuntur?
            </p>
          </Tooltip>

          <Tooltip
            contentClassName={`max-w-[clamp(0px,400px,calc(100vw-48px))]`}
            delayDuration={0}
            trigger={
              <Button variant='secondary' size='sm'>
                Hover Me
              </Button>
            }
            variant='secondary'
          >
            <h6 className='mb-1 font-bold'>Secondary Variant</h6>
            <p className='mb-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus vitae cumque atque doloremque amet enim inventore quos
              animi fugit consequuntur?
            </p>
          </Tooltip>

          <Tooltip
            contentClassName={`max-w-[clamp(0px,400px,calc(100vw-48px))]`}
            delayDuration={0}
            trigger={
              <Button variant='info' size='sm'>
                Hover Me
              </Button>
            }
            variant='info'
          >
            <h6 className='mb-1 font-bold'>Info Variant</h6>
            <p className='mb-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus vitae cumque atque doloremque amet enim inventore quos
              animi fugit consequuntur?
            </p>
          </Tooltip>

          <Tooltip
            contentClassName={`max-w-[clamp(0px,400px,calc(100vw-48px))]`}
            delayDuration={0}
            trigger={
              <Button variant='success' size='sm'>
                Hover Me
              </Button>
            }
            variant='success'
          >
            <h6 className='mb-1 font-bold'>Success Variant</h6>
            <p className='mb-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus vitae cumque atque doloremque amet enim inventore quos
              animi fugit consequuntur?
            </p>
          </Tooltip>

          <Tooltip
            contentClassName={`max-w-[clamp(0px,400px,calc(100vw-48px))]`}
            delayDuration={0}
            trigger={
              <Button variant='warning' size='sm'>
                Hover Me
              </Button>
            }
            variant='warning'
          >
            <h6 className='mb-1 font-bold'>Warning Variant</h6>
            <p className='mb-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus vitae cumque atque doloremque amet enim inventore quos
              animi fugit consequuntur?
            </p>
          </Tooltip>

          <Tooltip
            contentClassName={`max-w-[clamp(0px,400px,calc(100vw-48px))]`}
            delayDuration={0}
            trigger={
              <Button variant='destructive' size='sm'>
                Hover Me
              </Button>
            }
            variant='destructive'
          >
            <h6 className='mb-1 font-bold'>Destructive Variant</h6>
            <p className='mb-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus vitae cumque atque doloremque amet enim inventore quos
              animi fugit consequuntur?
            </p>
          </Tooltip>
        </div>
      </section>
    </>
  )
}
