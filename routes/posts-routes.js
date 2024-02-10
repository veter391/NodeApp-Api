const express = require('express')
const { getPosts, deletePost, updatePost, getEditForm, createPost, addPostForm } = require('../controllers/post-controller')

const router = express.Router()


router.get('/posts', getPosts)
router.delete('/posts/:id', deletePost)
router.get('/edit/:id', getEditForm)
router.put('/edit/:id', updatePost)
router.post('/add-post', createPost)
router.get('/add-post', addPostForm)

module.exports = router