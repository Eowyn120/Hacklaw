const db = require ('../database/conection');

module.exports = {
    registrarEstudiante(nombre, apellido, cedula, correo, password, preg_seg, resp_seg){
        return new Promise ((resolve, reject)=>{
            const sql= 'INSERT INTO estudiantes (nombre, apellido, cedula, correo, password, preg_seg, resp_seg) VALUES (?, ?, ?, ?, ?, ?, ?)'
            db.run (sql, [nombre, apellido, cedula, correo, password, preg_seg, resp_seg], function(err){
                if (err) {
                    reject (err)
                } else {
                    const insertId = this.lastID;
                    const sql2= 'INSERT INTO evaluaciones (estudiante_id) VALUES (?)';
                    db.run(sql2, [insertId], (err)=>{
                        if (err) reject(err);
                        else {
                            console.log('FUNCIONA EVALUACIONES')
                            const sql3= 'INSERT INTO modulo_1 (estudiante_id) VALUES (?)';
                            db.run(sql3, [insertId], (err)=>{
                                if (err) reject(err);
                                else {
                                    console.log('FUNCIONA modulo1')
                                    const sql4= 'INSERT INTO modulo_2 (estudiante_id) VALUES (?)';
                                    db.run(sql4, [insertId], (err)=>{
                                        if (err) reject(err);
                                        else {
                                            console.log('FUNCIONA modulo2')
                                            const sql5= 'INSERT INTO modulo_3 (estudiante_id) VALUES (?)';
                                            db.run(sql5, [insertId], (err)=>{
                                                if (err) reject(err);
                                                else {
                                                    console.log('FUNCIONA modulo3')
                                                    const sql6= 'INSERT INTO modulo_4 (estudiante_id) VALUES (?)';
                                                    db.run(sql6, [insertId], (err)=>{
                                                        if (err) reject(err);
                                                        else {
                                                            console.log('FUNCIONA modulo4')                            
                                                        }
                                                    })                            
                                                }
                                            })                            
                                        }
                                    })                            
                                }
                            })
                        } 
                    })
                    resolve({ id: insertId, message: 'Estudiante registrado exitosamente' });
                };
            });
        })
    },
    inicioSesion(correo){
        return new Promise ((resolve, reject)=>{
           const sql= 'SELECT id, password FROM estudiantes WHERE correo = ?';
            db.all(sql, [correo], ((err, resultados)=>{
                if (err) reject (err);
                else{ 
                    console.log(JSON.stringify(resultados, null, 4));
                    resolve (resultados);}
            }))
        })
    },
    consultarModulos(estudiante_id){
        return new Promise ((resolve, reject)=>{
            const sql= 'SELECT 1 AS module_num, modo FROM modulo_1 WHERE estudiante_id = ? UNION ALL SELECT 2 AS module_num, modo FROM modulo_2 WHERE estudiante_id = ? UNION ALL SELECT 3 AS module_num, modo FROM modulo_3 WHERE estudiante_id = ? UNION ALL SELECT 4 AS module_num, modo FROM modulo_4 WHERE estudiante_id = ?';
            db.all(sql, [estudiante_id, estudiante_id, estudiante_id, estudiante_id], ((err, resultados)=>{
                if(err) reject(err);
                else{
                    console.log(JSON.stringify(resultados, null, 4));
                    // Procesar los resultados para construir el array de módulos desbloqueados
                    const modulosdesbloqueados = [];
                    resultados.forEach(row => {
                        if (row.modo === 1) {
                            modulosdesbloqueados.push(row.module_num);
                        }
                    });
                    resolve (modulosdesbloqueados);
                }
            }))
        })
    },
    obtenerEstudiante(id){
        return new Promise ((resolve, reject)=>{
           const sql= 'SELECT * FROM estudiantes WHERE id = ?';
            db.all(sql, [id], ((err, resultados)=>{
                if (err) reject (err);
                else{ 
                    console.log(JSON.stringify(resultados, null, 4));
                    resolve (resultados);
                }
            }))
        })
    },
};