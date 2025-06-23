import { useState } from 'react'

const BlogForm = ({ saveBlog }) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [likes, setLikes] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault()
        saveBlog({ title: title, author: author, likes: likes })
        setTitle("")
        setAuthor("")
        setLikes(0)
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="inputDiv">
                <label>
                    Title: <input value={title} onChange={e => setTitle(e.target.value)}></input>
                </label>
            </div>
            <div className="inputDiv">
                <label>
                    Author: <input value={author} onChange={e => setAuthor(e.target.value)}></input>
                </label>
            </div>
            <div className="inputDiv">
                <label>
                    Likes: <input value={likes} onChange={e => setLikes(e.target.value)}></input>
                </label>
            </div>
            <button type="submit">add</button>
        </form>
    )
}

export default BlogForm