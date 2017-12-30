//@flow
import React from 'react'
import { shallow } from 'enzyme'
import BlockDetail, { type Props } from './BlockDetail'

const setup = (setupProps?: Props) => {
  const defaultProps = {
    id: '0',
    name: 'Block',
    x: 0,
    y: 0,
    onNameChange: jest.fn(),
    onSizeChange: jest.fn(),
  }
  const props = { ...defaultProps, ...setupProps }
  const wrapper = shallow(<BlockDetail {...props} />)
  return { wrapper, props }
}

it('renders without crashing', () => {
  const { wrapper } = setup()
  expect(wrapper).toMatchSnapshot()
})

it('calls onNameChange when the block name change', () => {
  const { wrapper, props } = setup()
  shallow(<div>{wrapper.find('CardTitle').props().title}</div>)
    .find('TextField')
    .simulate('change', {}, 'New name')
  expect(props.onNameChange).toHaveBeenCalledWith('0', 'New name')
})

it('calls onSizeChange when the block has been sized', () => {
  const { wrapper, props } = setup()
  wrapper.simulate('sized', { width: 10, height: 20 })
  expect(props.onSizeChange).toHaveBeenCalledWith('0', 10, 20)
})
