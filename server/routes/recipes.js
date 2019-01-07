const express = require("express");
const router = express.Router();
const axios = require("axios");

// @route   GET recipes/test
// @desc    Tests recipes route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Recipes route works!" }));

// @route   GET recipes/:ingredients
// @desc    Get list of recipes
// @access  Public
router.get("/:query", (req, res) => {
  const { recipe_puppy } = require("../constants/URLs");
  const { query } = req.params;
  // TODO: validate user input before sent further,
  // In such case, return new query string (encoded)
  // This could be made by comparing query to suggestions...

  // TODO: get further pages and concatenate until the content gets repeated;
  let page = 1;

  // Send the first page immediately:
  let data;
  axios
    .get(`${recipe_puppy}/api/?i=${query}&p=${page}`)
    .then(response => {
      data = response.data.results;
      res.send(data);
    })
    .catch(err => {
      console.error(
        `:::${err}::: 
        (probably a 'TOMATO SAUCE ERROR' --- unidentified problem with the Recipe Puppy API):
        For any known query api responds with [], for <tomato%20sauce> however, it gives an error
:::::::::::::::::::::::::::::::::::::::::::::::`
      );
    });
});

module.exports = router;
