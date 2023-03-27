const express = require('express');
const router = express.Router();

router.get('/:min/:max', function(req, res) {
    const min = parseInt(req.params.min);
    const max = parseInt(req.params.max);

    if (isNaN(min) || isNaN(max)) {
        res.status(400);
        res.json({error: "Bad request. "});
        return;
    }

    const result = Math.round((Math.random() * (max - min)) + min);
    res.json({result: result});
    
});

module.exports = router;