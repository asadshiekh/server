import express from 'express';
import { CreateBlog, FetchBlog ,FetchThreeBlogs,FetchThreeBlogsWithPagniation,SearchBlogs,CreateBlog1,FetchBlogUserOnly,DeleteBlogPost,UpdateBlogPost} from '../controllers/blogController.js';
import {CreateUser,Login,Login1} from '../controllers/userController.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('APP Config Successfully');
});

router.post('/create-blog', CreateBlog);
router.post('/create-blog1', CreateBlog1);
router.get('/get-blog', FetchBlog);
router.get('/fetch-three-blog', FetchThreeBlogs);
router.get('/fetch-three-blog-pagenation', FetchThreeBlogsWithPagniation);

// Route to search blogs
router.get('/search', SearchBlogs);
router.get('/fetch-user-only/:userId',FetchBlogUserOnly);

router.delete('/delete-post/:postIdToDelete',DeleteBlogPost);
  
router.put('/update-blog/:postId',UpdateBlogPost);


// User Routes
router.post('/create-user',CreateUser);
router.post('/login', Login);
router.post('/working', Login1);
export default router;