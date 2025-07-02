const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
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
  const { title, author, url, likes } = request.body
  try {
    // returns the object used in the token creation
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    if (!user) {
      return response.status(400).json({ error: 'userId missing or not valid' })
    }
    const blog = new Blog({
      title,
      author,
      url,
      likes: likes ?? 0,
      user: user._id
    })
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
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }
    if (decodedToken.id == blog.user.toString()) {
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    }
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