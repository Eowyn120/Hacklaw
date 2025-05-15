var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('modulos', {title: 'Inicio'})
});

router.get('/logout', function(req, res, next){
  res.redirect('/')
});

module.exports = router;
