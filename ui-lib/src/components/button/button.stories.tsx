// Button.stories.ts|tsx

import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Button from './button'

export default {
  title: 'Button',
  component: Button
} as ComponentMeta<typeof Button>

const ButtonTemplate: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Link = ButtonTemplate.bind({});
Link.args = {
  link: '/',
  title:'this is a link button'
}
export const Primary = ButtonTemplate.bind({});
Primary.args = {
  onClick: () => {
    return;
  },
  title: 'this is a button'
}

