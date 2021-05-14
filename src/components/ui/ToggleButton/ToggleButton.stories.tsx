import {Meta} from '@storybook/react/types-6-0'

import ToggleButton from './ToggleButton'

export default {
  title: 'Front-End/Toggle Button',
  component: ToggleButton,
} as Meta

const Template = (args: Parameters<typeof ToggleButton>[0]) => (
  <div className="flex items-center justify-center min-h-screen">
    <ToggleButton {...args} />
  </div>
)

export const Basic = Template.bind({})

Basic.args = {
  children: '2017',
}
