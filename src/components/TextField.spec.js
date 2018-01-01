//@flow
import React from 'react'
import { shallow, mount } from 'enzyme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField, { type Props } from './TextField'

const setupProps = (): Props => ({
  hintText: 'A value',
  value: 'TextField value',
  onChange: jest.fn(),
  inputRef: jest.fn(),
})

const setup = () => {
  const props = setupProps()
  const wrapper = shallow(<TextField {...props} />)
  return { wrapper, props }
}

it('renders without crashing', () => {
  const { wrapper } = setup()
  expect(wrapper).toMatchSnapshot()
})

it('calls onChange when the input value changes', () => {
  const { wrapper, props } = setup()
  wrapper.find('.TextField-input').simulate('change', {}, 'New value')
  expect(props.onChange).toHaveBeenCalledWith({}, 'New value')
})

it('gets the input ref', () => {
  const props = setupProps()
  const wrapper = mount(
    <MuiThemeProvider>
      <TextField {...props} />
    </MuiThemeProvider>,
  )
  expect(props.inputRef).toHaveBeenCalledWith(
    wrapper.find('TextField.TextField-input').instance(),
  )
})
