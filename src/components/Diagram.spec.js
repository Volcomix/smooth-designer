//@flow
import React from 'react'
import { shallow } from 'enzyme'
import Diagram from './Diagram'

const setup = setupProps => {
  const defaultProps = { blocks: [], onAddClick: jest.fn() }
  const props = { ...defaultProps, ...setupProps }
  const wrapper = shallow(<Diagram {...props} />)
  return { wrapper, props }
}

describe('without blocks', () => {
  const { wrapper, props } = setup()

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('calls onAddClick when the Add button is clicked', () => {
    wrapper.find('.Diagram-add').simulate('click')
    expect(props.onAddClick).toHaveBeenCalled()
  })
})

describe('with blocks', () => {
  const { wrapper } = setup({
    blocks: [
      { id: '0', name: 'Block 1', x: 0, y: 0 },
      { id: '1', name: 'Block 2', x: 0, y: 0 },
    ],
  })

  it('renders the blocks', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
