const Post = require('../models/post')
const createPath = require('../helpers/create-path')

const handleError = (res, err) => {
    console.log(err)
    res.render(createPath('error'), { title: 'Error' })
}

const getPosts = (req, res) => {
    const title = 'Posts'
    Post.find()
        .sort({ createdAt: -1 })
        .then(posts => res.render(createPath('posts'), { title, posts }))
        .catch(err => handleError(res, err))
}

const getPostsById = (req, res) => {
    const title = 'Posts'
    Post.findById(req.params.id)
        .sort({ createdAt: -1 })
        .then(posts => res.render(createPath('posts'), { title, posts }))
        .catch(err => handleError(res, err))
}

const deletePost = (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(res => res.sendStatus(200))
        .catch(err => handleError(res, err))
}

const updatePost = (req, res) => {
    const { title, text, author } = req.body
    const { id } = req.params

    Post.findByIdAndUpdate(id, { title, text, author })
        .then(() => res.redirect(`/posts`))
        .catch(err => handleError(res, err))
}

const getEditForm = (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(res => res.sendStatus(200))
        .catch(err => handleError(res, err))
}

const createPost = (req, res) => {
    const { title, author, text } = req.body
    const post = new Post({ text, title, author })

    post.save()
        .then(() => res.redirect('/posts'))
        .catch(err => handleError(res, err))
    // res.render(createPath('posts'), { post })
}

const addPostForm = (req, res) => {
    const title = 'Add post'
    res.render(createPath('add-post'), { title })
}

module.exports = {
    getPosts,
    deletePost,
    updatePost,
    getEditForm,
    createPost,
    addPostForm,
    getPostsById
}