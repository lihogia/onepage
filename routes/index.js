const createError = require('http-errors');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  try {
    res.render('index', { title: 'One Page'});
  }catch (err) {
    next(createError(500));
  }
});

module.exports = router;
