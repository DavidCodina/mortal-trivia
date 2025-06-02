// import { useState } from 'react'

import {
  // Decorator,
  Meta,
  // CSF3: Component Story Format 3
  // https://www.youtube.com/watch?v=P0WHt_L0-2g
  // https://www.youtube.com/watch?v=uH9_dfc-6Kc
  StoryObj
  // StoryFn
  // StoryContext
} from '@storybook/react'

// import { userEvent /* , waitFor */, within, expect, fn } from '@storybook/test'
// import { withActions } from '@storybook/addon-actions/decorator'
// import { action } from '@storybook/addon-actions'
import { Button } from './index'

/* ======================
         meta
====================== */

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button
}

export default meta
type Story = StoryObj<typeof meta>

/* ======================
       Default
====================== */

export const Default: Story = {
  args: {
    children: 'Default Button',
    className: 'my-default-button'
  }
  // parameters: {
  //   actions: {
  //     // Using handles + decorators: [withActions] is an alternate way of detecting actions/events.
  //     // https://storybook.js.org/docs/essentials/actions#action-event-handlers
  //     handles: ['mouseover', 'mousedown', 'pointerdown .my-default-button']
  //   }
  // },
  // decorators: [withActions]
}
