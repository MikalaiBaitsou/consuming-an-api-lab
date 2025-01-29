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
//   postingLink: String,
  description: String, // Add this field if it doesn't exist
  stars: Number,
  publishedYear: Number,
  genre: {
    type: String,
    // enums are the options that you have as the value of status
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
  // 1 to many relationship using embedding
  // 1 user has many applications, application belongs to a User
  books: [bookSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;




