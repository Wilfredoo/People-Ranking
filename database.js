var spicedPg = require('spiced-pg');
var bcrypt = require('bcryptjs');
// var secrets = require('./secrets.json');
var dbUrl = 'postgres:wilfredo:789@localhost:5432/jobdirecto';
var db = spicedPg(dbUrl);


exports.createJob = function(restname, jobtype, hourpay, typepay, schedule, contact, address, area, phone) {
    return db.query(`
        INSERT INTO jobs
        (restname, jobtype, hourpay, typepay, schedule, contact, address, area, phone)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        returning *;
        `,
            [restname, jobtype, hourpay, typepay, schedule, contact, address, area, phone]
        )
        .then(function(results) {
            return results.rows;
        });
};

exports.getJobInfo = function(id) {
    return db.query(`SELECT id, restname, jobtype, hourpay, typepay, schedule, contact, address, phone FROM jobs WHERE id = $1`, [id])
        .then(results => {
            return results.rows[0]
        })
}

exports.getJobDetails = function() {
    console.log("hi there");
    return db.query(`SELECT id, restname, jobtype, hourpay, typepay, schedule, contact, address, phone FROM jobs WHERE id = $1`, [id])
        .then(results => {
            console.log("results in getJobDetails: ", results.rows[0]);
            return results.rows[0]
        })
}

exports.getJobs = function() {
    return db.query(`SELECT *
        FROM jobs
        ORDER BY id DESC
        ;`)
        .then(results => {
            return results.rows
        })
}
