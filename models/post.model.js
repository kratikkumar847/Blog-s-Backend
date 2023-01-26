const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogPost = Schema({
  username: String,
  title: String,
  body: String,
  like: {
    type: Number,
    default: 0,
  },
  share: {
    type: Number,
    default: 0,
  },
  comment: {
    type: Number,
    default: 0,
  },
})

module.exports = mongoose.model('BlogPost', BlogPost)
