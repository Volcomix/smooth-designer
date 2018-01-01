//@flow
import React from 'react'
import { shallow, mount } from 'enzyme'
import Sized, { type Props } from './Sized'

const setupProps = (): Props => ({
  onSized: jest.fn(),
})

const setup = () => {
  const props = setupProps()
  const wrapper = mount(<Sized {...props} />)
  return { wrapper, props }
}

it('renders without crashing', () => {
  const wrapper = shallow(
    <Sized {...setupProps()}>
      <div id="content" />
    </Sized>,
  )
  expect(wrapper).toMatchSnapshot()
})

it('calls onSized when mounted', () => {
  const { props } = setup()
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
  const { wrapper, props } = setup()
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
