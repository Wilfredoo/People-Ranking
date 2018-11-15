const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const csurf = require("csurf");
const db = require("./db.js");
const s3 = require("./s3");
const s3Url = require("./config.json");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });
//////////////////////////////////////////////////////////////

app.use(compression());
app.use(bodyParser.json());

const cookieSessionMiddleware = cookieSession({
  secret: `You know you love me. XOXO, Gossip Girl.`,
  maxAge: 1000 * 60 * 60 * 24 * 14
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
  cookieSessionMiddleware(socket.request, socket.request.res, next);
});

//////////////////////////////////////////////////////////////

app.use(express.static("public"));

////////////////////////////////////////////////////////////

const diskStorage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, __dirname + "/uploads");
  },
  filename: function(req, file, callback) {
    uidSafe(24).then(function(uid) {
      callback(null, uid + path.extname(file.originalname));
    });
  }
});

const uploader = multer({
  storage: diskStorage,
  limits: {
    fileSize: 2097152
  }
});

//////////////////////////////////////////////////////////////

app.use(csurf());

app.use(function(req, res, next) {
  res.cookie("mytoken", req.csrfToken());
  next();
});

//////////////////////////////////////////////////////////////

if (process.env.NODE_ENV != "production") {
  app.use(
    "/bundle.js",
    require("http-proxy-middleware")({
      target: "http://localhost:8081/"
    })
  );
} else {
  app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

//////////////////////////////////////////////////////////////

app.use(function(req, res, next) {
  if (!req.session.userId && req.url !== "/welcome" && req.url !== "/login") {
    res.redirect("/welcome");
  } else {
    next();
  }
});

//////////////////////////////////////////////////////////////

app.post("/welcome", function(req, res) {
  console.log("trying");
  if (!req.body.password) {
    res.json({
      success: false
    });
  } else {
    db.hashPassword(req.body.password)
      .then(hashedPw => {
        console.log("hashedPw in register: ", hashedPw);
        return db
          .insertNewUser(
            req.body.firstname,
            req.body.lastname,
            req.body.email,
            hashedPw
          )
          .then(result => {
            req.session.loggedIn = true;
            req.session.userId = result.rows[0].id;
            req.session.first = req.body.firstname;
            req.session.last = req.body.lastname;
            res.redirect("/profile");
          })
          .catch(err => {
            console.log("err in first catch in register: ", err);
          });
      })
      .catch(err => {
        console.log("err in last catch: ", err);
      });
  }
});

//////////////////////////////////////////////////////////////

app.post("/login", (req, res) => {
  db.getPassword(req.body.email)
    .then(result => {
      // console.log("HASHED PW: ", result.rows[0].password);
      return db
        .checkPassword(req.body.password, result.rows[0].password)
        .then(results => {
          console.log("User registered:", result);
          if (results) {
            req.session.user = {};
            req.session.userId = result.rows[0].id;
            console.log("req.session: ", req.session);
            res.json({ success: true });
          } else {
            res.json({ success: false });
          }
        })
        .catch(err => {
          console.log("Error in checkPassword: ", err);
        });
    })
    .catch(err => {
      console.log("Error in the getPassword: ", err);
    });
});

//////////////////////////////////////////////////////////////
//
app.get("/user", function(req, res) {
  // console.log("my id: ", req.session.userId);
  db.getUserById(req.session.userId)
    .then(results => {
      res.json(results.rows[0]);
    })
    .catch(error => {
      console.log(error);
    });
});

/////////////////////////////////////////////////////////////

app.post("/upload", uploader.single("file"), s3.upload, function(req, res) {
  // console.log("req.session.user.id: ", req.session.user.id);
  const imgUrl = s3Url.s3Url + req.file.filename;
  db.uploadImages(imgUrl, req.session.userId)
    .then(results => {
      console.log("results: ", results);
      res.json({ imgUrl });
    })
    .catch(error => {
      console.log(error);
    });
});

/////////////////////////////////////////////////////////////

app.post("/usersbio", function(req, res) {
  // console.log("usersbio");
  db.uploadBio(req.body.bio, req.session.userId)
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => {
      console.log("err in postUsersBio: ", err.message);
    });
});

