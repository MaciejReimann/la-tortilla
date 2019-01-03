const express = require("express");
const path = require("path");
// git remote add heroku https://git.heroku.com/<test-project>.gitconst bodyParser = require("body-parser");

// // Import routes
// const recipes = require("./routes/recipes");
// const suggestions = require("./routes/suggestions");

// Set up port
const PORT = process.env.PORT || 5000;

// Initialize express
const app = express();

// Body parser
// app.use(bodyParser.json());

// // Use routes
// app.use("/recipes", recipes);
// app.use("/suggestions", suggestions);

// Set static folder
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
