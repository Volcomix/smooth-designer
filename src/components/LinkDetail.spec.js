//@flow
import React, { type ComponentType } from 'react'
import { shallow } from 'enzyme'
import LinkDetail, { type Props } from './LinkDetail'

const setup = setupProps => {
  const defaultProps: Props = {
    id: '0',
    fromBlock: { id: '0', name: 'Block 1', x: 10, y: 30, width: 0, height: 0 },
    toBlock: { id: '1', name: 'Block 2', x: 20, y: 40, width: 0, height: 0 },
    onDelete: jest.fn(),
  }
  const props: Props = { ...defaultProps, ...setupProps }
  const wrapper = shallow(<LinkDetail {...props} />)
  return { wrapper, props }
}

it('renders without crashing', () => {
  const { wrapper } = setup()
  expect(wrapper).toMatchSnapshot()
})

it('renders without crashing when inverted', () => {
  const { wrapper } = setup({
    fromBlock: { id: '0', name: 'Block 1', x: 20, y: 40, width: 0, height: 0 },
    toBlock: { id: '1', name: 'Block 2', x: 10, y: 30, width: 0, height: 0 },
  })
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
  } = wrapper.find('.LinkDetail-menu').props()
  const animationWrapper = shallow(
    <Animation open={!!open} targetOrigin={targetOrigin} />,
  )
  expect(animationWrapper).toMatchSnapshot()
})

it('calls onDelete when the delete menu is clicked', () => {
  const { wrapper, props } = setup()
  wrapper.find('.LinkDetail-delete').simulate('click')
  expect(props.onDelete).toHaveBeenCalledWith('0')
})
