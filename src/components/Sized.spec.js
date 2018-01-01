//@flow
import React from 'react'
import { shallow, mount } from 'enzyme'
import Sized, { type Props } from './Sized'

const props: Props = {
  onSized: jest.fn(),
}

it('renders without crashing', () => {
  const wrapper = shallow(
    <Sized {...props}>
      <div id="content" />
    </Sized>,
  )
  expect(wrapper).toMatchSnapshot()
})

it('calls onSized when mounted', () => {
  mount(<Sized {...props} />)
  expect(props.onSized).toHaveBeenCalledWith({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
  })
})

it('calls onSized when the focus is lost', () => {
  const wrapper = mount(<Sized {...props} />)
  props.onSized.mockClear()
  wrapper.simulate('blur')
  expect(props.onSized).toHaveBeenCalledWith({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
  })
})
