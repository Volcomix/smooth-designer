import React from 'react'
import { shallow } from 'enzyme'
import Diagram from './Diagram'

it('renders without crashing', () => {
  shallow(<Diagram />)
})
