const _ = require("lodash"); 

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    var likes = 0

    blogs.forEach(blog => likes += blog.likes);

    return likes
}

const favoriteBlog = (blogs) => {
    var favorite = blogs[0]

    blogs.forEach(blog => {
        if (blog.likes > favorite.likes) {
            favorite = blog
        }
    })

    return favorite
}

const mostBlogs = (blogs) => {
  const result = _.head(_.orderBy(_.map(_.countBy(blogs, "author"), (val, key) => ({ 'author': key, 'blogs': val })), 'blogs', 'desc'))

  return result
}

const mostLikes = (blogs) => {
    var output =
    _(blogs)
      .groupBy('author')
      .map((objs, key) => ({
          'author': key,
          'likes': _.sumBy(objs, 'likes') }))
      .value();
  
      const result = _.head(_.orderBy(output, 'likes', 'desc'))
      return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}