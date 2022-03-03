const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit:10,
    password:'ruutti',
    user:'root',
    database:'mydb',
    host:'localhost',
    port:'3307'
});

let matkakohde ={};

matkakohde.all = () =>{
return new Promise((resolve,reject)=>{
pool.query('select * from matkakohde',(err,results)=>{
    if(err){
        return reject(err);
    }
    return resolve(results);
});
});
};

matkakohde.one = (idmatkakohde)=>{
    return new Promise((resolve,reject)=>{
        pool.query('select * from matkakohde WHERE idmatkakohde = ?',[idmatkakohde],(err,results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
        });
        };


module.exports = matkakohde;