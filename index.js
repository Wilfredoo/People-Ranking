const express = require('express');
const app = express();
const compression = require('compression');
const database = require('./database.js');
const cookieSession = require('cookie-session');

//do the req body
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

app.use(cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 14
}));


app.use(require('body-parser').json())

app.get("/getpeople", function(req, res) {
    return database.getpeople().then(data => {
      console.log("where is my soup", req.body);
        res.json({
            data
        });
    });
});

app.get("/getuser", function(req, res) {
  console.log(req.session);
      res.json(req.session);
});

app.post('/register-user', function(req, res) {
    database.hashPassword(req.body.password)
        .then(hash => {
            return database.registerUser(req.body.alias, req.body.email, hash)
                .then(results => {
                    // req.session.userId = results[0].id;
                    res.json({success:true});
                })
                .catch(err => {
                    console.log(err);
                    res.json({success:false});
                });
        })
        .catch(err => {
            console.log(err);
        });
});


app.post('/log-in', (req, res) => {
    database.showHashPw(req.body.email)
        .then(userPw => {
            if (!userPw) {
                res.json({success:false});
            } else {
                return database.checkPassword(req.body.password, userPw);
            }
        })
        .then(doesMatch => {
            if(doesMatch) {
                database.getUser(req.body.email).then(user => {
                  console.log("im here session", req.session);
                    req.session.userId = user.id;
                    req.session.userName = user.alias;
                    console.log("im here session2", req.session);

                    res.redirect('/');
                });
            } else {
                res.json({success:false});
            }
        })
        .catch(err => {console.log(err);});
});


app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


app.listen(process.env.PORT || 8080);
