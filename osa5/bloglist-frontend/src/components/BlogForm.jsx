import { useState } from "react"

const BlogForm = ({ addBlog, toggleForm }) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        const newBlog = {
            title: title,
            author: author,
            url: url
        }
        addBlog(newBlog)
        toggleForm(false)
        setTitle("")
        setAuthor("")
        setUrl("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>Title
                <input type="text" name="Title" value={title} onChange={e => setTitle(e.target.value)}></input>
            </div>
            <div>Author
                <input type="text" name="Author" value={author} onChange={e => setAuthor(e.target.value)}></input>
            </div>
            <div>Url
                <input type="url" name="Url" value={url} onChange={e => setUrl(e.target.value)}></input>
            </div>
            <button type="submit">Add</button>
        </form>
    )
}

export default BlogForm