//@flow
import React from 'react'
import { shallow, mount } from 'enzyme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import BlockDetail, { type Props } from './BlockDetail'

const defaultProps: Props = {
  id: '0',
  name: 'Block',
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  onNameChange: jest.fn(),
  onSizeChange: jest.fn(),
}

const setup = (setupProps?: Props) => {
  const props = { ...defaultProps, ...setupProps }
  const wrapper = shallow(<BlockDetail {...props} />)
  return { wrapper, props }
}

it('renders without crashing', () => {
  const { wrapper } = setup()
  expect(wrapper).toMatchSnapshot()
})

it('focus name field when the block is added', () => {
  const wrapper = mount(
    <MuiThemeProvider>
      <BlockDetail {...defaultProps} />
    </MuiThemeProvider>,
  )
  const nameField: { input: HTMLInputElement } = wrapper
    .find('TextField.BlockDetail-nameInput')
    .instance()
  expect(document.activeElement).toBe(nameField.input)
})

it('calls onNameChange when the block name change', () => {
  const { wrapper, props } = setup()
  const cardTitleProps: { title: Object } = wrapper.find('CardTitle').props()
  shallow(<div>{cardTitleProps.title}</div>)
    .find('.BlockDetail-nameInput')
    .simulate('change', {}, 'New name')
  expect(props.onNameChange).toHaveBeenCalledWith('0', 'New name')
})

it('calls onSizeChange when the block has been sized', () => {
  const { wrapper, props } = setup()
  wrapper.simulate('sized', { width: 10, height: 20 })
  expect(props.onSizeChange).toHaveBeenCalledWith('0', 10, 20)
})
