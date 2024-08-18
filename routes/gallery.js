var express = require('express');
var router = express.Router();
const fs = require('fs');

var images = []

function getFolderFiles(path, extension) {
    let files = fs.readdirSync(path);
    let filenames = files.filter((file) =>
      file.match(new RegExp(`.+\\.${extension}$`, "ig")))
    return (filenames.map ( (filename) => {
            return ({
                filepath:("images/" + filename), 
                name:filename})
        }));
}

const fetchImages = (req, res, next) => {
    images = getFolderFiles("public/images", "png");
    next();
  };


/* GET home page. */
router.get('/', fetchImages, function(req, res, next) {
    console.log(images)
    res.render('gallery', { title: 'D.S.L.R.', imageArray: images });
});

module.exports = router;
