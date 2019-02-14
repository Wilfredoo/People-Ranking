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


exports.publishJob = function(restname, jobtype, hourpay, typepay, schedule, contact, address, area, phone, extrainfo, otro_desc) {
    return db.query(`
        INSERT INTO jobs
        (restname, jobtype, hourpay, typepay, schedule, contact, address, area, phone, extrainfo, otro_desc)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        returning *;
        `,
            [restname, jobtype, hourpay, typepay, schedule, contact, address, area, phone, extrainfo, otro_desc]
        )
        .then(function(results) {
            return results.rows;
        });
};


exports.getJobInfo = function(id) {
    return db.query(`SELECT * FROM jobs WHERE id = $1`, [id])
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
            return results.rows[0]
        })
}

exports.getJobforCorrect = function(id) {
    return db.query(`SELECT id, restname, jobtype, hourpay, typepay, schedule, contact, address, phone FROM jobs WHERE id = $1`, [id])
        .then(results => {
            return results.rows[0]
        })
}

exports.getJobs = function() {
    return db.query(`SELECT *
        FROM jobs
        ORDER BY id DESC
        LIMIT 100
        ;`)
        .then(results => {
            return results.rows
        })
}
