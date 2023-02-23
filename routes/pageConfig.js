const express = require('express');
const router = express.Router();
const fs = require('fs/promises');
const DEFAULT_CONFIG = './bin/onepage.json';

/* Load onepage.json file */
async function loadOnePage(filepath) {
    try {
      const data = await fs.readFile(filepath, {encoding: 'utf-8'});
      return JSON.parse(data);
    }catch (err) {
      throw err;
    }
  }

/* GET page config */
router.get('/', function(req, res, next) {

    try {
        loadOnePage(DEFAULT_CONFIG)
        .then(result => {
            res.send(JSON.stringify(result));
        })
    }catch (err) {
      next(createError(500));
    }
});
  
  module.exports = router;