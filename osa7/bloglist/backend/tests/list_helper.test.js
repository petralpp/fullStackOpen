const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { test_blogs, most_blogs } = require('../utils/test_blogs')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
    const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
    ]

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        assert.strictEqual(result, 0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(test_blogs)
        assert.strictEqual(result, 48)
    })
})

describe('favorite blog', () => {
    const testObject = {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    }
    
    test('is the one with the most likes', () => {
        const result = listHelper.favoriteBlog(test_blogs)
        assert.deepStrictEqual(result, testObject)
    })

    test('is one of the blogs with highest and same amount of likes', () => {
        const result = listHelper.favoriteBlog(test_blogs)
        assert.strictEqual(result.likes, 12)
    })

    test('is undefined for empty list', () => {
        const result = listHelper.favoriteBlog([])
        assert.deepStrictEqual(result, undefined)
    })
})

describe('author with most blogs', () => {
    test('is Robert C. Martin', () => {
        const testObject = { author: "Robert C. Martin", blogs: 3 }
        const result = listHelper.mostBlogs(test_blogs)
        assert.deepStrictEqual(result, testObject)
    })

    test('is undefined for empty list', () => {
        const result = listHelper.mostBlogs([])
        assert.strictEqual(result, undefined)
    })

    test('is Robert C. Martin when number of blogs is equal', () => {
        const testObject = { author: "Robert C. Martin", blogs: 3 }
        const result = listHelper.mostBlogs(most_blogs)
        assert.deepStrictEqual(result, testObject)
    })
})

describe('author with most likes', () => {
    test('is Edsger W. Dijkstra', () => {
        const testObject = { author: "Edsger W. Dijkstra", likes: 17 }
        const result = listHelper.mostLikes(test_blogs)
        assert.deepStrictEqual(result, testObject)
    })

    test('is undefined for empty list', () => {
        const result = listHelper.mostLikes([])
        assert.strictEqual(result, undefined)
    })

    test('is Robert C. Martin when likes are equal', () => {
        const testObject = { author: 'Robert C. Martin', likes: 12 }
        const result = listHelper.mostLikes(most_blogs)
        assert.deepStrictEqual(result, testObject)
    })
})