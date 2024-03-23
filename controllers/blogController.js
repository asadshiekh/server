import { request, response } from 'express';
import Blog from '../model/blog_model.js';

const CreateBlog = async (request, response) => {
     try {
        // Check if a blog with the same title already exists
       // let useMatch = await Blog.findOne({ title: request.body.title });
        // return response.status(200).json({
        //     data:request.body.title
        // })
    //     if (useMatch) {
    //         return response.status(400).json({
    //             msg: 'A blog with the same title already exists'
    //         });
    //     }

        // If no duplicate title found, proceed to create the blog
        const newBlog = new Blog({
            title: 'My First Blog',
            description: 'Blog Descrition',
            author: 'Asad',
        });

        await newBlog.save();

        return response.status(200).json({
            msg: 'Blog successfully added'
        });
    } catch (error) {
        return response.status(500).json(error);
    }
};


const CreateBlog1 = async (request, response) => {
    try {

       // If no duplicate title found, proceed to create the blog
       const newBlog = new Blog({
           title: request.body.title,
           description: request.body.description,
           user_id: request.body.user_id,
       });

        const savedBlog =  await newBlog.save();

        return response.status(200).json({
            data: savedBlog,
            msg: 'Blog successfully added'
        });
   } catch (error) {
        return response.status(500).json(error);
   }
};




const FetchBlog = async (request, response) => {
    try {
        // Fetch all blogs
        const blogs = await Blog.find().populate('user_id', 'full_name');
    
        return response.status(200).json(blogs);
    } catch (error) {
        return response.status(500).json(error);
    }
};

const FetchBlogUserOnly = async (request, response) => {
    try {
        const userId = request.params.userId;
        // Fetch blogs that match the user ID
         const blogs = await Blog.find({ user_id: userId }).populate('user_id', 'full_name');   
       
        return response.status(200).json(blogs);
    } catch (error) {
        return response.status(500).json(error);
    }

};

const DeleteBlogPost = async (request, response) => {

    try {
        // Extract the postId from the request parameters
        const postId = request.params.postIdToDelete;
        // return response.json({postId});
        // Find the blog post by its ID and delete it
        const restult = await Blog.findByIdAndDelete(postId);
        // return response.json({restult});
        // Respond with a success message
        return response.status(200).json({ message: 'Blog post deleted successfully' });
      } catch (error) {
        // If an error occurs, respond with an error message
        console.error('Error deleting blog post:', error);
        return response.status(500).json({ error: 'An error occurred while deleting the blog post' });
      }

};

const UpdateBlogPost = async (request, response) => {

    try {
        // Extract the postId from the request parameters
        const postId = request.params.postId;
        
        // Extract the updated post title and description from the request body
        const { editPostTitle, editPostDescription } = request.body;
    
        // Find the blog post by its ID and update it
        await Blog.findByIdAndUpdate(postId, { title: editPostTitle, description: editPostDescription });
    
        // Respond with a success message
       return  response.status(200).json({ message: 'Blog post updated successfully' });
      } catch (error) {
        // If an error occurs, respond with an error message
        console.error('Error updating blog post:', error);
        return response.status(500).json({ error: 'An error occurred while updating the blog post' });
      }

};



const FetchThreeBlogs = async (request, response) => {
    try {
        const page = parseInt(request.query.page) || 1; // Current page number, default to 1
        const limit = 3; // Number of records per page
        const skip = (page - 1) * limit; // Calculate the number of records to skip

        // Fetch three blogs with pagination
        const blogs = await Blog.find().skip(skip).limit(limit);

        return response.status(200).json(blogs);
    } catch (error) {
        return response.status(500).json(error);
    }
};


const FetchThreeBlogsWithPagniation = async (request, response) => {
    try {
        const page = parseInt(request.query.page) || 1; // Current page number, default to 1
        const limit = 3; // Number of records per page
        const skip = (page - 1) * limit; // Calculate the number of records to skip

        // Fetch three blogs with pagination
        const blogs = await Blog.find().skip(skip).limit(limit);

        // Fetch total number of blogs to calculate pagination
        const totalBlogs = await Blog.countDocuments();

        // Calculate total number of pages
        const totalPages = Math.ceil(totalBlogs / limit);

        // Define links for next and previous pages
        const nextPage = page < totalPages ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null;

        return response.status(200).json({
            blogs,
            nextPage,
            prevPage,
            totalPages
        });
    } catch (error) {
        return response.status(500).json(error);
    }
};

const SearchBlogs = async (request, response) => {
    try {
        const searchQuery = request.query.q; // Get the search query from the query string

        // Search blogs based on the title or author containing the search query
        // const blogs = await Blog.find({
        //     $or: [
        //         { title: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search for title
        //         { author: { $regex: searchQuery, $options: 'i' } } // Case-insensitive search for author
        //     ]
        // });

        return response.status(200).json(searchQuery);
    } catch (error) {
        return response.status(500).json(error);
    }
};



export { CreateBlog, FetchBlog,FetchThreeBlogs,FetchThreeBlogsWithPagniation,SearchBlogs,CreateBlog1,FetchBlogUserOnly,DeleteBlogPost,UpdateBlogPost};

export default CreateBlog;
