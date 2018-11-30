const express = require('express');
const app = express();
const compression = require('compression');
const database = require('./database.js');
const cookieSession = require('cookie-session');

app.use(compression());
app.use(express.static('public'));

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

app.use(cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 14
}));

app.get("/getJobInfo", function(req, res) {
    res.json({
        data: req.session.job
    });
});

app.get("/getDate", function(req, res) {
    return database.getDate(req.session.jobId).then(data => {
        res.json({
            data
        });
    });
});

app.get("/getJobDetails/:id", function(req, res) {
    return database.getJobInfo(req.params.id).then(data => {
        res.json({
            data
        });
        req.session.restname = data.restname;
    });
});

app.get("/getJobforCorrect", function(req, res) {
    console.log("req session in jobforcorrrect: ", req.session);
    res.json({
        data: req.session.job
    });
});

app.get("/getJobs", function(req, res) {
    return database.getJobs().then(data => {
        res.json({
            data
        });
    });
});


app.post('/finalizeJob', (req, res) => {
    req.session.job = req.body
    res.json({
        success: true
    });
})


app.post('/publishJob', (req, res) => {
    console.log("req.session is here in publish jobbb: ", req.session.job.jobData);
    return database.publishJob(req.body.jobData.data.restname, req.body.jobData.data.jobtype, req.body.jobData.data.hourpay, req.body.jobData.data.typepay,
        req.body.jobData.data.schedule, req.body.jobData.data.contact, req.body.jobData.data.address, req.body.jobData.data.area, req.body.jobData.data.phone).then(() => {
        // req.session.jobId = results[0].id;
        console.log("got back from db");
        req.session = null;
            res.json({
                success: true
            });
            console.log("what is job?", req.session.job);
            console.log("body? ", req.body);
        })
})


app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT || 8080);
// app.listen(8080, function() {
//     console.log("I'm listening.");
// });


// // html
// <input id="pac-input" type="text"
//        placeholder="Enter a location">
// <div id="map"></div>
// <!-- Replace the value of the key parameter with your own API key. -->
// <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCkUOdZ5y7hMm0yrcCQoCvLwzdM6M8s5qk&libraries=places&callback=initMap"
//        async defer></script>
//
//    // JS
//        var autocomplete = new google.maps.places.Autocomplete(input);
//
//          /* autocomplete.bindTo('bounds', map) */;
//
//          autocomplete.addListener('place_changed', function() {
//            infowindow.close();
//            if (!place.geometry) {
//              // User entered the name of a Place that was not suggested and
//              // pressed the Enter key, or the Place Details request failed.
//              return;
//            }
//          });
//
//          document.getElementById('use-strict-bounds')
//              .addEventListener('click', function() {
//                autocomplete.setOptions({strictBounds: this.checked});
//              });
//        }

// my api key
// AIzaSyAlvHYA1vWp2xnGAi6jKbDom6quk-BVG4w
