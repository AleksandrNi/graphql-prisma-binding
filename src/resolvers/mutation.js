const secret = 'mysecrettoken10'

import bcrypt from 'bcryptjs'
import getUserId from '../utils/getuserid'
import getToken from '../utils/getToken'
import hashPassword from '../utils/hashPassword'

const Mutation = {

  async createUser (parent, args, { prisma, request }, info) {

    // const userId = getUserId(request, secret);

    const password = await hashPassword(args.data.password);

    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password
      }
    })
    return {
      user: user,
      token: getToket(user.id)
    }
    // const emailTaken = db.users.some((user) => {
    //   return user.email === args.data.email
    // })
    //
    // if(emailTaken) {
    //   throw new Error ('Email taken')
    // }
    //
    // const user = {
    //   id: uuidv4(),
    //   ...args.data
    // }
    //
    // db.users.push(user)
    // return user
  },
  async loginUser(parent, args, { prisma }, info){
    const user = await prisma.query.user({
      where: {
        email: args.data.email
      }
    })
    if (!user) throw new Error('Unable to login')

    const isValid = await bcrypt.compare(args.data.password, user.password)
    if(!isValid) throw new Error('Unable to login')

    return {
      user,
      token: getToken(user.id)
    }
  },
  async deleteUser (parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const user = await prisma.mutation.deleteUser( {
      where: {
        id: userId
      } }, info )

    return user

    // const userIndex = db.users.findIndex(user => user.id === args.id);
    // if(userIndex === -1) {
    //   throw new Error('User not found')
    // }
    // const deletedUser = db.users.splice(userIndex, 1);
    //
    // db.posts = db.posts.filter(post => {
    //   const match = post.author === args.id
    //   if(match) {
    //     db.comments = db.comments.filter(comment => comment.author !== args.id)
    //   }
    //   return !match
    // })
    //
    // return deletedUser[0]
  },
  async updateUser (parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    if(typeof args.data.password === 'string') {
      args.data.password = await hashPassword(args.data.password)
    }

    const post = await prisma.mutation.createPost({
      where: {
        id: userId
      },
      data: args.data
    }, info)

    return post

    // return post
    // const user = await prisma.mutation.updateUser({
    //   where: {
    //     id: args.id,
    //   },
    //   data: {
    //     ...args.data
    //   }
    // }, info)
    //
    // return user

    // const userExists = db.users.find(user => user.id === id)
    //
    // if (!userExists) {
    //   throw new Error("User not found")
    // }
    //
    // if (typeof data.name === 'string') {
    //   userExists.name = data.name
    // }
    //
    // if (typeof data.email === 'string') {
    //   const emailTaken = db.users.some(user => user.email === data.email)
    //   if (emailTaken) {
    //     throw new Error('Email taken')
    //   }
    // }
    //
    // if (typeof data.city === 'string') {
    //   userExists.city = data.city
    // }
    //
    // if (typeof data.age !== 'undefined') {
    //   userExists.age = data.age
    // }
    //
    // return userExists

  },

  async createPost(parent, args, { prisma, request }, info){

    const userId = getUserId(request);

    const post = await prisma.mutation.createPost({
      data: {
        title: args.data.title,
        body: args.data.body,
        published: args.data.published,
        author: {
          connect: {
            id: userId
          }
        }
      }
    }, info)

    return post

    // const userExists = db.users.some((user) => {
    //   return user.id === args.data.author
    // })
    // if(!userExists) {
    //   throw new Error('User not found')
    // }
    // const post = {
    //   id: uuidv4(),
    //   ...args.data
    // }
    //
    // db.posts.push(post)
    //
    // if (args.data.published) {
    //     pubsub.publish(`post ${args.data.author}`, {
    //       post: {
    //         mutation: "CREATE",
    //         data: post
    //       }
    //     })
    // };
    //
    // return post
  },
  async deletePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const postExists = await prisma.exists.Post({
      id: args.id,
      author: {
        id: userId
      }})

    if(!postExists) throw new Error('Operation failed')

    const post = await prisma.mutation.deletePost({
      where: {
        id: args.id
      }
    }, info)

    return post

    // const postIndex = db.posts.findIndex(post => post.id === args.id)
    // if(postIndex === -1) {
    //   throw new Error('Post not found')
    // }
    // db.comments = db.comments.filter(comment => comment.post !== args.id)
    // const [post] = db.posts.splice(postIndex, 1);
    //
    // if(post.published) {
    //   pubsub.publish(`post ${post.author}`, {
    //     post: {
    //       mutation: "DELETE",
    //       data: post
    //     }
    //   })
    // }
    //
    // return post
  },
  async updatePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const posts = prisma.query.posts({
      where: {
        id: args.id,
        author: {
          id: userId
        }}
    })

    if(!posts.length) throw new Error('Operation failed')
    if(posts[0].published === true && args.data.published === false) {
      await prisma.mutation.deleteManyComments({
        where: {
          post: {
            id: args.id
          }
        }
      })
    }
    const post = await prisma.mutation.updatePost({
      where: {
        id: args.id
      },
      data: {
        ...args.data
      }
    }, info)

    return post

    // const post = db.posts.find(post => post.id === id )
    //
    // postOriginal = {...post}
    //
    // if (!post) {
    //   throw new Error('Post not found')
    // }
    //
    // if (typeof data.title === 'string') {
    //   post.title = data.title
    // }
    //
    // if (typeof data.body === 'string') {
    //   post.body = data.body
    // }
    // let mutationType;
    // if (typeof data.published === 'boolean') {
    //   post.published = data.published
    //
    //   if (postOriginal.published && !post.published) {
    //     //delete
    //     mutationType = "DELETE"
    //   } else if (!postOriginal.published && post.published) {
    //     //publish
    //     mutationType = "PUBLISH"
    //   }
    //
    // } else if(postOriginal.published) {
    //     //update
    //     mutationType = "UPDATE"
    // }
    // if(mutationType) {
    //   pubsub.publish(`post ${post.author}`, {
    //     post: {
    //       mutation: mutationType,
    //       data: post || postOriginal
    //     }
    //   })
    // }
    // return post
  },

  async createComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const postExists = await prisma.exists.Post({id: args.data.post, published: true})

    if(!postExists) throw new Error('Post not found')

    const comment = await prisma.mutation.createComment({
      data: {
        text: args.data.text,
        post: {
          connect: {
            id: args.data.post
          }
        },
        author: {
          connect: {
            id: userId
          }
        }
      }
    }, info)

    return  comment

    // const userExists = db.users.some((user) => user.id === args.data.author);
    // const postExists = db.posts.some((post) => post.id === args.data.post && post.published);
    // if(!userExists || !postExists) {
    //   throw new Error('Unable to find user and post')
    // }
    // const comment = {
    //   id: uuidv4(),
    //   ...args.data
    // }
    //
    // db.comments.push(comment)
    //
    // pubsub.publish(`comment ${args.data.post}`, {
    //   comment: {
    //     mutation: 'CREATE',
    //     data: comment
    //   }
    // })
    //
    // return comment
  },
  async deleteComment (parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    const commentExists = await prisma.exists.Comment({
      id: args.id,
      author: {
        id: userId
      }
    })

    if(!commentExists) throw new Error('Operation failed')

    const comment = await prisma.mutation.deleteComment({
      where: {
        id: args.id
      }
    }, info)

    return comment
    // const commentIndex = db.comments.findIndex(comment => comment.id === args.id)
    // if(commentIndex === -1){
    //   throw new Error('Comment not found')
    // }
    // const [comment] = db.comments.splice(commentIndex, 1)
    //
    // pubsub.publish(`comment ${comment.post}`, {
    //   comment: {
    //     mutation: 'DELETE',
    //     data: comment
    //   }
    // })
    //
    // return comment
  },
  async updateComment(parent, { id, data }, { db, request }, info) {
    const userId = getUserId(request)

    const commentExists = await prisma.exists.Comment({
      id: args.id,
      author: {
        id: userID
      }
    })
    if(commentExists) throw new Error('Operation failed')

    const comment = await prisma.mutation.updateComment({
      where: {
        id: args.id
      },
      data: {
        ...args.data
      }
    }, info)

    return comment
    // const commentExists = db.comments.find(comment => comment.id === id)
    // if(!commentExists) {
    //   throw new Error('Comment not found')
    // }
    // const postExists = db.posts.find(post => post.id === commentExists.post)
    // if (postExists && postExists.published && typeof data.text === 'string') {
    //
    //   commentExists.text = data.text
    //
    //   pubsub.publish(`comment ${data.post}`, {
    //     comment: {
    //       mutation: 'UPDATE',
    //       data: commentExists
    //     }
    //   })
    //
    // } else if (postExists && postExists.published && typeof data.text === 'undefined') {
    //     let commentOriginal = commentExists
    //
    //     commentExists.text = data.text;
    //
    //     pubsub.publish(`comment ${data.post}`, {
    //       comment: {
    //         mutation: 'DELETE',
    //         data: commentOriginal
    //       }
    //     })
    //
    //   return commentExists
    // }
  }
}

export { Mutation as default }
