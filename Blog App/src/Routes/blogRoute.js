const express = require("express");
const { createBlog } = require("../controllers/blogControllers");
const { protect } = require("../middlewares/authMiddleware");

const router =express.Router()

router.post('/create',protect, createBlog)

module.exports = router;