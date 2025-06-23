import axios from 'axios'
const baseUrl = '/api/blogs'

const getBlogs = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addBlog = (blog) => {
    const request = axios.post(baseUrl, blog)
    return request.then(response => response.data)
}

const deleteBlog = (id) => {
    return axios.delete(baseUrl.concat(`/${id}`))
}

export default {
    getBlogs,
    addBlog,
    deleteBlog
}