const express = require('express');
const router = express.Router();

/* GET users listing. 
/^\/users\/(\d+)$/
*/
router.get(/^\/id=(\d+)$/, function(req, res, next) {
  const userid = parseInt(req.params[0], 10);
  console.log(`id = ${userid}`);
  res.send(`respond with a resource, id = ${userid}`);
});

module.exports = router;
