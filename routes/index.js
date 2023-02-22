const createError = require('http-errors');
const express = require('express');
const router = express.Router();
const fs = require('fs/promises');
const ONEPAGE = './bin/onepage.json';

const DEFAULT_COLUMN_SCRIPT = `
        myPage = {
          columns: [
              {
                  category: 'Common Actions',
                  columnid: 'col1',
                  sections: [
                      { 
                          subcategory: 'Google - lilogia', 
                          links: [
                              { 
                                  title: 'Mail',
                                  url: 'https://mail.google.com/mail/u/0/',
                              },
                              { 
                                  title: 'Calendar',
                                  url: 'https://calendar.google.com/calendar/b/0/',
                              },
                              {
                                  title: 'Drive',
                                  url: 'https://drive.google.com/u/0/'
                              }
                          ],
                      }  
                  ]
              }
          ],
        };  
`;

/* Load onepage.json file */
async function loadOnePage(filepath) {
  try {
    const data = await fs.readFile(filepath, {encoding: 'utf-8'});
    const onePage = JSON.parse(data);
    console.log(onePage);
    return onePage;
    console.log(onePage.columns[0].sections);
  }catch (err) {
    throw err;
  }
}


/* GET home page. */
router.get('/', function(req, res, next) {
  try {
    const data = loadOnePage(ONEPAGE);
    res.render('index', { title: 'One Page', setColumnsScript: DEFAULT_COLUMN_SCRIPT });
  }catch (err) {
    next(createError(500));
  }
});

module.exports = router;
