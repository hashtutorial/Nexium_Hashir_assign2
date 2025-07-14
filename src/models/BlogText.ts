import mongoose from 'mongoose';

const BlogTextSchema = new mongoose.Schema({
  input: { type: String, required: true },
  content: { type: String, required: true },
  ipAddress: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.BlogText || mongoose.model('BlogText', BlogTextSchema);
