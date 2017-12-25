import reducer from '.'

it('combines all reducers', () => {
  expect(reducer(undefined, {})).toEqual({ blocks: [] })
})
