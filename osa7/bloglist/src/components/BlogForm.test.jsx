import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'The Tester',
  url: 'http://www.tester.com',
}

test('BlogForm gives correct info to callback function', async () => {
  const user = userEvent.setup()
  const mockCreateBlog = vi.fn()
  const fakeToggleForm = () => {
    return 0
  }
  const { container } = render(
    <BlogForm addBlog={mockCreateBlog} toggleForm={fakeToggleForm} />
  )

  const title = container.querySelector('input[name="Title"]')
  const author = container.querySelector('input[name="Author"]')
  const url = container.querySelector('input[name="Url"]')
  const submitButton = screen.getByText('Add')

  await user.type(title, blog.title)
  await user.type(author, blog.author)
  await user.type(url, blog.url)
  await user.click(submitButton)

  expect(mockCreateBlog.mock.calls).toHaveLength(1)
  expect(mockCreateBlog.mock.calls[0][0]).toEqual(blog)
})
