const express = require('express');
const app = express();
const compression = require('compression');
const database = require('./database.js');


app.use(compression());

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}


app.use(require('body-parser').urlencoded({
    extended: false
}));

app.use(require('body-parser').json())



app.post('/createJob', (req, res) => {
    console.log("this is happening");
    return database.createJob(req.body.restname, req.body.jobtype, req.body.hourpay, req.body.typepay,
        req.body.schedule, req.body.contact, req.body.address, req.body.phone, req.body.area).then(results => {
        req.session.userId = results[0].id;
        res.json({
            success: true
        });
})
})


app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
