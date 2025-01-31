const express = require("express");
const router = express.Router();

const UserModel = require("../models/user");

router.get("/", async function (req, res) {
  
  try {
    const currentUser = await UserModel.findById(req.session.user._id);

    res.render("books/index.ejs", {
      books: currentUser.books,
    });

  } catch (err) {
    
    res.send("Error Rendering all books check terminal");
  }
});

router.get("/new", function (req, res) {
  res.render("books/new.ejs");
});

router.put('/:bookId', async function(req, res){
	try {
		
		const currentUser = await UserModel.findById(req.session.user._id)
		
		const book = currentUser.books.id(req.params.bookId)
		
		book.set(req.body) 
		
		await currentUser.save()
		
		res.redirect(`/users/${currentUser._id}/books/${book._id}`)


	} catch(err){
		
		res.send("error updating book, check terminal")
	}
})


router.get('/:bookId/edit', async function(req, res){
	try {
		
		const currentUser = await UserModel.findById(req.session.user._id)
		
		const book = currentUser.books.id(req.params.bookId)
		
		res.render('books/edit.ejs', {
			book: book
		})
	

	} catch(err){
		
		res.send('Error getting edit form, check terminal')
	}
})


router.delete('/:bookId', async function(req, res){
	try {
		
		const currentUser = await UserModel.findById(req.session.user._id)
		
		currentUser.books.id(req.params.bookId).deleteOne();
		
		await currentUser.save()
	
		res.redirect(`/users/${currentUser._id}/books`)

	} catch(err){
		
		res.send('Error deleting book, check terminal!')
	}
})



router.get('/:bookId', async function(req, res){
	
	try {
		
		const currentUser = await UserModel.findById(req.session.user._id)
		
		const book = currentUser.books.id(req.params.bookId)
		
        
		res.render('books/show.ejs', {
			book: book
		})

	} catch(err){
		
		res.send("error and show page check your terminal!")
	}
})

router.post("/", async function (req, res) {
    
  try {
    
    const currentUser = await UserModel.findById(req.session.user._id);
    
    currentUser.books.push(req.body);
   
    await currentUser.save();
    
   
    res.redirect(`/users/${currentUser._id}/books`);
  } catch (err) {
    
    res.send("Error check the terminal to debug");
  }
});


module.exports = router;