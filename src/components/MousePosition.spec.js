//@flow
import React from 'react'
import { shallow, mount } from 'enzyme'
import MousePosition, { type Props } from './MousePosition'

const defaultProps = (): Props => ({
  isActive: true,
  onMouseMove: jest.fn(),
  onMouseUp: jest.fn(),
})

const setup = setupProps => {
  const props: Props = { ...defaultProps(), ...setupProps }
  const wrapper = mount(<MousePosition {...props} />)
  const instance: MousePosition = wrapper.instance()
  if (instance.container) {
    jest
      .spyOn(instance.container, 'getBoundingClientRect')
      .mockImplementation(() => ({ width: 800, height: 600 }))
  }
  return { wrapper, props }
}

it('renders without crashing', () => {
  const wrapper = shallow(
    <MousePosition {...defaultProps()} className="MousePosition">
      <div id="content" />
    </MousePosition>,
  )
  expect(wrapper).toMatchSnapshot()
})

describe('if isActive is true', () => {
  it('calls onMouseMove when the mouse moves', () => {
    const { wrapper, props } = setup()
    wrapper.simulate('mouseMove', { clientX: 410, clientY: 320 })
    expect(props.onMouseMove).toHaveBeenCalledWith(10, 20)
  })

  it('calls onMouseUp when the mouse button is released', () => {
    const { wrapper, props } = setup()
    wrapper.simulate('mouseUp')
    expect(props.onMouseUp).toHaveBeenCalled()
  })
})

describe('if isActive is false', () => {
  it('does not call onMouseMove when the mouse moves', () => {
    const { wrapper, props } = setup({ isActive: false })
    wrapper.simulate('mouseMove', { clientX: 410, clientY: 320 })
    expect(props.onMouseMove).not.toHaveBeenCalled()
  })

  it('does not call onMouseUp when the mouse button is release', () => {
    const { wrapper, props } = setup({ isActive: false })
    wrapper.simulate('mouseUp')
    expect(props.onMouseUp).not.toHaveBeenCalled()
  })
})
