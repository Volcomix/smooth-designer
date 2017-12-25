import { mapStateToProps, mapDispatchToProps } from './DiagramContainer'
import { addBlock } from '../actions/blockActions'

it('maps state to Diagram props', () => {
  expect(mapStateToProps({ blocks: 'Blocks', other: 'Not used' })).toEqual({
    blocks: 'Blocks',
  })
})

it('maps actions to Diagram props', () => {
  const dispatch = jest.fn()
  const props = mapDispatchToProps(dispatch)
  props.onAddClick()
  expect(dispatch).toHaveBeenCalledWith(addBlock())
})
