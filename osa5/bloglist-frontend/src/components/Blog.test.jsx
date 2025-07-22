import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders only the title and author', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'The Tester',
    url: 'http://www.tester.com',
    likes: 5
  }
  const fakeUser = { username: 'Tester', name: 'Tester' }
  const fakeUpdateFunc = () => { return 0 }
  const fakeDeleteFunc = () => { return 0 }
  render(<Blog blog={blog} updateBlog={fakeUpdateFunc} deleteBlog={fakeDeleteFunc} user={fakeUser}/>)

  //const element = screen.getByText(`${blog.title} ${blog.author}`)
  const title = screen.getByText(/Component testing is done with react-testing-library/)
  expect(title).toBeDefined()
  const author = screen.getByText(/The Tester/)
  expect(author).toBeDefined()
  const url = screen.queryByText('http://www.tester.com')
  expect(url).toBeNull()
  const likes = screen.queryByText (/5/)
  expect(likes).toBeNull()
})