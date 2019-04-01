// import { Prisma } from 'prisma-binding';
//
// const prisma = new Prisma({
//   typeDefs: 'prisma-review-website/generated/prisma.graphql',
//   endpoint: 'http://192.168.99.100:4466/reviews/default'
// })

//create Book

// const createBook = async (data) => {
//   const book = await prisma.mutation.createBook ({
//     data: {
//       ...data
//     }
//   }, '{id title author isbn}')
//
//   return book
// }

// id: ID!
// title: String!
// author: String!
// isbn: ID!
// reviews

// createBook ({
//   title: "My first book",
//   author: "Sasha N",
//   isbn: "123456"
// })
// .then(book => console.log(book))
// .catch(err => console.error(err));
//
// //create User
//
// const createUser = async (data) => {
//   const user = await prisma.mutation.createUser({
//     data: {
//     ...data
//   }}, '{id username}')
//
//   return user
// }

// id: ID! @unique
// username: String!
// reviews

// createUser ({
//   username: "Sasha Nikitin"
// })
// .then(user => console.log(user))
// .catch(err => console.error(err));
//
// createUser ({
//   username: "Ksyusha Kondratenko"
// })
// .then(user => console.log(user))
// .catch(err => console.error(err));

// create Review

// const createReview = async (userId, bookId, data) => {
//
//   const userExists = prisma.exists.User( { id: userId } )
//   const bookExists = prisma.exists.Book( { id: bookId } )
//   if (!userExists || !bookExists) throw new Error('User or book not found')
//
//   const review = await prisma.mutation.createReview({
//     data: {
//       ...data,
//       book: {
//         connect: {
//           id: bookId
//         }
//       },
//       author: {
//         connect: {
//           id: userId
//         }
//       }
//     }
//   },'{id text rating book { id title } user { id username }}')
//
//   return review
// }

// id: ID! @unique
// text: String!
// rating: Float
// book: Book!
// user: User!

// createReview ("","",{
//   text: "First review",
//   rating: 4.3,
// })
// .then(review => console.log(review))
// .catch(err => console.error(err));
