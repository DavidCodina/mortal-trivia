'use client'

import { Button } from '@/components'
import { ButtonGroup } from '@/components/ButtonGroup'

/* ========================================================================

======================================================================== */

export const ButtonGroupDemo = () => {
  return (
    <>
      <section className='mx-auto mb-6 flex justify-center'>
        <ButtonGroup>
          <Button variant='secondary'>Button 1</Button>
          <Button variant='secondary'>Button 2</Button>
          <Button variant='secondary'>Button 3</Button>
        </ButtonGroup>
      </section>

      <section className='mx-auto mb-6 flex justify-center'>
        <ButtonGroup size='md' orientation='vertical'>
          <Button variant='secondary'>Button 1</Button>
          <Button variant='secondary'>Button 2</Button>
          <Button variant='secondary'>Button 3</Button>
        </ButtonGroup>
      </section>
    </>
  )
}
