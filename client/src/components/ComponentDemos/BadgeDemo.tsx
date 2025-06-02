'use client'
import Link from 'next/link'
import { Badge, badgeVariants } from '@/components/badge'
import {
  Cat,
  CircleCheck,
  CircleAlert,
  Info,
  Rocket,
  TriangleAlert
} from 'lucide-react'

/* ========================================================================
                                    BadgeDemo
======================================================================== */

export const BadgeDemo = () => {
  /* ======================
          return
  ====================== */

  return (
    <>
      <section className='bg-background-light mx-auto mb-6 rounded-lg border p-4 shadow'>
        <h2 className='text-primary mb-4 font-bold'>Custom Colors:</h2>
        <div className='flex flex-wrap items-center justify-center gap-4'>
          {/* Primary / Default */}
          <Badge variant='primary'>
            <Rocket />
            Primary
          </Badge>

          {/* Secondary */}
          <Badge variant='secondary'>
            <Cat />
            Secondary
          </Badge>

          {/* Info */}
          <Badge variant='info'>
            <Info />
            Info
          </Badge>

          {/* Success */}
          <Badge variant='success'>
            <CircleCheck />
            Success
          </Badge>

          {/* Success */}
          <Badge variant='warning'>
            <CircleAlert />
            Warning
          </Badge>

          {/* Destructive */}
          <Badge variant='destructive'>
            <TriangleAlert /> Destructive
          </Badge>
        </div>
      </section>

      <section className='bg-background-light mx-auto mb-6 rounded-lg border p-4 shadow'>
        <h2 className='text-primary mb-4 font-bold'>Custom Colors (Links):</h2>
        <div className='flex flex-wrap items-center justify-center gap-4'>
          {/* You can use the badgeVariants helper to create a link that looks like a badge. */}

          <Link href='/' className={badgeVariants({ variant: 'primary' })}>
            Primary Link
          </Link>

          <Link href='/' className={badgeVariants({ variant: 'secondary' })}>
            Secondary Link
          </Link>

          <Link href='/' className={badgeVariants({ variant: 'info' })}>
            Info Link
          </Link>

          <Link href='/' className={badgeVariants({ variant: 'success' })}>
            Success Link
          </Link>

          <Link href='/' className={badgeVariants({ variant: 'warning' })}>
            Warning Link
          </Link>

          <Link href='/' className={badgeVariants({ variant: 'destructive' })}>
            Destructive Link
          </Link>
        </div>
      </section>

      <section className='bg-background-light mx-auto mb-6 rounded-lg border p-4 shadow'>
        <h2 className='text-primary mb-4 font-bold'>Tailwind Colors:</h2>

        <div className='flex flex-wrap items-center justify-center gap-4'>
          <Badge variant='red'>Red Badge</Badge>
          <Badge variant='orange'>Orange Badge</Badge>
          <Badge variant='amber'>Amber Badge</Badge>
          <Badge variant='yellow'>Yellow Badge</Badge>
          <Badge variant='lime'>Lime Badge</Badge>
          <Badge variant='green'>Green Badge</Badge>
          <Badge variant='emerald'>Emerald Badge</Badge>
          <Badge variant='teal'>Teal Badge</Badge>
          <Badge variant='cyan'>Cyan Badge</Badge>
          <Badge variant='sky'>Sky Badge</Badge>
          <Badge variant='blue'>Blue Badge</Badge>
          <Badge variant='indigo'>Indigo Badge</Badge>
          <Badge variant='violet'>Violet Badge</Badge>
          <Badge variant='purple'>Purple Badge</Badge>
          <Badge variant='fuchsia'>Fuchsia Badge</Badge>
          <Badge variant='pink'>Pink Badge</Badge>
          <Badge variant='rose'>Rose Badge</Badge>
          <Badge variant='slate'>Slate Badge</Badge>
          <Badge variant='gray'>Gray Badge</Badge>
          <Badge variant='zinc'>Zinc Badge</Badge>
          <Badge variant='neutral'>Neutral Badge</Badge>
          <Badge variant='stone'>Stone Badge</Badge>
        </div>
      </section>
    </>
  )
}
