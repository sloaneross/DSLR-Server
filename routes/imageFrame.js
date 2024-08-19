var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:file', function(req, res, next) {
    console.log (req.params.file)
    const filepath = "/images/" + req.params.file
    console.log("path" + filepath)
    res.render('frame', { file: filepath });
});

module.exports = router;
