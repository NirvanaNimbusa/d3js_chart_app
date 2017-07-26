var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { header:"Welcome to Data Analysis ",title:"Employment Distribution for Company A,B and C"} );
});

module.exports = router;
