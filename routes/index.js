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
  res.send('PAGINA DE REGISTRO DE USUARIOS, SE ENCUENTRA EN PRODUCCION');
});

router.get('/login', function(req, res, next){
  res.send('PAGINA DE INICIO DE SESION, SE ENCUENTRA EN PRODUCCION');
});

module.exports = router;
