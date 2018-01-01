//@flow
import React from 'react'
import { shallow, mount } from 'enzyme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField, { type Props } from './TextField'

const props: Props = {
  hintText: 'A value',
  value: 'TextField value',
  onChange: jest.fn(),
  inputRef: jest.fn(),
}

it('renders without crashing', () => {
  const wrapper = shallow(<TextField {...props} />)
  expect(wrapper).toMatchSnapshot()
})

it('calls onChange when the input value changes', () => {
  const wrapper = shallow(<TextField {...props} />)
  wrapper.find('.TextField-input').simulate('change', {}, 'New value')
  expect(props.onChange).toHaveBeenCalledWith({}, 'New value')
})

it('gets the input ref', () => {
  const wrapper = mount(
    <MuiThemeProvider>
      <TextField {...props} />
    </MuiThemeProvider>,
  )
  expect(props.inputRef).toHaveBeenCalledWith(
    wrapper.find('TextField.TextField-input').instance(),
  )
})
