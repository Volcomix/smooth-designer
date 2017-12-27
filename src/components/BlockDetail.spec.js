//@flow
import React from 'react'
import { shallow } from 'enzyme'
import BlockDetail, { type Props } from './BlockDetail'

const setup = (setupProps?: Props) => {
  const defaultProps: Props = { name: 'Block', x: 0, y: 0 }
  const props = { ...defaultProps, ...setupProps }
  const wrapper = shallow(<BlockDetail {...props} />)
  return { wrapper, props }
}

it('renders without crashing', () => {
  const { wrapper } = setup()
  expect(wrapper).toMatchSnapshot()
})
