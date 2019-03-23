const spicedPg = require('spiced-pg');
let secrets;
let dbUrl;
if (process.env.NODE_ENV === 'production') {
    secrets = process.env
    dbUrl = secrets.DATABASE_URL
} else {
    secrets = require('./secrets.json')
    dbUrl = `postgres:${secrets.dbUser}:${secrets.dbPassword}@localhost:5433/puas`;
}
const db = spicedPg(dbUrl);
var bcrypt = require('bcryptjs');

exports.getpeople = function() {
    return db.query(`SELECT *
        FROM peoplelist
        ;`)
        .then(results => {
            return results.rows
        })
}

exports.hashPassword = function(plainTextPassword) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(function(err, salt) {
            if (err) {
                return reject(err);
            }
            bcrypt.hash(plainTextPassword, salt, function(err, hash) {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    });
};

exports.showHashPw = function (email) {
    return db.query(`SELECT password FROM users WHERE email = $1`, [email])
        .then(function(result) {
            return result.rows[0] && result.rows[0].password;
        });
};


exports.registerUser = function(alias, email, hashedpw) {
    return db.query(`
        INSERT INTO users
        (alias, email, password)
        VALUES ($1, $2, $3)
        returning *;
        `,
            [alias, email, hashedpw]
        )
        .then(function(results) {
            return results.rows;
        });
};

exports.checkPassword = function(textEnteredInLoginForm, hashedPasswordFromDatabase) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(textEnteredInLoginForm, hashedPasswordFromDatabase, function(err, doesMatch) {
            if (err) {
                reject(err);
            } else {
                resolve(doesMatch);
            }
        });
    });
};

exports.getUser = function (email) {
    return db.query(`SELECT id, alias FROM users WHERE email = $1`, [email])
        .then(function(result) {
            return result.rows[0];
        });
};
