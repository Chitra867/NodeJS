const { ApiError } = require("../utils/ApiError");
const asyncHandler = require("../utils/AsyncHandler");
const Blog = require("../models/Blog");
const ApiResponse = require("../utils/ApiResponse");

const createBlog = asyncHandler(async (req, res) => {
    const { title, content,author } = req.body;

    if (!title || !content || !author) {
        throw new ApiError(400,"Title, content, and author are required");
    }
    const imageUrls = req.files?.map(file => file.path);
    const blog = await Blog.create({
        title,
        content,
        author,
        images: imageUrls
    });
    return res.status(200).json(new ApiResponse(200, blog, "Blog created successfully"));

});
const getAllBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find();

    if(!blogs) {
        throw new ApiError(404, " Blogs not found");
    }
    res.status(200).json(new ApiResponse(200, blogs, "Blogs fetched successfully"));
    })

    const getSingleBlog = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const blog = await Blog.findById(id);

        if (!blog) {
            throw new ApiError(404, "Blog not found");
        }
        res.status(200).json(new ApiResponse(200, blog, "Blog fetched successfully"));
    })

    const updateBlog = asyncHandler(async (req, res) => {
        const { id } = req.params;

        const {author,title, content, } = req.body;

        const blog = await Blog.findByIdAndUpdate(id, { 
            title, 
            content, 
            author 
        }, {new: true});
        res.status(200).json(new ApiResponse(200, blog, "Blog updated successfully"));
    })

    const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deleteBlog = await Blog.findByIdAndDelete(id);

    if (!deleteBlog) {
        throw new ApiError(404, "Blog not found");
    }

    res.status(200).json(new ApiResponse(200,"Blog deleted successfully"));

        })

module.exports = { createBlog, getAllBlogs,deleteBlog, getSingleBlog , updateBlog };