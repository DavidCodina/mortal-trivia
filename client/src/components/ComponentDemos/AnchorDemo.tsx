'use client'

import { Anchor } from '@/components/Anchor'
import { buttonVariants } from '@/components/Button/buttonVariants'
import { cn } from '@/utils'

/* ========================================================================
                                AnchorDemo
======================================================================== */

export const AnchorDemo = () => {
  /* ======================
          return
  ====================== */

  return (
    <>
      <article className='bg-background-light mx-auto rounded-lg border p-4 shadow-lg'>
        <p className='mb-4'>What benefit does this component confer?</p>

        <ul className='mx-auto mb-6 w-9/10 list-disc space-y-4 text-sm'>
          <li>
            It adds <code className='text-pink-500'>disabled</code> prop, which
            removes <code className='text-pink-500'>href</code>, opts out of{' '}
            <code className='text-pink-500'>onClick</code>, and adds disabled
            styles.
          </li>

          <li>
            It removes <code className='text-pink-500'>href</code> when{' '}
            <code className='text-pink-500'>onClick</code> handler is passed.
            This could be considered too opinionated, but generally if one is
            using an <code className='text-pink-500'>onClick</code> in an{' '}
            <code className='text-pink-500'>{`<a>`}</code>, it kind of implies
            it's being used more like a{' '}
            <code className='text-pink-500'>{`<button>`}</code>.
          </li>

          <li>
            It bakes in default{' '}
            <code className='text-pink-500'>rel='noopener noreferrer'</code> and{' '}
            <code className='text-pink-500'>target='_blank'</code> attributes.
            Thus, it's currently intended to be used to link to external sites
            and therefore has no <code className='text-pink-500'>asChild</code>{' '}
            prop to morph with a{' '}
            <code className='text-pink-500'>{`<Link />`}</code> component. We
            could build a styled abstraction on top of the{' '}
            <code className='text-pink-500'>{`<Link />`}</code> from
            'next/link', but that's not what this component is for.
          </li>

          <li>It adds an underline prop.</li>

          <li>
            It adds back a <code className='text-pink-500'>tabIndex</code> of 0
            even when no <code className='text-pink-500'>href</code>, making the{' '}
            <code className='text-pink-500'>focus-visible:...</code> style work
            even when the <code className='text-pink-500'>{`<a>`}</code> is
            being used strictly as a click handler. It only removes the{' '}
            <code className='text-pink-500'>tabIndex</code> when disabled.
          </li>

          <li>
            It dyanamically adds the correct role:{' '}
            <code className='text-pink-500'>{`role={onClick ? 'button' : 'link'}`}</code>
          </li>

          <li>
            It adds <code className='text-pink-500'>onKeyDown</code> to support
            pressing 'Enter' or ' ' to trigger the click handler.
          </li>
        </ul>

        <p className='mb-4'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis
          accusantium, molestiae et blanditiis dicta autem. Impedit voluptate
          officia excepturi reprehenderit! Quo veniam omnis pariatur
          exercitationem aut totam!{' '}
          <Anchor
            // className='text-secondary'
            // disabled
            href='https://www.google.com/'
            onClick={() => {
              alert(
                `Note: Even if href='https://www.google.com/'  is passed, onClick disables the href.`
              )
            }}
            underline='hover'
          >
            google.com
          </Anchor>{' '}
          Ipsam accusamus dolorem obcaecati perferendis animi autem doloremque
          nobis. Quas impedit incidunt perspiciatis, dolorem qui fugiat
          asperiores saepe eligendi temporibus, cum consectetur deleniti?
        </p>

        <Anchor
          // Alternatively, one could use <Button /> and pass as="a"
          className={cn(
            buttonVariants({ variant: 'primary' }),
            'mx-auto table'
          )}
          // disabled
          href='https://www.google.com'
          underline='never'
        >
          google.com
        </Anchor>
      </article>
    </>
  )
}
