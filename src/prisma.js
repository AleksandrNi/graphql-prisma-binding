import { Prisma } from 'prisma-binding';
import  {fragmentReplacements} from './resolvers/index'
const prisma = new Prisma({
  typeDefs: 'prisma/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: 'supersercret4unknownpeople',
  fragmentReplacements
})

export { prisma as default }

// prisma.query, prisma.mutation, prisma.subscription, prisma.exists

//return promise
// prisma.query.users({}, '{ id name email posts { id title } }')
// .then(data => console.log(JSON.stringify(data,undefined, 2)))

// prisma.mutation.createPost({
//   data: {
//     title: "My new Post",
//     body: "One mor post Body",
//     published: true,
//     author: {
//       connect: {
//         id: "cjtvg70i500060749bsor9cil"
//       }
//     }
//   }
// }, '{id title body published author { id name }}')
// .then(data => console.log(JSON.stringify(data,undefined, 2)));

// prisma.mutation.updateUser({
//   data: { name: "kolya" },
//   where: { id: "cjtvg70i500060749bsor9cil" }
// },'{id name posts {id title } }')
// .then(data => console.log(JSON.stringify(data,undefined, 2)));

// const createPostForUser = async (userId, data) => {
//
//   const exists = await prisma.exists.User({  id: userId  })
//   if(!exists) throw new Error('User not found');
//
//   const author  = await prisma.mutation.createPost({
//
//     data: {
//         ...data,
//         author: {
//           connect: {
//             id: userId
//           }
//         }
//     }
//   }, '{  author { id name posts { id title body published } } }')
//   .catch(err => console.error(err));
//
//
//   return author
// };
//
// createPostForUser("cjtvg70i500060749bsor9cil", {
//   title: "One more title right now",
//   body: "body",
//   published: true
// })
// .then(author => console.log(JSON.stringify(author,undefined, 2)) )
// .catch(err => console.error(err));
//
// const updatePostForUser = async (postId, data) => {
//
//   const exists = await prisma.exists.Post({  id: postId  })
//   if(!exists) throw new Error('Post not found');
//
//   const post = await prisma.mutation.updatePost({
//     where: {
//       id: postId
//     },
//     data: {
//       ...data
//     }
//   }, '{ author { id name email posts {id title published } } }')
//   .catch(err => console.error(err));
//
//   return post.author
// }
// updatePostForUser ("cjtvh92ba00080749uumnih08",  {published: false})
// .then(user => console.log(user))
// .catch(err => console.error(err));
