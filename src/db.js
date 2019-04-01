const users = [
  {
    id: '1',
    name: 'Katya',
    age: 12,
    city: 'Madrid',
    country: 'Spain',
    email: 'Katya@mail.ru'
  },
  {
    id: '2',
    name: 'John',
    age: 32,
    city: 'London',
    country: 'UK',
    email: 'John@gmail.com'
  },
  {
    id: '3',
    name: 'Mike',
    age: 44,
    city: 'NY',
    country: 'USA',
    email: 'Mike@amazon.com'
  }
]
const posts = [
  {
    id: '11',
    title: 'London',
    body: 'London is the Capital of Great Britain',
    published: true,
    author: '1'
  },
  {
    id: '12',
    title: 'Madrid',
    body: 'Madrid is the Capital of Spain',
    published: true,
    author: '2'
  },
  {
    id: '13',
    title: 'Washington',
    body: 'Washington is the Capital of USA',
    published: true,
    author: '3'
  }
]
const comments  = [
  {
    id: '111',
    text: 'Hello, London',
    author: '1',
    post: '11'
  },
  {
    id: '112',
    text: 'Love, Madrid!!!',
    author: '2',
    post: '12'
  },
  {
    id: '113',
    text: 'hello, NY :)',
    author: '1',
    post: '13'
  },
  {
    id: '114',
    text: 'Love, London',
    author: '3',
    post: '11'
  },
  {
    id: '115',
    text: 'Hello, Madrid!!!',
    author: '3',
    post: '12'
  },
  {
    id: '116',
    text: 'Love, NY :)',
    author: '2',
    post: '13'
  }
]

const db = {
  users,
  posts,
  comments
}

export {db as default}
