const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { usersInDb } = require('./test_helper')

const api = supertest(app)

describe('When there is initially one user at database', () => {
    beforeEach(async () => {
      await User.deleteMany({})
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })

      await user.save()
    })

    describe('when fetching users from db', () => {
        test('all users are successfully returned in json', async () => {
            const usersAtStart = await usersInDb()

            const response = await api.get('/api/users').expect(200).expect('Content-Type', /application\/json/)

            assert.strictEqual(response.body.length, usersAtStart.length)
        })
    })

    describe('when creating a new user', () => {
      test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/)

        const usersAtEnd = await usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
      })

      test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)

        const usersAtEnd = await usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
      })

      test('creation fails with proper statuscode and message if username is less than three characters', async () => {
        const testUser = { username: 'ei', name: 'fail', password: 'feilaava' }
        const usersAtStart = await usersInDb()

        const result = await api.post('/api/users').send(testUser).expect(400).expect('Content-Type', /application\/json/)
        assert(result.body.error.includes('Path `username` (`ei`) is shorter than the minimum allowed length (3)'))

        const usersAtEnd = await usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
      })

      test('creation fails with proper statuscode and message if username is missing', async () => {
        const testUser = {  name: 'fail', password: 'feilaava' }
        const usersAtStart = await usersInDb()

        const result = await api.post('/api/users').send(testUser).expect(400).expect('Content-Type', /application\/json/)
        assert(result.body.error.includes('Path `username` is required'))

        const usersAtEnd = await usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
      })

      test('creation fails with proper statuscode and message if password is less than three characters', async () => {
        const testUser = { username: 'kelpaa', name: 'kelpi', password: 'ei' }
        const usersAtStart = await usersInDb()

        const result = await api.post('/api/users').send(testUser).expect(400).expect('Content-Type', /application\/json/)
        assert(result.body.error.includes('password is missing or less than 3 characters'))

        const usersAtEnd = await usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
      })

      test('creation fails with proper statuscode and message if password is missing', async () => {
        const testUser = {  username: 'kelpaa', name: 'kelpi' }
        const usersAtStart = await usersInDb()

        const result = await api.post('/api/users').send(testUser).expect(400).expect('Content-Type', /application\/json/)
        assert(result.body.error.includes('password is missing or less than 3 characters'))

        const usersAtEnd = await usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
      })
  })
})

after(async () => {
  await mongoose.connection.close()
})