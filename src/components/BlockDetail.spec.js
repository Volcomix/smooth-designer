//@flow
import React from 'react'
import { shallow, mount } from 'enzyme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import BlockDetail, { type Props } from './BlockDetail'

const props: Props = {
  id: '0',
  name: 'Block',
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  onNameChange: jest.fn(),
  onSizeChange: jest.fn(),
}

it('renders without crashing', () => {
  const wrapper = shallow(<BlockDetail {...props} />)
  expect(wrapper).toMatchSnapshot()
})

it('focus name field when the block is added', () => {
  const wrapper = mount(
    <MuiThemeProvider>
      <BlockDetail {...props} />
    </MuiThemeProvider>,
  )
  expect(document.activeElement).toBe(
    wrapper.find('TextField input').instance(),
  )
})

it('calls onNameChange when the block name changes', () => {
  const wrapper = shallow(<BlockDetail {...props} />)
  const cardTitleProps: { title: Object } = wrapper.find('CardTitle').props()
  shallow(<div>{cardTitleProps.title}</div>)
    .find('TextField')
    .simulate('change', {}, 'New name')
  expect(props.onNameChange).toHaveBeenCalledWith('0', 'New name')
})

it('calls onSizeChange when the block has been sized', () => {
  const wrapper = shallow(<BlockDetail {...props} />)
  wrapper.simulate('sized', { width: 10, height: 20 })
  expect(props.onSizeChange).toHaveBeenCalledWith('0', 10, 20)
})
