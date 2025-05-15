var express = require('express');
var router = express.Router();

// Visualizacion Pagina de Inicio
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hacklaw' });
});

//Visualizacion Paginas de Presentacion de los Modulos
//Modulo 1
router.get('/md1', function(req, res, next){
  res.render('modulo1', {title: 'Introduccion'});
});
//Modulo 2
router.get('/md2', function(req, res, next){
  res.render('modulo2', {title: 'Marco Legal'});
});
//Modulo 3
router.get('/md3', function(req, res, next){
  res.render('modulo3', {title: 'Legislacion Venezolana'});
});
//Modulo 4
router.get('/md4', function(req, res, next){
  res.render('modulo4', {title: 'Prevencion y Practicas'});
});

router.get('/register', function(req, res, next){
  res.render('registro', {title: 'Registro Nutricionista'});
});

router.get('/login', function(req, res, next){
  res.render('login', {title: 'Inicio de Sesión'});
});

router.post('/register', function(req, res, next){
  const {nombre, apellido, email, password, password2} = req.body;
  console.log(req.body);
  res.send('Registro')
});

router.post('/login', function(req, res, next){
  const {email, password} = req.body;
  console.log(req.body);
  if (email == 'admin' && password == 'admin') {
    res.redirect('/users');
  } else {
    res.send('Credenciales incorrectas');
  }
});


module.exports = router;
