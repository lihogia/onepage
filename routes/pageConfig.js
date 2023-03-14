const createError = require('http-errors');
const express = require('express');
const router = express.Router();
const fs = require('fs/promises');
const constants = require('fs');
const format = require('util').format;
const multiparty = require('multiparty');
const DEFAULT_CONFIG = './bin/default.json';
const SAVE_CONFIG = './bin/onepage.json';

/* Load default.json file */
async function loadOnePage(filepath) {
    try {
      const data = await fs.readFile(filepath, {encoding: 'utf-8'});
      return JSON.parse(data);
    }catch (err) {
      throw err;
    }
  }

/** Save content to onepage.json file */
async function saveOnePage(filepath, content) {
  try {
    await fs.writeFile(filepath, content);
  }catch (err) {
    throw err;
  }
}

async function setUseConfig() {
  try {
    await fs.access(USE_CONFIG, constants.F_OK, (err) => {
      if (err) {
        USE_CONFIG = DEFAULT_CONFIG;
      }
    });
  }catch (err) {
    USE_CONFIG = DEFAULT_CONFIG;
  }

}

/** Check which file to use to load the onepage config */
let USE_CONFIG = SAVE_CONFIG;
setUseConfig();

/** GET page config */
router.get('/', function(req, res, next) {
    try {
        loadOnePage(USE_CONFIG)
        .then(result => {
            res.send(JSON.stringify(result));
        })
    }catch (err) {
      next(createError(500, err));
    }
});

/** POST onepage form */
router.post('/', function(req, res, next) {
  const form = new multiparty.Form();

  form.on('error', next);

  form.on('field', function (name, value) {
    if (name != 'saveOnePageForm_onePageData') return;

    console.log('OnePage data has been submitted.');
    const content = JSON.stringify(JSON.parse(value), null, 2);
    //console.log(content);
    try {
      saveOnePage(SAVE_CONFIG, content);
      res.json({status: 'success'});
    }catch (err) {
      // res.json({status: 'failure'});
      next(createError(500, err));
    }
  });

  form.parse(req);


  //res.send('Got a POST request at /pageConfig');

});
  
module.exports = router;