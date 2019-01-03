const express = require("express");
const router = express.Router();
const axios = require("axios");

// @route   GET suggestions/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) =>
  res.json({ msg: "Suggestions route works!" })
);

// @route   GET suggestions/:query
// @desc    Get list of suggestions
// @access  Public
router.get("/:userInput", (req, res) => {
  const { recipe_puppy } = require("../constants/URLs");
  const { userInput } = req.params;
  // TODO: validate user input before sent further
  // CONSIDER: fetching first pages for all suggested words before user takes decision

  axios
    .get(`${recipe_puppy}/ing.php?q=${userInput}`)
    .then(response => {
      let suggestionsArray = response.data.trim().split(/\n/gm);
      res.send({ body: suggestionsArray });
    })
    .catch(err => {
      console.error(err.message);
    });
});

module.exports = router;
