import {Meta} from '@storybook/react/types-6-0'

import Alert from './Alert'

export default {
  title: 'Alert',
  component: Alert,
} as Meta

const Template = args => (
  <div className="flex items-center justify-center min-h-screen">
    <Alert {...args} />
  </div>
)

export const Basic = Template.bind({})

Basic.args = {
  type: 'warning',
  children:
    "Creating your Death Star can take around an hour. We'll email you when it’s ready!",
}
