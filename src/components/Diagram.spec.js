//@flow
import React from 'react'
import { shallow } from 'enzyme'
import Diagram, { type Props } from './Diagram'

const setup = setupProps => {
  const defaultProps: Props = {
    blocks: [],
    links: [],
    linking: undefined,
    onAddClick: jest.fn(),
    onBlockDelete: jest.fn(),
    onNameChange: jest.fn(),
    onSizeChange: jest.fn(),
    onLinkStart: jest.fn(),
    onLinkMove: jest.fn(),
    onLinkEnd: jest.fn(),
    onLinkCancel: jest.fn(),
    onLinkDelete: jest.fn(),
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
        { id: '0', name: 'Block 1', x: 0, y: 0, width: 10, height: 20 },
        { id: '1', name: 'Block 2', x: 0, y: 0, width: 30, height: 40 },
      ],
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('renders a link if linking', () => {
    const { wrapper } = setup({
      blocks: [{ id: '0', name: 'Block', x: 0, y: 0, width: 10, height: 20 }],
      linking: {
        fromBlock: {
          id: '0',
          name: 'Block',
          x: 1,
          y: 2,
          width: 0,
          height: 0,
        },
        toMouse: { x: 10, y: 20 },
      },
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('calls onBlockDelete when a block is deleted', () => {
    const { wrapper, props } = setup({
      blocks: [
        { id: '0', name: 'Block 1', x: 0, y: 0, width: 0, height: 0 },
        { id: '1', name: 'Block 2', x: 0, y: 0, width: 0, height: 0 },
      ],
    })
    wrapper
      .find('BlockDetail')
      .first()
      .simulate('delete', '0')
    expect(props.onBlockDelete).toHaveBeenCalledWith('0')
  })

  it('calls onNameChange when a block name changes', () => {
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

  it('calls onSizeChange when a block size changes', () => {
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

  it('calls onLinkStart when linking starts', () => {
    const { wrapper, props } = setup({
      blocks: [
        { id: '0', name: 'Block 1', x: 0, y: 0, width: 0, height: 0 },
        { id: '1', name: 'Block 2', x: 0, y: 0, width: 0, height: 0 },
      ],
    })
    wrapper
      .find('BlockDetail')
      .first()
      .simulate('linkStart', '0', 10, 20)
    expect(props.onLinkStart).toHaveBeenCalledWith('0', 10, 20)
  })

  it('calls onLinkMove when linking moves', () => {
    const { wrapper, props } = setup({
      blocks: [
        { id: '0', name: 'Block 1', x: 0, y: 0, width: 0, height: 0 },
        { id: '1', name: 'Block 2', x: 0, y: 0, width: 0, height: 0 },
      ],
      linking: {
        fromBlock: {
          id: '0',
          name: 'Block 1',
          x: 0,
          y: 0,
          width: 0,
          height: 0,
        },
        toMouse: { x: 10, y: 20 },
      },
    })
    wrapper.simulate('mouseMove', 30, 40)
    expect(props.onLinkMove).toHaveBeenCalledWith(30, 40)
  })

  it('calls onLinkEnd when linking ends', () => {
    const { wrapper, props } = setup({
      blocks: [
        { id: '0', name: 'Block 1', x: 0, y: 0, width: 0, height: 0 },
        { id: '1', name: 'Block 2', x: 0, y: 0, width: 0, height: 0 },
      ],
      linking: {
        fromBlock: {
          id: '1',
          name: 'Block 1',
          x: 0,
          y: 0,
          width: 0,
          height: 0,
        },
        toMouse: { x: 10, y: 20 },
      },
    })
    wrapper
      .find('BlockDetail')
      .first()
      .simulate('linkEnd', '0')
    expect(props.onLinkEnd).toHaveBeenCalledWith('0')
  })

  it('calls onLinkCancel when the mouse is up', () => {
    const { wrapper, props } = setup({
      blocks: [
        { id: '0', name: 'Block 1', x: 0, y: 0, width: 0, height: 0 },
        { id: '1', name: 'Block 2', x: 0, y: 0, width: 0, height: 0 },
      ],
      linking: {
        fromBlock: {
          id: '1',
          name: 'Block 1',
          x: 0,
          y: 0,
          width: 0,
          height: 0,
        },
        toMouse: { x: 10, y: 20 },
      },
    })
    const spy = jest.spyOn(document.activeElement || {}, 'blur')
    wrapper.simulate('mouseUp')
    expect(spy).toHaveBeenCalled()
    expect(props.onLinkCancel).toHaveBeenCalled()
  })
})

describe('with links', () => {
  it('renders the links', () => {
    const { wrapper } = setup({
      blocks: [
        { id: '0', name: 'Block 1', x: 0, y: 0, width: 10, height: 20 },
        { id: '1', name: 'Block 2', x: 0, y: 0, width: 30, height: 40 },
        { id: '2', name: 'Block 3', x: 0, y: 0, width: 50, height: 60 },
      ],
      links: [
        {
          id: '0',
          fromBlock: {
            id: '0',
            name: 'Block 1',
            x: 0,
            y: 0,
            width: 10,
            height: 20,
          },
          toBlock: {
            id: '1',
            name: 'Block 2',
            x: 0,
            y: 0,
            width: 30,
            height: 40,
          },
        },
        {
          id: '1',
          fromBlock: {
            id: '1',
            name: 'Block 2',
            x: 0,
            y: 0,
            width: 30,
            height: 40,
          },
          toBlock: {
            id: '2',
            name: 'Block 3',
            x: 0,
            y: 0,
            width: 50,
            height: 60,
          },
        },
      ],
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('calls onLinkDelete when a link is deleted', () => {
    const { wrapper, props } = setup({
      blocks: [
        { id: '0', name: 'Block 1', x: 0, y: 0, width: 0, height: 0 },
        { id: '1', name: 'Block 2', x: 0, y: 0, width: 0, height: 0 },
        { id: '2', name: 'Block 3', x: 0, y: 0, width: 0, height: 0 },
      ],
      links: [
        {
          id: '0',
          fromBlock: {
            id: '0',
            name: 'Block 1',
            x: 0,
            y: 0,
            width: 0,
            height: 0,
          },
          toBlock: {
            id: '1',
            name: 'Block 2',
            x: 0,
            y: 0,
            width: 0,
            height: 0,
          },
        },
        {
          id: '1',
          fromBlock: {
            id: '1',
            name: 'Block 2',
            x: 0,
            y: 0,
            width: 0,
            height: 0,
          },
          toBlock: {
            id: '2',
            name: 'Block 3',
            x: 0,
            y: 0,
            width: 0,
            height: 0,
          },
        },
      ],
    })
    wrapper
      .find('LinkDetail')
      .first()
      .simulate('delete', '0')
    expect(props.onLinkDelete).toHaveBeenCalledWith('0')
  })
})
