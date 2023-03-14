const createError = require('http-errors');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  try {
    res.render('edit', { title: 'One Page Editing'});
  }catch (err) {
    next(createError(500));
  }
});

module.exports = router;
