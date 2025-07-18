const Blog = require('../models/Blog');
const { ApiError } = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/AsyncHandler');

const createBlog = asyncHandler(async (req, res) => {
    const {title, content, author} = req.body;
    if (!title || !content || !author) {
        throw new ApiError(400, 'Title, content, and author are required');
    }
    const imageUrls = req.files?.map((file) => file.path);
    
    const blog = await Blog.create({
        title,
        content,
        author,
        images: imageUrls
    })
    return res.status(201).json(new ApiResponse(201, blog, "New Blog created successfully"));

})
const getAllBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find();
    if (!blogs){
        throw new ApiError(400, "Blogs not found");
    }
    res.status(200).json(new ApiResponse(200, blogs, "Blogs found successfully"));
})

const deleteBlog =asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deleteBlog= await Blog.findByIdAndDelete(id);
    if (!deleteBlog) {
        throw new ApiError(400, "Blog not found");
    }
    // Optionally, you can also delete the images from the file system if needed
    // For example, using fs.unlinkSync or a similar method to remove files from the server
    res.status(200).json(new ApiResponse(200, deleteBlog, "Blog deleted successfully"));
 

})

module.exports= { createBlog, getAllBlogs, deleteBlog };