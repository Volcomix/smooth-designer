import React from 'react'
import { shallow } from 'enzyme'
import BlockDetail from './BlockDetail'

it('renders without crashing', () => {
  shallow(<BlockDetail />)
  shallow(<BlockDetail name="" />)
  shallow(<BlockDetail name="Block" />)
})
