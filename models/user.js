const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  title: {
    type: String, 
    required: true
  },
  author: {
    type: String,
    required: true
  }, 
  notes: String,

  description: String, 
  stars: Number,
  publishedYear: Number,
  genre: {
    type: String,
    
    enum: [
        'Fiction',
        'Non-Fiction',
        'Fantasy',
        'Science Fiction',
        'Mystery',
        'Biography',
        'Romance',
        'Thriller',
        'Horror',
        'Self-Help',
        'History',
        'Philosophy',
        'Poetry',
        'Drama',
        'Adventure',
        'Young Adult',
        'Children',
        'Graphic Novel',
        'Classics',
        'Cooking',
        'Novel'
    ],
  }
})


const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
 
  books: [bookSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;




