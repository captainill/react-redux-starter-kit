import reducer, { initialState } from 'redux/modules/Posts'

describe('(Redux) Posts', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState)
    })
  })
})
