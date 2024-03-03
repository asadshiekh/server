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


const FetchBlog = async (request, response) => {
    try {
        // Fetch all blogs
        const blogs = await Blog.find();

        return response.status(200).json(blogs);
    } catch (error) {
        return response.status(500).json(error);
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



export { CreateBlog, FetchBlog,FetchThreeBlogs,FetchThreeBlogsWithPagniation,SearchBlogs };

export default CreateBlog;
