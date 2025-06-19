var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose(); 

const estudiantesModel = require ('../models/estudiantes');


// Función para obtener la conexión a la base de datos (puedes tenerla en un archivo aparte)
function getDb() {
    return new sqlite3.Database('./database/hacklaw.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the SQLite database.');
    });
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.session.auth){
    const estudiante_id = req.session.userid;
    estudiantesModel
    .consultarModulos(estudiante_id)
    .then((datos)=>{
      res.render('modulos', {unlockedModules: datos});
      console.log('llega aqui');
      console.log('Módulos desbloqueados:', datos);
    })
    .catch((err)=>{
      res.status(500).json({ message: 'Error interno del servidor al cargar módulos.' });
    })
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

router.post('/actividades-1', function(req, res, next) {
    if (!req.session.auth || !req.session.userid) {
        return res.status(401).json({ message: 'No autenticado.' });
    }

    const { activity, score } = req.body;
    const studentId = req.session.userid; // Asumiendo que guardas el ID del usuario en la sesión

    if (!['act_1', 'act_2', 'act_3'].includes(activity) || typeof score !== 'number') {
        return res.status(400).json({ message: 'Datos inválidos para la actividad.' });
    }

    const db = getDb();
    const columnMap = {
        'act_1': 'act_1',
        'act_2': 'act_2',
        'act_3': 'act_3'
    };
    const columnName = columnMap[activity];

    // Primero, intenta actualizar si ya existe una entrada para el estudiante
    db.run(`UPDATE modulo_1 SET ${columnName} = ? WHERE estudiante_id = ?`,
        [score, studentId],
        function(err) {
            if (err) {
                console.error(`Error al actualizar la actividad ${activity}:`, err.message);
                return res.status(500).json({ message: 'Error interno del servidor al guardar la actividad.' });
            }
            if (this.changes === 0) {
                // Si no se actualizó ninguna fila, inserta una nueva
                db.run(`INSERT INTO modulo_1 (estudiante_id, ${columnName}) VALUES (?, ?)`,
                    [studentId, score],
                    function(err) {
                        if (err) {
                            console.error(`Error al insertar la actividad ${activity}:`, err.message);
                            return res.status(500).json({ message: 'Error interno del servidor al guardar la actividad.' });
                        }
                        res.json({ message: `Actividad ${activity} guardada con éxito.`, score: score });
                        db.close();
                    }
                );
            } else {
                res.json({ message: `Actividad ${activity} actualizada con éxito.`, score: score });
                db.close();
            }
        }
    );
});


router.post('/quiz-1', function(req, res, next) {
    if (!req.session.auth || !req.session.userid) {
        return res.status(401).json({ message: 'No autenticado.' });
    }

    const { quiz, score } = req.body;
    const studentId = req.session.userid;

    if (quiz !== 'quiz_1' || typeof score !== 'number') {
        return res.status(400).json({ message: 'Datos inválidos para el quiz.' });
    }

    const db = getDb();

    // Lógica para actualizar el quiz_1 en la tabla 'evaluaciones'
    db.run(`UPDATE evaluaciones SET quiz_1 = ? WHERE estudiante_id = ?`,
        [score, studentId],
        function(err) {
            if (err) {
                console.error('Error al actualizar el quiz_1:', err.message);
                return res.status(500).json({ message: 'Error interno del servidor al guardar el quiz.' });
            }

            let unlockedNextModule = false;
            let message = `Quiz final del Módulo 1 guardado. Tu puntaje: ${score.toFixed(2)}%.`;

            // Lógica para desbloquear el siguiente módulo si se aprueba
            if (score >= 60) {
                // Actualizar el campo 'modo' en la tabla 'modulo_2'
                db.run(`UPDATE modulo_2 SET modo = 1 WHERE estudiante_id = ?`,
                    [studentId],
                    function(err) {
                        if (err) {
                            console.error('Error al desbloquear modulo_2:', err.message);
                            message += ' Sin embargo, hubo un error al intentar desbloquear el siguiente módulo.';
                        } else {
                            unlockedNextModule = true;
                            message += ' ¡Módulo 2 desbloqueado!';
                        }
                        res.json({ message: message, score: score, unlockedNextModule: unlockedNextModule });
                        db.close();
                    }
                );
            } else {
                message += ' No has alcanzado la puntuación mínima para desbloquear el siguiente módulo (se requiere 60%).';
                res.json({ message: message, score: score, unlockedNextNextModule: unlockedNextModule });
                db.close();
            }
        }
    );
});

module.exports = router;
