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
router.get("/:query/:p", (req, res) => {
  const { recipe_puppy } = require("../constants/URLs");
  const { query, p } = req.params;
  console.log(p === "1");
  // TODO: validate user input before sent further,
  // In such case, return new query string (encoded)
  // This could be made by comparing query to suggestions...

  // TODO: get further pages and concatenate until the content gets repeated;
  let data = [];
  // Send the first page immediately:
  if (p === "1") {
    axios
      .get(`${recipe_puppy}/api/?i=${query}&p=${1}`)
      .then(response => {
        data = data.concat(response.data.results);
        res.send(data);
      })
      .catch(err => {
        console.error(err);
      });
  } else {
    for (let i = 2; i < 5; i++) {
      axios
        .get(`${recipe_puppy}/api/?i=${query}&p=${i}`)
        .then(response => {
          data = data.concat(response.data.results);
          if (i === 4) {
            res.send(data);
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
});

module.exports = router;
