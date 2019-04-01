import getUserId from '../utils/getuserid'

const Query = {
  users (parent, args, { prisma }, info) {
    //{} - query args, () - fields want to grab
    // return prisma.query.users(null, info)
    const prismaArgs = {
      firts: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };
    if(args.query) {
      prismaArgs.where = {
        OR: [{ name_contains: args.query }]
      }
    }
    return prisma.query.users(prismaArgs, info)

    // if(!args.query) {
    //   return db.users;
    // }
    // return db.users.filter((user) => {
    //   return user.name.toLowerCase().includes(args.query.toLowerCase())
    // })
  },
  myPosts (parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const prismaArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
      where: {
        author: {
          id: userId
        }
      }
    }



    if (args.query) {
      prismaArgs.where.OR = [{
        title_contains: arg.query
      }, {
        body_contains: args.query
      }]
    }

    return prisma.query.posts(prismaArgs, info)

  },
  posts (parent, args, { prisma }, info) {
    const prismaArgs = {
      where: {
        first: args.first,
        skip: args.skip,
        after: args.after,
        orderBy: args.orderBy,
        published: true
      }
    };

    if (args.query) {
      prismaArgs.where.OR = [{
        title_contains: arg.query
      }, {
        body_contains: args.query
      }]
    }

    return prisma.query.posts(prismaArgs, info)

    // if (!args.query) {
    //   return db.posts
    // }
    // return db.posts.filter((post) => {
    //   const titleMatched = post.title.toLowerCase().includes(args.query.toLowerCase())
    //   const bodyMatched = post.body.toLowerCase().includes(args.query.toLowerCase())
    //   return titleMatched || bodyMatched
    // })
  },
  async me (parent, args, {prisma, request}, info) {
    const userId = getUserId(prisma)

    const user = await prisma.query.user({
      where: {
        id: userId
      }
    }, info)

    if (!user) throw new Error('Operation error')

    return user
  },
  async post (parent, args, {prisma, request}, info ) {
    //SECRET!!!!!
    const userId = getUserId(request, false)
    const posts = await prisma.query.posts({
      where: {
        id: args.id,
        OR: [{
          published: true
        },{
          author: {
            id: userId
          }
        }]
      }
    }, info)

    if(posts.length === 0) {
      throw new Error('Post not found')
    }
    return posts[0]
  },
  comments (parent, args, { prisma }, info) {
    const prismaArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
    };
    if(args.query) {
      prismaArgs.where = {
        text_contains: args.query
      }
    }
    return prisma.query.comments(prismaArgs, info)
    // if(!args.query) {
    //   return db.comments
    // }
    // return db.comments.filter((comment) => {
    //   return db.comment.text.toLowerCase().includes(args.query.toLowerCase())
    // })
  }
}

export {Query as default}
