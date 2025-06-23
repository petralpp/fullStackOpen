import Blog from "./Blog"

const BlogTable = ({ blogs, removeBlog }) => {

    return(
        <div id="blogTable">
            <table>
                <thead><th>Title</th><th>Author</th><th>Likes</th></thead>
                {blogs.map(blog => <Blog key={blog.id} blog={blog} removeBlog={removeBlog}/>)}
            </table>
        </div>
    )
}

export default BlogTable