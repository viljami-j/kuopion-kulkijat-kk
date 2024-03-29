const pool = require('./db.js');
const bcrypt = require('bcrypt');

function User() {};

User.prototype = {
    // Find the user data by id or username.
    find : function(user = null, callback)
    {
        // if the user variable is defind
        if(user) {
            // if user = number return field = id, if user = string return field = username.
            var field = Number.isInteger(user) ? 'idmatkaaja' : 'email';
        }
        // prepare the sql query
        let sql = `SELECT * FROM matkaaja WHERE email = ?`;


        pool.query(sql, user, function(err, result) {
            if(err) throw err

            if(result.length) {
                callback(result[0]);
            }else {
                callback(null);
            }
        });
    },

    create : function(body, callback) 
    {

        var pwd = body.password;
        body.password = bcrypt.hashSync(pwd,10);

        var bind = [];
        for(prop in body){
            bind.push(body[prop]);
        }
        let sql = `INSERT INTO matkaaja(email, password) VALUES (?, ?)`;
        pool.query(sql, bind, function(err, result) {
            if(err) throw err;
            callback(result.insertId);
        });
    },

    login : function(email, password, callback)
    {
        this.find(email, function(user) {
            if(user) {
                if(bcrypt.compareSync(password, user.password)) {
                    callback(user);
                    return;
                }  
            }
            callback(null);
        });
        
    }

}

module.exports = User;