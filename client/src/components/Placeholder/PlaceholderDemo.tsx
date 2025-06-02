'use client'

import { Placeholder } from './'
import { cn } from '@/utils'

/* ========================================================================

======================================================================== */
// This is a custom Skeleton/Placeholder. It's much better than the default
// ShadCN Skeleton component.

const CardPlaceholder = ({
  animation = 'wave',
  style = {},
  className = ''
}: any) => {
  return (
    <section
      className={cn('bg-background-light border', className)}
      style={{
        borderRadius: 10,
        padding: 15,
        ...style
      }}
    >
      {/* Header */}

      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          gap: '0px 5px',
          marginBottom: 5
        }}
      >
        <Placeholder
          animation={animation}
          style={{
            borderRadius: '50%',
            height: 60,
            width: 60
          }}
        />

        <div style={{ flex: 1 }}>
          <Placeholder
            animation={animation}
            size='lg'
            style={{ marginBottom: 5, width: '70%' }}
          />
          <Placeholder
            animation={animation}
            size='xs'
            style={{ marginBottom: 5 }}
          />
          <Placeholder
            animation={animation}
            size='xs'
            style={{ fontSize: 0, width: '75%' }}
          />
        </div>

        <Placeholder
          animation={animation}
          className='bg-secondary/35'
          style={{
            alignSelf: 'flex-start',
            height: 25,
            width: 60
          }}
        />
      </div>

      {/* Paragraph 1 */}

      <Placeholder
        animation={animation}
        style={{ marginBottom: 8, marginLeft: '5%', width: '95%' }}
      />
      <Placeholder animation={animation} style={{ marginBottom: 8 }} />
      <Placeholder animation={animation} style={{ marginBottom: 8 }} />
      <Placeholder
        animation={animation}
        style={{ marginBottom: 20, width: '75%' }}
      />

      {/* Paragraph 2 */}
      <Placeholder
        animation={animation}
        style={{ marginBottom: 8, marginLeft: '5%', width: '95%' }}
      />

      <Placeholder animation={animation} style={{ marginBottom: 8 }} />
      <Placeholder animation={animation} style={{ marginBottom: 8 }} />
      <Placeholder animation={animation} style={{ marginBottom: 8 }} />
      <Placeholder animation={animation} style={{ width: '35%' }} />

      {/* Bottom Buttons */}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        <Placeholder
          animation={animation}
          className='bg-destructive/35'
          style={{
            marginBottom: 0,
            marginTop: 15,
            height: 30,
            width: 90
          }}
        />

        <Placeholder
          animation={animation}
          className='bg-primary/35'
          style={{
            marginBottom: 0,
            marginTop: 15,
            height: 30,
            width: 90
          }}
        />
      </div>
    </section>
  )
}

/* ========================================================================
                                PlaceholderDemo
======================================================================== */

export const PlaceholderDemo = () => {
  /* ======================
          return
  ====================== */

  return (
    <div
      // [--placeholder-animation-duration:2s]
      className='relative'
      style={{
        margin: '120px auto',
        display: 'table',
        width: 350
      }}
    >
      <CardPlaceholder
        animation='shine'
        style={{
          top: -25,
          left: -50,
          transform: 'rotate(-20deg)'
        }}
        className='absolute w-full'
      />

      <CardPlaceholder
        animation='shine'
        style={{
          top: -12.5,
          left: -25,
          transform: 'rotate(-10deg)'
        }}
        className='absolute w-full'
      />

      <CardPlaceholder
        animation='shine' // 'glow' | 'shine' | 'white-wave' | 'wave'
        className={`relative shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]`}
      />
    </div>
  )
}
