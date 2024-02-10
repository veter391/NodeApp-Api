const express = require('express')
const { getPosts, deletePost, updatePost, createPost, getPostsById } = require('../controllers/api-post-controller')

const router = express.Router()

// get all posts
router.get('/api/posts', getPosts)
// add new post
router.post('/api/post', createPost)
// get post by ID
router.get('/api/post/:id', getPostsById)
// delete post by ID
router.delete('/api/post/:id', deletePost)
// update post by ID
router.put('/api/post/:id', updatePost)

module.exports = router