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
    return database.getJobInfo(req.session.jobId).then(data => {
        res.json({
            data
        });
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
        console.log("here is the data", data.restname);
        res.json({
            data
        });
        req.session.restname = data.restname;
    });
});

app.get("/getJobforCorrect", function(req, res) {
    return database.getJobInfo(req.session.jobId).then(data => {
        res.json({
            data
        });
    });
});

app.get("/getJobs", function(req, res) {
    return database.getJobs().then(data => {
        res.json({
            data
        });
    });
});




app.post('/publishJob', (req, res) => {
    console.log("req.body is here in publish job: ", req.body);
    return database.publishJob(req.body.restname, req.body.jobtype, req.body.hourpay, req.body.typepay,
        req.body.schedule, req.body.contact, req.body.address, req.body.area, req.body.phone).then(results => {
        console.log("results in PUBLISHJOB in index.js: ", results[0]);
        // req.session.jobId = results[0].id;
        res.json({
            success: true
        });
        req.session.jobId = null;

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
