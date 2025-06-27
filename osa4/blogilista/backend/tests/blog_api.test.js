const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { initialBlogs, blogsInDb } = require('./test_helper')

const api = supertest(app)

describe('when there are blogs initially saved', () => {
    beforeEach(async () => {
      await Blog.deleteMany({})
      await Blog.insertMany(initialBlogs)
    })

    test('blogs are returned as json', async () => {
      await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, initialBlogs.length)
    })

    test('id fields are in correct form', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach(b => {
            assert(Object.hasOwn(b, 'id'))
            assert(!Object.hasOwn(b, '_id'))
    })
    })

    describe('adding a new blog', () => {
      test('is successful with valid data', async () => {
        const testBlog = {
          title: 'Something new',
          author: 'Unknown',
          url: '',
          likes: 2
        }
        const response = await api.post('/api/blogs').send(testBlog).expect(201).expect('Content-Type', /application\/json/)
        
        const blogsAfter = await blogsInDb()
        assert.strictEqual(blogsAfter.length, initialBlogs.length + 1)

        const title = blogsAfter.map(b => b.title)
        assert(title.includes('Something new'))
      })

      test('fails with invalid data', async () => {
        const testBlog = {
          author: 'Unknown',
          url: '',
          likes: 2
        }
        const response = await api.post('/api/blogs').send(testBlog).expect(400)
        
        const blogsAfter = await blogsInDb()
        assert.strictEqual(blogsAfter.length, initialBlogs.length)
      })

      test('without likes is appointed a value', async () => {
        const testBlog = {
          title: 'Something new',
          author: 'Unknown',
          url: ''
        }
        const response = await api.post('/api/blogs').send(testBlog).expect(201)
        assert.strictEqual(response.body.likes, 0)

        const blogsAfter = await blogsInDb()
        assert.strictEqual(blogsAfter.length, initialBlogs.length + 1)
      })
    })

})

after(async () => {
  await mongoose.connection.close()
})