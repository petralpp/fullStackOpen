import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const fakeUser = { username: 'Tester', name: 'Tester' }
const fakeUpdateFunc = () => {
  return 0
}
const fakeDeleteFunc = () => {
  return 0
}

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'The Tester',
  url: 'http://www.tester.com',
  likes: 5,
  user: fakeUser,
}

test('renders only the title and author', () => {
  render(
    <Blog
      blog={blog}
      updateBlog={fakeUpdateFunc}
      deleteBlog={fakeDeleteFunc}
      user={fakeUser}
    />
  )

  const title = screen.getByText(
    /Component testing is done with react-testing-library/
  )
  const author = screen.getByText(/The Tester/)
  const url = screen.queryByText('http://www.tester.com')
  const likes = screen.queryByText(/5/)

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test('renders all blog information after button click', async () => {
  render(
    <Blog
      blog={blog}
      updateBlog={fakeUpdateFunc}
      deleteBlog={fakeDeleteFunc}
      user={fakeUser}
    />
  )

  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  const title = screen.getByText(
    /Component testing is done with react-testing-library/
  )
  const author = screen.getByText(/The Tester/)
  const url = screen.queryByText('http://www.tester.com')
  const likes = screen.queryByText(/5/)

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})

test('event handler for likes is called after every click', async () => {
  const mockLikeHandler = vi.fn()
  render(
    <Blog
      blog={blog}
      updateBlog={mockLikeHandler}
      deleteBlog={fakeDeleteFunc}
      user={fakeUser}
    />
  )

  const user = userEvent.setup()
  const viewButton = screen.getByText('View')
  await user.click(viewButton)

  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockLikeHandler.mock.calls).toHaveLength(2)
})
