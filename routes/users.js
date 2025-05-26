var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.session.auth){
    res.render('modulos', {title: 'Inicio'});
  }else{
    res.redirect('/login');
  }
});

router.get('/modulo1', function(req, res, next){
  if (req.session.auth){
    res.render('modulo1-user');
  }else{
    res.redirect('/login');
  }
})

router.get('/modulo2', function(req, res, next){
  if (req.session.auth){
    res.render('modulo2-user');
  } else{
    res.redirect('/login');
  }
})

router.get('/modulo3', function(req, res, next){
  if (req.session.auth){
    res.render('modulo3-user');
  } else{ 
    res.redirect('/login');
  }
})

router.get('/modulo4', function(req, res, next){
  if (req.session.auth){
    res.render('modulo4-user');
  }else{ 
    res.redirect('/login');
  }
})


router.get('/logout', function(req, res, next){
  res.redirect('/')
  req.session.destroy();
});

module.exports = router;
