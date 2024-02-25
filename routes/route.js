import express from 'express';
import { CreateBlog, FetchBlog ,FetchThreeBlogs,FetchThreeBlogsWithPagniation,SearchBlogs} from '../controllers/blogController.js';
import CreateUser from '../controllers/userController.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('APP Config Successfully');
});

router.post('/create-blog', CreateBlog);
router.get('/get-blog', FetchBlog);
router.get('/fetch-three-blog', FetchThreeBlogs);
router.get('/fetch-three-blog-pagenation', FetchThreeBlogsWithPagniation);
// Route to search blogs
router.get('/search', SearchBlogs);

router.post('/create-user', CreateUser);

export default router;