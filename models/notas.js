const db = require ('../database/conection');

module.exports = {
    obtenerNotas(id){
        return new Promise ((resolve, reject)=>{
            const sql= 'SELECT * from evaluaciones WHERE estudiante_id = ?';
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