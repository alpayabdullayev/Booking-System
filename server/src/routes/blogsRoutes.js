import express from 'express'
import upload from '../middleware/upload.js'
import { createBlogBooking, deleteBlog, getAllBlogs, getBlogsById } from '../controller/blogController.js'


export const BlogRoutes = express.Router()

BlogRoutes.post('/blogs', upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'images', maxCount: 5 }
]), createBlogBooking)
BlogRoutes.get('/blogs',getAllBlogs )
BlogRoutes.get('/blogs/:id',getBlogsById )
BlogRoutes.delete('/blogs/:id',deleteBlog )
// BlogRoutes.put('/partners/:id', upload.single('image'), )