/////////////////////////////////////////////////////////////

app.get("/api-user-id/:id", function(req, res) {
  // console.log("req.params.id ", req.params.id);
  if (req.params.oppId == req.session.userId) {
    console.log("req.params.oppId: ", req.params.oppId);
    res.json("false");
  } else {
    return db
      .getUserById(req.params.id)
      .then(result => {
        // console.log("result in index: ", result);
        res.json(result.rows[0]);
      })
      .catch(err => {
        console.log("err in user id: ", err.message);
      });
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/status/:otherProfileId", function(req, res) {
  console.log(
    "req.params.otherProfileId in get status: ",
    req.params.otherProfileId
  );

  return db
    .getStatus(req.session.userId, req.params.otherProfileId)
    .then(result => {
      // console.log("result in status in index: ", result);
      result = result.rows[0];
      console.log("result heeeeere: ", result);
      if (result) {
        if (result.accepted) {
          // console.log("get status ", result);
          res.json({ textInsideButton: "End Friendship" });
        } else if (!result.accepted) {
          if (result.sender_id == req.session.userId) {
            res.json({ textInsideButton: "Cancel Friend Request" });
          } else if (result.receiver_id == req.session.userId) {
            res.json({ textInsideButton: "Accept Friend Request" });
          }
        }
      } else if (!result) {
        console.log("MAKE FRIEND REQUEST");
        res.json({ textInsideButton: "Make Friend Request" });
      }
    })
    .catch(err => {
      console.log("err: ", err);
    });
});

app.post("/makeRequest/:otherProfileId", function(req, res) {
  console.log("otherProfileId: ", req.params.otherProfileId);
  return db
    .makeRequest(req.session.userId, req.params.otherProfileId)
    .then(result => {
      if (req.session.userId == result.sender_id) {
        res.json({ textInsideButton: "Cancel Friend Request" });
      }
    })
    .catch(err => {
      console.log("err: ", err);
    });
});

app.post("/cancelRequest/:otherProfileId", function(req, res) {
  console.log("cancel request post happened", req.params);
  return db
    .cancelRequest(req.session.userId, req.params.otherProfileId)
    .then(result => {
      console.log("RESULT IN POST CANCELrequest", result);
      if (result) {
        res.json({ textInsideButton: "Make Friend Request" });
      }
    })
    .catch(err => {
      console.log("err in cancelRequest POST: ", err.message);
    });
});

app.post("/acceptFriendship/:otherProfileId", function(req, res) {
  return db
    .acceptFriendship(req.session.userId, req.params.otherProfileId)
    .then(result => {
      console.log("RESULT IN POST ACCEPTFRIENDSHIP INDEX", result);
      res.json({ textInsideButton: "End Friendship" });
    })
    .catch(err => {
      console.log("err in /acceptFriendship POST: ", err.message);
    });
});

app.post("/endFriendship/:otherProfileId", function(req, res) {
  return db
    .endFriendship(req.session.userId, req.params.otherProfileId)
    .then(result => {
      console.log("RESULT IN POST EndFRIENDSHIP INDEX", result);
      res.json({ textInsideButton: "Make Friend Request" });
    })
    .catch(err => {
      console.log("err in /endFriendship POST: ", err.message);
    });
});

///////////////////////////////////////////////////////////////

app.get("/friendsOrWanabees", function(req, res) {
  return db
    .getFriendsOrWanabees(req.session.userId)
    .then(data => {
      console.log("get friends or wannabees data:", data);
      res.json({ data: data.rows });
    })
    .catch(err => {
      console.log("err in get fw: ", err);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/logout", (req, res) => {
  req.session = null;
  console.log(req.session);
  res.redirect("/");
});

//////////////////////////////////////////////////////////////

app.get("*", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

server.listen(8080, function() {
  console.log("I'm listening.");
});

///////////SERVER SIDE SOCKET CODE///////////////////////////
let chatArray = [];

[
  {
    message: "bla bla",
    firstname: "adrian",
    lastname: "pi",
    image: "theLinkToIt"
  }
];

let onlineUsers = [];

io.on("connection", function(socket) {
  console.log(`socket with the id ${socket.id} is now connected`);
  //socket.request.session.userId
  console.log(socket.request.session);

  //list of everyone who's currently online

  onlineUsers.push({
    userId: socket.request.session.userId,
    socketID: socket.id
  });

  let onlineUsers1 = onlineUsers.reduce(
    (x, y) => (x.findIndex(a => a.userId == y.userId) < 0 ? [...x, y] : x),
    []
  );

  console.log("onlineUsers:", onlineUsers);

  let IDsUnfiltered = onlineUsers.map(user => {
    return user.userId;
  });

  var IDs = IDsUnfiltered.reduce((a, b) => {
    if (a.indexOf(b) < 0) a.push(b);
    return a;
  }, []);

  console.log("IDs:", IDs);

  //turn array of user ids into array of user first names, last names, images etc.
  db.getUsersByIds(IDs)
    .then(result => {
      // console.log("results from getUsersByIDs:", result.rows);
      socket.emit(
        "onlineUsers",
        result.rows
      ); /*sending data to front end with emit*/
    })
    .catch(err => {
      console.log("err in get socket onlineUsers INDEx.js ", err.message);
    });

  //// LAST 10 MESSAGES ////////////////////////////////////
  db.showLastTenMessages()
    .then(lastMessages => {
      console.log("LAST MESSAGES: ", lastMessages);
      // socket.emit("lastChatMessages", lastMessages.rows.reverse());
    })
    .catch(err => {
      console.log("ERR in getLastChatMessages: ", err.message);
    });

  const count = onlineUsers.filter(
    user => user.userId == socket.request.session.userId
  ).length;
  if (count == 1) {
    db.getDataById(socket.request.session.userId)
      .then(result => {
        console.log("result from getDataByID****:", result);
        socket.broadcast.emit("userJoined", result);
      })
      .catch(err => {
        console.log("err in get socket Userjoined INDEx.js ", err.message);
      });
  }
  console.log("count:", count);

  //this event fired when the user disconnects
  //
  socket.on("disconnect", () => {
    // console.log(`socket with the id ${socket.id} is now disconnected`);
    db.getDataById(socket.request.session.userId)
      .then(result => {
        let indexOfuserId = IDs.indexOf(socket.request.session.userId);
        if (indexOfuserId > -1) {
          onlineUsers.splice(indexOfuserId, 1);
          // console.log("result from getDataByID***disconnect*:", result);
        }
        io.sockets.emit("userLeft", result);
      })
      .catch(err => {
        console.log("err in get disconnect ", err.message);
      });
  });
  socket.on("newMessage", function(inputText) {
    console.log("newMessage:", inputText);
    return db
      .saveChatMessage(socket.request.session.userId, inputText)
      .then(result => {
        console.log("the sender_id:", result.rows[0].sender_id);
        return db.getDataById(result.rows[0].sender_id);
      })
      .then(result => {
        console.log("**11111**", result);

        let newMessageObj = {
          firstname: result.firstname,
          lastname: result.lastname,
          image: result.image,
          chat_message: inputText
        };
        console.log("****new Message Object", newMessageObj);

        io.sockets.emit("newMessage", newMessageObj);
      })
      .catch(err => {
        console.log("err in newMessage ", err.message);
        return;
      });
  });

  //---------------------GET TEN MESSAGES-------------------------
  db.showLastTenMessages()
    .then(allMessages => {
      io.sockets.emit("showChat", allMessages.reverse());
    })
    .catch(err => {
      console.log("err in showChat ", err.message);
      return;
    });
});
