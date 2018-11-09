var spicedPg = require('spiced-pg');
var bcrypt = require('bcryptjs');
// var secrets = require('./secrets.json');
var dbUrl = 'postgres:wilfredo:789@localhost:5432/jobdirecto';
var db = spicedPg(dbUrl);


exports.createJob = function (restname, jobtype, hourpay, typepay, schedule, contact, address, phone, area) {
    return db.query (`
        INSERT INTO jobs
        (restname, jobtype, hourpay, typepay, schedule, contact, address, phone, area)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        returning *;
        `,
        [restname, jobtype, hourpay, typepay, schedule, contact, address, phone, area]
    )
    .then(function (results) {
        return results.rows;
    });
};
