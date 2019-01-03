const express = require("express");
const bodyParser = require("body-parser");

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

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
