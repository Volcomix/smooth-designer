//@flow
import React from 'react'
import { shallow } from 'enzyme'
import Diagram from './Diagram'

const setup = setupProps => {
  const defaultProps = {
    blocks: [],
    onAddClick: jest.fn(),
    onNameChange: jest.fn(),
    onSizeChange: jest.fn(),
  }
  const props = { ...defaultProps, ...setupProps }
  const wrapper = shallow(<Diagram {...props} />)
  return { wrapper, props }
}

it('renders without crashing', () => {
  const { wrapper } = setup()
  expect(wrapper).toMatchSnapshot()
})

it('calls onAddClick when the Add button is clicked', () => {
  const { wrapper, props } = setup()
  wrapper.find('.Diagram-add').simulate('click')
  expect(props.onAddClick).toHaveBeenCalled()
})

describe('with blocks', () => {
  it('renders the blocks', () => {
    const { wrapper } = setup({
      blocks: [
        { id: '0', name: 'Block 1', x: 0, y: 0, width: 0, height: 0 },
        { id: '1', name: 'Block 2', x: 0, y: 0, width: 0, height: 0 },
      ],
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('calls onNameChange when a block name change', () => {
    const { wrapper, props } = setup({
      blocks: [
        { id: '0', name: 'Block 1', x: 0, y: 0, width: 0, height: 0 },
        { id: '1', name: 'Block 2', x: 0, y: 0, width: 0, height: 0 },
      ],
    })
    wrapper
      .find('BlockDetail')
      .first()
      .simulate('nameChange', '0', 'New name')
    expect(props.onNameChange).toHaveBeenCalledWith('0', 'New name')
  })

  it('calls onSizeChange when a block size change', () => {
    const { wrapper, props } = setup({
      blocks: [
        { id: '0', name: 'Block 1', x: 0, y: 0, width: 0, height: 0 },
        { id: '1', name: 'Block 2', x: 0, y: 0, width: 0, height: 0 },
      ],
    })
    wrapper
      .find('BlockDetail')
      .first()
      .simulate('sizeChange', '0', 10, 20)
    expect(props.onSizeChange).toHaveBeenCalledWith('0', 10, 20)
  })
})
