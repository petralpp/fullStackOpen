const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
      next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const { title, author, url, likes, userId } = request.body
  let user = ""
  if (!userId) {
    // 4.17 temporary solution
    const users = await User.find({})
    user = users[0]
  }
  /*
  user = await User.findById(userId)

  if (!user) {
    //return response.status(400).json({ error: 'userId missing or not valid' })
  }*/

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes ?? 0,
    user: user._id ?? user.id
  })

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exception) {
      next(exception)
  } 
})

blogsRouter.put('/:id', async (request, response, next) => {
  const { title, author, url, likes } = request.body
  try {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        return response.status(404).end()
      }
    blog.title = title
    blog.author = author
    blog.url = url
    blog.likes = likes

    const updatedBlog = await blog.save()
    response.json(updatedBlog)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter