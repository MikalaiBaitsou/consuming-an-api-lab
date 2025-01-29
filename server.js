const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require("express-session");

// iimport controllers  (our endpoints)===============================
const authController = require("./controllers/auth.js");
const bookCtrl = require("./controllers/books.js");
// import middleware functions =====================================
// we use these below
const isSignedIn = require("./middleware/is-signed-in.js");
const passUserToView = require("./middleware/pass-user-to-view.js");

const port = process.env.PORT ? process.env.PORT : "3000";

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// MIDDLEWARE ================================
// parses the form submissions to create req.body
app.use(express.urlencoded({ extended: false }));
// we can process delete & put requests
app.use(methodOverride("_method"));
// log out http requests into the server
app.use(morgan("dev"));
// creates/process our session cookies
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// USING THE CUSTOM MIDDLEWARE FUNCTION
// this must exist before our endpoints (because it is attaching) the user
// variable to the response (ejs page)
app.use(passUserToView);
// =============================================
// ENDPOINTS ===================================
// Landing Page
app.get("/", (req, res) => {
  console.log(req.session, " <- req.session");

  // if we are logged in lets redirect the user to their applications index page
  if (req.session.user) {
    res.redirect(`/users/${req.session.user._id}/books`);
  } else {
    // otherwise show the landing page
    res.render("index.ejs");
  }

});

// mounting the controllers at an address on the server
app.use("/auth", authController);


// Check for log before our application endpoints
app.use(isSignedIn)
app.use("/users/:userId/books", bookCtrl);

//=============================================
// EXAMPLE OF HOW YOU CAN PROTECT A ROUTE
// app.get('/vip-lounge', (req, res) => {
//   if (req.session.user) { // checking to see if someone is logged in
//     res.send(`Welcome to the party ${req.session.user.username}.`);
//   } else { // the user is not logged
//     res.send('Sorry, no guests allowed.');
//   }
// });

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
