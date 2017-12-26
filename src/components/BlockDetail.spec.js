import React from 'react'
import { shallow } from 'enzyme'
import BlockDetail from './BlockDetail'

const setup = setupProps => {
  const defaultProps = {
    name: 'Block',
  }
  const props = { ...defaultProps, ...setupProps }
  const wrapper = shallow(<BlockDetail {...props} />)
  return { wrapper, props }
}

it('renders without crashing', () => {
  const { wrapper } = setup()
  expect(wrapper).toMatchSnapshot()
})
