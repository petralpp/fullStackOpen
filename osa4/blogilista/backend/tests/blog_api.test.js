const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { initialBlogs, blogsInDb, nonExistingId } = require('./test_helper')

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
          url: 'someUrl',
          likes: 2
        }
        await api.post('/api/blogs').send(testBlog).expect(201).expect('Content-Type', /application\/json/)
        
        const blogsAfter = await blogsInDb()
        assert.strictEqual(blogsAfter.length, initialBlogs.length + 1)

        const title = blogsAfter.map(b => b.title)
        assert(title.includes('Something new'))
      })

      test('fails with missing title', async () => {
        const testBlog = {
          author: 'Unknown',
          url: '',
          likes: 2
        }
        await api.post('/api/blogs').send(testBlog).expect(400)
        
        const blogsAfter = await blogsInDb()
        assert.strictEqual(blogsAfter.length, initialBlogs.length)
      })

      test('fails with missing url', async () => {
        const testBlog = {
          title: 'Something new',
          author: 'Unknown',
          likes: 2
        }
        await api.post('/api/blogs').send(testBlog).expect(400)
        
        const blogsAfter = await blogsInDb()
        assert.strictEqual(blogsAfter.length, initialBlogs.length)
      })

      test('without likes is appointed a value', async () => {
        const testBlog = {
          title: 'Something new',
          author: 'Unknown',
          url: 'someUrl'
        }
        const response = await api.post('/api/blogs').send(testBlog).expect(201)
        assert.strictEqual(response.body.likes, 0)

        const blogsAfter = await blogsInDb()
        assert.strictEqual(blogsAfter.length, initialBlogs.length + 1)
      })
    })
    
    describe('removing a blog', () => {
      test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

        const blogsAtEnd = await blogsInDb()

        const titles = blogsAtEnd.map(b => b.title)
        assert(!titles.includes(blogToDelete.title))

        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
      })

      test('fails if id is completely invalid ', async () => {
        const invalidId = 'notValidAtAll'
        await api.delete(`/api/blogs/${invalidId}`).expect(400)
    })

  })

  describe('editing a blog\'s', () => {
    test('likes succeeds if id is valid', async () => {
      const blogsAtStart = await blogsInDb()
      const blogToEdit = blogsAtStart[0]
      const editedBlog = { 
        title: blogToEdit.title,
        author: blogToEdit.author,
        url: blogToEdit.url,
        likes: blogToEdit.likes + 1 
      }

      const response = await api.put(`/api/blogs/${blogToEdit.id}`).send(editedBlog).expect(200).expect('Content-Type', /application\/json/)
      assert.strictEqual(response.body.likes, editedBlog.likes)

      const blogsAtEnd = await blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })

    test('likes fails if id is invalid', async () => {
      const blogsAtStart = await blogsInDb()
      const blogToEdit = blogsAtStart[0]
      const editedBlog = { 
        title: blogToEdit.title,
        author: blogToEdit.author,
        url: blogToEdit.url,
        likes: blogToEdit.likes + 1 
      }
      const invalidId = await nonExistingId()

      await api.put(`/api/blogs/${invalidId}`).send(editedBlog).expect(404)
    })
  })

  describe('viewing a blog', () => {
    test('succeeds if id is valid', async () => {
          const blogsAtStart = await blogsInDb()
          const blogToView = blogsAtStart[0]

          const blog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

          assert.deepStrictEqual(blog.body, blogToView)
    })

    test('fails if id is invalid', async () => {
      const invalidId = await nonExistingId()
      await api.get(`/api/blogs/${invalidId}`).expect(404)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})