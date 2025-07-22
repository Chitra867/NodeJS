const asyncHandler = require("../utils/AsyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const Comment = require("../models/Comment");
const { ApiError } = require("../utils/ApiError");

const  createComment = asyncHandler(async (req, res) => {

    const blogId = req.params.id; // Assuming blogId is passed in the URL
    const userId = req.user._id;
    const {text} = req.body;

    if (!text) {
        throw new ApiError(400, "Comment text is required");
    }

    const comment = await Comment.create({
        blog: blogId,
        user: userId,
        text
    });  

    return res.status(201).json( new ApiResponse(201, comment, "Comment created successfully"));

});

const getCommentsByBlogId = asyncHandler(async (req, res) => {
        const blogId = req.params.id;

        const comments = await Comment.find({ blog: blogId }).populate('user', 'name')
        .sort({ createdAt: -1 });

        if (!comments || comments.length === 0) {
            throw new ApiError(404, "No comments found for this blog");
        }

        return res.status(200).json(new ApiResponse(200, comments, "Comments retrieved successfully"));
    });

module.exports = {createComment, getCommentsByBlogId};