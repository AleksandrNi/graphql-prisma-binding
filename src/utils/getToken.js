import jwt from 'jsonwebtoken'
const secret = 'mysecrettoken10'

const getToken = ( userId ) => {

 const toket = jwt.sign({ userId }, secret, { expiresIn: '7 days' })

 return token
}

export { getToken as default }
