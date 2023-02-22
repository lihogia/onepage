const express = require('express');
const router = express.Router();
const fs = require('fs/promises');
const ONEPAGE = './bin/onepage.json';

const TEST1 = `{
    "name": "John",
    "hobbies": ["sleep", "read"]
}`;

const TEST = `{
    "columns": [
        {
            "category": "Test Actions",
            "columnid": "col1",
            "sections": [
                { 
                    "subcategory": "Google - linh.hong.sg", 
                    "links": [
                        { 
                            "title": "Mail",
                            "url": "https://mail.google.com/mail/u/1/"
                        },
                        { 
                            "title": "Calendar",
                            "url": "https://calendar.google.com/calendar/b/1/"
                        },
                        {
                            "title": "Drive",
                            "url": "https://drive.google.com/u/1/"
                        }
                    ]
                }  
            ]
        }
    ]
  }
`;

/* {
    "name": "John",
    "age": 34
}
 */

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
        loadOnePage(ONEPAGE)
        .then(result => {
            console.log(result);
            res.send(JSON.stringify(result));
        })

/*       let json = JSON.parse(TEST);
      
      res.send(JSON.stringify(json));
 */    }catch (err) {
      next(createError(500));
    }
  });
  
  module.exports = router;