import mongoose, { Schema, model, models } from 'mongoose';

const BlogPostSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, required: true },
    excerpt: { type: String },
});

const BlogPost = models.BlogPost || model('BlogPost', BlogPostSchema);

export default BlogPost;
