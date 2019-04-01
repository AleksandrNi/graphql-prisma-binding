import getUserId from '../utils/getuserid'
const Subscription = {
  post: {
    subscribe(parent, { userId }, { db, pubsub }, info) {

      return prisma.subscription.post({
        where: {
          node: {
            author: {
              id: userId
            },
            published: true
          }
        }
      }, info)

      // const user = db.users.find(user => userId === user.id)
      // if(!user) {
      //   throw new Error('User not found')
      // }
      // return pubsub.asyncIterator(`post ${userId}`)
    }
  },
  myPost: {
    subscribe(parent, args, {prisma, request}, info) {
      const userId = getUserId(request)

      return prisma.subscription.post({
        where: {
          node: {
            author: {
              id: userId
            }
          }
        }
      }, info)

    }
  },
  comment: {
    subscribe (parent, { postId }, { db, pubsub }, info) {

      return prisma.subscription.comment({
        where: {
          node:{
            post: {
              id: postId
            }
          }
        }
      }, info)

      // const post = db.posts.find(post => postId === post.id && post.published)
      // if(!post) {
      //   throw new Error('Post not found')
      // }
      // return pubsub.asyncIterator(`comment ${postId}`)
    }
  }
}

export { Subscription as default}
