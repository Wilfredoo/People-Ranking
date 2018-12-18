const spicedPg = require('spiced-pg');
let secrets;
let dbUrl;
if (process.env.NODE_ENV === 'production') {
    secrets = process.env
    dbUrl = secrets.DATABASE_URL
} else {
    secrets = require('./secrets.json')
    dbUrl = `postgres:${secrets.dbUser}:${secrets.dbPassword}@localhost:5433/jobdirecto`;
}
const db = spicedPg(dbUrl);


exports.publishJob = function(restname, jobtype, hourpay, typepay, schedule, contact, address, area, phone) {
    console.log("check out this restname in publish database: ", restname);
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

exports.getDate = function(id) {
    return db.query(`SELECT created_at FROM jobs WHERE id = $1`, [id])
        .then(results => {
            return results.rows[0]
        })
}

exports.getJobDetails = function() {
    return db.query(`SELECT id, restname, jobtype, hourpay, typepay, schedule, contact, address, phone FROM jobs WHERE id = $1`, [id])
        .then(results => {
            console.log("results in getJobDetails: ", results.rows[0]);
            return results.rows[0]
        })
}

exports.getJobforCorrect = function(id) {
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
