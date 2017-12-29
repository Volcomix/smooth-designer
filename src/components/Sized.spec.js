//@flow
import React from 'react'
import { mount } from 'enzyme'
import Sized from './Sized'

it('returns its children bounding rectangle', () => {
  const onSized = jest.fn()
  const wrapper = mount(
    <Sized onSized={onSized}>
      <div id="content" />
    </Sized>,
  )
  expect(wrapper.find('#content').exists()).toBeTruthy()
  expect(onSized).toHaveBeenCalledWith({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
  })
})
