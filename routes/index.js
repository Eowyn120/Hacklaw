var express = require('express');
var router = express.Router();

const estudiantesModel = require ('../models/estudiantes');

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
  if (!req.session.auth){
    res.render('login', {title: 'Inicio de Sesión'});
  }else{
    res.redirect('/users');
  }
});

router.post('/register', function(req, res, next){
  const {nombre, apellido, cedula, email, password, preg_seg, resp_seg} = req.body;
    estudiantesModel
    .registrarEstudiante(nombre, apellido, cedula, email, password, preg_seg, resp_seg)
    .then(()=>{
      res.redirect('/login');
    })
    .catch((err)=>{
      return res.status(500).send('Error en el registro del estudiante')
    })
});

router.post('/login', function(req, res, next){
  const {email, password} = req.body;
  estudiantesModel
  .inicioSesion(email)
  .then((datos)=>{
    concat = datos[0].password;
    concat2 = datos[0].id
    console.log(concat2);
    if (password == concat){
      req.session.auth = true;
      req.session.userid = concat2;
      res.redirect('/users');
    }else{
      res.send('Credenciales invalidas')
    }
  })
  .catch((err)=>{
    console.error(err.message);
    return res.status(500).send('Error en el inicio de sesion')
  })
});


module.exports = router;
