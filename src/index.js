import'@babel/polyfill'
import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import { resolvers, fragmentReplacements } from './resolvers/index'


// fetch data node -> prisma -> postgre

import prisma from './prisma';

//Scalar types: String, Boolean, Int, Flot, ID

// Type def (schema)

//Resolvers
const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context (request) {
    return {
      db,
      pubsub,
      prisma,
      request
    }
  },
  fragmentReplacements
})

server.start({ port: process.env.PORT || 4000 }, () => {
  console.log('Server is up!');
})
