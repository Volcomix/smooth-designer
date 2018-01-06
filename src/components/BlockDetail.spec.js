//@flow
import React, { type ComponentType } from 'react'
import { shallow, mount } from 'enzyme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import BlockDetail, { type Props } from './BlockDetail'

const defaultProps = (): Props => ({
  id: '0',
  name: 'Block',
  x: 10,
  y: 20,
  width: 0,
  height: 0,
  isLinking: false,
  onDelete: jest.fn(),
  onNameChange: jest.fn(),
  onSizeChange: jest.fn(),
  onLinkStart: jest.fn(),
  onLinkEnd: jest.fn(),
})

const setup = setupProps => {
  const props: Props = { ...defaultProps(), ...setupProps }
  const wrapper = shallow(<BlockDetail {...props} />)
  return { wrapper, props }
}

it('renders without crashing', () => {
  const { wrapper } = setup()
  expect(wrapper).toMatchSnapshot()
})

it('renders an overflow menu with a custom elevation', () => {
  const { wrapper } = setup()
  const {
    animation: Animation,
    open,
    targetOrigin,
  }: {
    animation: ComponentType<{}>,
    open: {},
    targetOrigin: {},
  } = wrapper.find('.BlockDetail-menu').props()
  const animationWrapper = shallow(
    <Animation open={!!open} targetOrigin={targetOrigin} />,
  )
  expect(animationWrapper).toMatchSnapshot()
})

it('renders with a specific style if linking', () => {
  const { wrapper } = setup({ isLinking: true })
  expect(wrapper).toMatchSnapshot()
})

it('focus name field when the block is added', () => {
  const wrapper = mount(
    <MuiThemeProvider>
      <BlockDetail {...defaultProps()} />
    </MuiThemeProvider>,
  )
  expect(document.activeElement).toBe(
    wrapper.find('TextField input').instance(),
  )
})

it('calls onDelete when the delete menu is clicked', () => {
  const { wrapper, props } = setup()
  wrapper.find('.BlockDetail-delete').simulate('click')
  expect(props.onDelete).toHaveBeenCalledWith('0')
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
  wrapper.find('.BlockDetail-addLink').simulate('mouseDown')
  expect(props.onLinkStart).toHaveBeenCalledWith('0', 10, 20)
})

it('calls onLinkEnd if linking and mouse is up', () => {
  const { wrapper, props } = setup({ isLinking: true })
  wrapper.find('.BlockDetail-card').simulate('mouseUp')
  expect(props.onLinkEnd).toHaveBeenCalledWith('0')
})

it('does not call onLinkEnd if not linking', () => {
  const { wrapper, props } = setup()
  wrapper.find('.BlockDetail-card').simulate('mouseUp')
  expect(props.onLinkEnd).not.toHaveBeenCalled()
})
