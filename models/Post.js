// models/Post.js
const mongoose = require("mongoose");

// Define the schema for a blog post
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

// Export the model so we can use it in app.js
module.exports = mongoose.model("Post", postSchema);