import React from 'react'
import { shallow } from 'enzyme'
import Diagram from './Diagram'

it('renders without crashing', () => {
  shallow(<Diagram blocks={[]} />)
  shallow(<Diagram blocks={[{ name: 'Block' }]} />)
  shallow(<Diagram blocks={[{ name: 'Block 1' }, { name: 'Block 2' }]} />)
})
