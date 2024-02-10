const Post = require('../models/post')
// API don't have interface !!!
// const createPath = require('../helpers/create-path')

const handleError = (res, err) => {
    res.status(500).send(err)
}

const getPosts = (req, res) => {
    Post.find()
        .then(posts => res.status(200).json(posts))
        .catch(err => handleError(res, err))
}

const getPostsById = (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.status(200).json(post))
        .catch(err => handleError(res, err))
}

const deletePost = (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json(req.params.id))
        .catch(err => handleError(res, err))
}

const updatePost = (req, res) => {
    const { title, text, author } = req.body
    const { id } = req.params

    // id, params, new or old value to return
    Post.findByIdAndUpdate(id, { title, text, author }, { new: true })
        .then(post => res.status(200).json(post))
        .catch(err => handleError(res, err))
}

const createPost = (req, res) => {
    const { title, author, text } = req.body
    const post = new Post({ text, title, author })

    post.save()
        .then(post => res.status(200).json(post))
        .catch(err => handleError(res, err))
}

module.exports = {
    getPosts, 
    deletePost, 
    updatePost, 
    createPost, 
    getPostsById
}