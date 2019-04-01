import getUserId from '../utils/getuserid'
const User = {
  email: {
    fragment: 'fragment userId on User { id } ',
    resolve(parent, args, {prisma, request}, info ) {
      const userId = getUserId(request)
      if(userId && userId === parent.id) {
        return parent.email
      } else {
        return null
      }
    }
  },
  posts: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, {prisma, request}, info) {
      return prisma.query.posts({
        where: {
          published: true,
          author: {
            id: parent.id
          }
        }
      }, info)


    }
  }

  // posts (parent, args, { db }, info) {
  //   return db.posts.filter((post) => {
  //     return post.author === parent.id
  //   })
  // },
  // comments (parent, args, { db }, info) {
  //   return db.comments.filter((comment) => {
  //     return comment.author === parent.id
  //   })
  // }
}

export { User as default }
