
const mongoose = require('mongoose');


const feedbackSchema = new mongoose.Schema({
  pageId: { type: String, required: true }, 
  content: { type: String, required: true },
  category: { type: String, default: 'general' },
  createdAt: { type: Date, default: Date.now },
});

module.exports =  mongoose.models.Feedback|| mongoose.model('Feedback', feedbackSchema);
