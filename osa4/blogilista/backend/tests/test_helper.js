const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'Someone', url: 'url', likes: 0 })
  await blog.save()
  await blog.deleteOne()

  return blog.id.toString()
}

const testUser = {
  username: 'testuser', 
  password: 'password'
}

const createTestUser = async () => {
  const passwordHash = await bcrypt.hash(testUser.password, 10)
  const user = new User({ username: testUser.username, name: testUser.name, passwordHash: passwordHash })
  await user.save()
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb, nonExistingId, testUser, createTestUser
}