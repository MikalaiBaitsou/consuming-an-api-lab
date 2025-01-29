const express = require("express");
const router = express.Router();

const UserModel = require("../models/user");

router.get("/", async function (req, res) {
  console.log(req.session, " req.session in index of books");
  try {
    const currentUser = await UserModel.findById(req.session.user._id);

    res.render("books/index.ejs", {
      books: currentUser.books,
    });

  } catch (err) {
    console.log(err);
    res.send("Error Rendering all books check terminal");
  }
});

router.get("/new", function (req, res) {
  res.render("books/new.ejs");
});

router.put('/:bookId', async function(req, res){
	try {
		// find the logged in the user
		const currentUser = await UserModel.findById(req.session.user._id)
		// find the current Application (Mongoose document method)
		const book = currentUser.books.id(req.params.bookId)
		// update the application (mongoose Document method called .set)
		book.set(req.body) // set takes the updates on the object( req.body, contents of the form)
		// tell the database we made the update
		await currentUser.save()

		// redirect back to the show page
		res.redirect(`/users/${currentUser._id}/books/${book._id}`)


	} catch(err){
		console.log(err)
		res.send("error updating book, check terminal")
	}
})



// Job of the this function is to give the form to the client
// to edit an application (form is prefilled out!)
router.get('/:bookId/edit', async function(req, res){
	try {
			// Look up the user, then grab the application that matches the id in params
		// from the user's applications array
		const currentUser = await UserModel.findById(req.session.user._id)
		// find the application ("The google" Mongoose document methods)
		const book = currentUser.books.id(req.params.bookId)
		// respond to the client with the ejs page
		res.render('books/edit.ejs', {
			book: book
		})
	

	} catch(err){
		console.log(err)
		res.send('Error getting edit form, check terminal')
	}
})


router.delete('/:bookId', async function(req, res){
	try {
		// look up the user, because the user has the applications array
		// Google (Mongoose Model Methods)
		const currentUser = await UserModel.findById(req.session.user._id)
		// look up and delete the application in the array that matches the iid
		// in the params
		// Google (Mongoose Document Methods)
		currentUser.books.id(req.params.bookId).deleteOne();
		// tell the database that we deleted application in the array
		await currentUser.save()


		// to the client to make a get request to the applications/index route
		res.redirect(`/users/${currentUser._id}/books`)

	} catch(err){
		console.log(err)
		res.send('Error deleting book, check terminal!')
	}
})


// show route after the new! So express matches the new
router.get('/:bookId', async function(req, res){
	// THe job of this function is to render a specific application
	try {
		// Look up the user, then grab the application that matches the id in params
		// from the user's applications array
		const currentUser = await UserModel.findById(req.session.user._id)
		// find the application ("The google" Mongoose document methods)
		const book = currentUser.books.id(req.params.bookId)
		// respond to the client with the ejs page
        console.log(book)
		res.render('books/show.ejs', {
			book: book
		})

	} catch(err){
		console.log(err)
		res.send("error and show page check your terminal!")
	}
})

router.post("/", async function (req, res) {
    console.log(req.body)
  try {
    // look up the user
    const currentUser = await UserModel.findById(req.session.user._id);
    // then add the contents of the form to the users applications array
    currentUser.books.push(req.body);
    // anytime we mutate a document we must tell the database
    // by calling .save
    await currentUser.save();
    console.log(currentUser, " <- currentUser");
    // redirect back to the index route
    res.redirect(`/users/${currentUser._id}/books`);
  } catch (err) {
    console.log(err);
    res.send("Error check the terminal to debug");
  }
});

// we need to mount the router in our server.js in order to use it!
module.exports = router;