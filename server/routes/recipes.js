const express = require("express");
const router = express.Router();
const axios = require("axios");

// @route   GET recipes/test
// @desc    Tests recipes route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Recipes route works!" }));

// @route   GET recipes/:ingredients/:p
// @desc    Get list of recipes for either first page, or next X pages
// @access  Public
router.get("/:query/:p", (req, res) => {
  const { recipe_puppy } = require("../constants/URLs");
  const { query, p } = req.params;
  // CONSIDER: validate user input before sent further,
  // In such case, return new query string (encoded)
  // This could be made by comparing query to suggestions...

  // Assign arbitrarily maximum pages per request:
  const countSubsequentPages = 10;
  // Initialize empty array in which incoming data will be stored:
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
    for (let i = 2; i <= countSubsequentPages; i++) {
      axios
        .get(`${recipe_puppy}/api/?i=${query}&p=${i}`)
        .then(response => {
          data = data.concat(response.data.results);
          if (i === countSubsequentPages) {
            res.send(data);
          }
        })
        .catch(err => {
          console.error(
            `:::ERROR FETCHING PAGE ${i} FROM THE API:::\n(probably fetched all pages for given ingredients)`
          );
          console.error(err);
        });
    }
  }
});

module.exports = router;
