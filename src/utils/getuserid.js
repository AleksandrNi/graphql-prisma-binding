import jwt from 'jsonwebtoken'
const secret = 'mysecrettoken10'

// // key, secret
// const token = jwt.sign({ id: 46 }, 'mysecret')
// console.log(token);
//
// // return { id: 46 }, iat: 1544631516
// const decoded = jwt.decode(token);
// console.log(decoded);
//
// // confirm key was creted by the server
// const verify = jwt.verify(token, 'mysecret')
// console.log(verify);

const getUserId = ( request, secret, requireAuth = true ) => {
  const header = request.request ?
  request.request.headers.authorization :
  request.connemtion.context.Authorization

  // http
  // request.request.headers.authorization

  // websocket
  // request.connemtion.context.Authorization

  if(header) {
    const token = header.replace('Bearer ', '')
    const decoded = jwt.verify(token, secret)

    return decoded.userId
  }

  if(requireAuth) {
    throw new Error('Authentification error')
  }

  return null
}

export { getUserId as default }
