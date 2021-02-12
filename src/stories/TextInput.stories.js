import React from 'react'
import TextInput from "../components/layout/inputs/TextInput/TextInput"


export default {
  title: 'Example/TextInput',
  component: TextInput,
}

const Template = (args) => <TextInput {...args} />

export const Primary = Template.bind({})
