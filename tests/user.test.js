import { getFirstName }  from '../src/utils/user.js'
// name, cb
test('Should return first name when given full name', () => {
  const family = getFirstName('Aleksandr')

  expect(family).toBe('Nikitin')

})
