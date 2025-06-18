const sqlite3 = require ('sqlite3').verbose();
const { Console } = require('console');
const path = require ('path');


//Conection Data Base
const db_name = path.join(__dirname, '../database', 'hacklaw.db');
const db = new sqlite3.Database(db_name, err =>{
    if (err) { 
        console.error(err.message);
    }else {
        console.log('conexion a la Base de Datos Exitosa!!!');
    }
});

db.serialize(() =>{
    const estudiantes='CREATE TABLE IF NOT EXISTS estudiantes (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre varchar (25) NOT NULL, apellido varchar (25) NOT NULL, cedula varchar(8) NOT NULL, correo varchar(30) NOT NULL, password varchar(16) NOT NULL, preg_seg varchar(16) NOT NULL, resp_seg varchar(8) NOT NULL)';
    db.run(estudiantes, err =>{
        if (err){
            console.error(err.message);
        } else{
            console.log("Anexada de la tabla estudiantes exitosa!!!");
        }
    });
    const evaluaciones='CREATE TABLE IF NOT EXISTS evaluaciones (id INTEGER PRIMARY KEY AUTOINCREMENT, quiz_1 INTEGER, quiz_2 INTEGER, quiz_3 INTEGER, quiz_4 INTEGER, quiz_final INTEGER, estudiante_id INTEGER, FOREIGN KEY (estudiante_id) REFERENCES estudiantes (id))';
    db.run(evaluaciones, err =>{
        if (err){
            console.error(err.message);
        } else{
            console.log("Anexada de la tabla evaluaciones exitosa!!!");
        }
    });
    const modulo1='CREATE TABLE IF NOT EXISTS modulo_1 (id INTEGER PRIMARY KEY AUTOINCREMENT, modo INTEGER DEFAULT "1", act_1 INTEGER, act_2 INTEGER, act_3 INTEGER, estudiante_id INTEGER, FOREIGN KEY (estudiante_id) REFERENCES estudiantes (id))';
    db.run(modulo1, err =>{
        if (err){
            console.error(err.message);
        } else{
            console.log("Anexada de la tabla modulo1 exitosa!!!");
        }
    });
    const modulo2='CREATE TABLE IF NOT EXISTS modulo_2 (id INTEGER PRIMARY KEY AUTOINCREMENT, modo INTEGER DEFAULT "0", act_1 INTEGER, act_2 INTEGER, act_3 INTEGER, estudiante_id INTEGER, FOREIGN KEY (estudiante_id) REFERENCES estudiantes (id))';
    db.run(modulo2, err =>{
        if (err){
            console.error(err.message);
        } else{
            console.log("Anexada de la tabla modulo2 exitosa!!!");
        }
    });
    const modulo3='CREATE TABLE IF NOT EXISTS modulo_3 (id INTEGER PRIMARY KEY AUTOINCREMENT, modo INTEGER DEFAULT "0", act_1 INTEGER, act_2 INTEGER, act_3 INTEGER, estudiante_id INTEGER, FOREIGN KEY (estudiante_id) REFERENCES estudiantes (id))';
    db.run(modulo3, err =>{
        if (err){
            console.error(err.message);
        } else{
            console.log("Anexada de la tabla modulo3 exitosa!!!");
        }
    });
    const modulo4='CREATE TABLE IF NOT EXISTS modulo_4 (id INTEGER PRIMARY KEY AUTOINCREMENT, modo INTEGER DEFAULT "0", act_1 INTEGER, act_2 INTEGER, act_3 INTEGER, estudiante_id INTEGER, FOREIGN KEY (estudiante_id) REFERENCES estudiantes (id))';
    db.run(modulo4, err =>{
        if (err){
            console.error(err.message);
        } else{
            console.log("Anexada de la tabla modulo4 exitosa!!!");
        }
    });
})

module.exports = db;