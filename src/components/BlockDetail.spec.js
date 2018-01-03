//@flow
import React from 'react'
import { shallow, mount } from 'enzyme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import BlockDetail, { type Props } from './BlockDetail'

const setupProps = (): Props => ({
  id: '0',
  name: 'Block',
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  onNameChange: jest.fn(),
  onSizeChange: jest.fn(),
  onLinkStart: jest.fn(),
})

const setup = () => {
  const props = setupProps()
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
      <BlockDetail {...setupProps()} />
    </MuiThemeProvider>,
  )
  expect(document.activeElement).toBe(
    wrapper.find('TextField input').instance(),
  )
})

it('calls onNameChange when the block name changes', () => {
  const { wrapper, props } = setup()
  const cardTitleProps: { title: Object } = wrapper.find('CardTitle').props()
  shallow(<div>{cardTitleProps.title}</div>)
    .find('TextField')
    .simulate('change', {}, 'New name')
  expect(props.onNameChange).toHaveBeenCalledWith('0', 'New name')
})

it('calls onSizeChange when the block size changes', () => {
  const { wrapper, props } = setup()
  wrapper.simulate('sized', { width: 10, height: 20 })
  expect(props.onSizeChange).toHaveBeenCalledWith('0', 10, 20)
})

it('does not call onSizeChange if the size does not change', () => {
  const { wrapper, props } = setup()
  wrapper.simulate('sized', { width: 0, height: 0 })
  expect(props.onSizeChange).not.toHaveBeenCalled()
})

it('calls onLinkStart when the link button is used', () => {
  const { wrapper, props } = setup()
  wrapper
    .find('.BlockDetail-addLink')
    .simulate('mouseDown', { clientX: 10, clientY: 20 })
  expect(props.onLinkStart).toHaveBeenCalledWith('0', {
    clientX: 10,
    clientY: 20,
  })
})
