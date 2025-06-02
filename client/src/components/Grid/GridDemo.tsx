'use client'

import * as React from 'react'
import { Grid, GridItem } from '@/components/Grid'

/* ========================================================================

======================================================================== */

export const GridDemo = () => {
  // Basic Example
  // return (
  //   <Grid
  //     gap={15}
  //     gridAutoRows={'minmax(50px, auto)'}
  //     gridTemplateColumns={3}
  //     // style={{ outline: '2px dashed red' }}
  //   >
  //     {[...Array(12)].map((_n, index) => {
  //       return (
  //         <GridItem
  //           gridColumn={'auto / auto'}
  //           className='bg-background-light border'
  //           key={index}
  //           style={
  //             {
  //               // outline: '2px dashed red'
  //             }
  //           }
  //         ></GridItem>
  //       )
  //     })}
  //   </Grid>
  // )

  // Single Subgrid Column

  // In many cases you'll want to create a subgrid having a single column and multiple <code>GridItem</code>s such
  // that each <code>GridItem</code> takes up the entire width of the subgrid, but also has
  // a row gap. Because the <code>Grid</code> defaults to 12 columns, and each Grid Item also
  // defaults to 12 columns, this becomes as simple as setting <code>gap: '15px 0px'</code>.
  // return (
  //   <Grid gap={'15px 0px'}>
  //     {[...Array(4)].map((_n, index) => {
  //       return (
  //         <GridItem
  //           key={index}
  //           className='bg-background-light text-primary flex min-h-[50px] items-center justify-center border font-bold'
  //           style={{}}
  //         >
  //           {index + 1}
  //         </GridItem>
  //       )
  //     })}
  //   </Grid>
  // )

  // Wrapping Items
  return (
    <Grid gap={15} cols={'repeat(auto-fill, minmax(150px, 1fr))'}>
      {[...Array(12)].map((_n, index) => {
        return (
          <GridItem
            // gridColumn='auto / auto'
            className='bg-background-light flex items-center justify-center border text-sm'
            key={index}
          >
            {`Item ${index + 1}`}
          </GridItem>
        )
      })}
    </Grid>
  )
}
