const spicedPg = require("spiced-pg");

const bcrypt = require("bcryptjs");

let secrets;
if (process.env.NODE_ENV === "production") {
  secrets = process.env;
} else {
  secrets = require("./secrets");
}

const dbUrl =
  process.env.DATABASE_URL ||
  `postgres:${secrets.dbUser}:${secrets.dbPassword}@localhost:5432/social`;
const db = spicedPg(dbUrl);

////////////////////////////////////////////////////////////////////////////////////

exports.insertNewUser = function(firstname, lastname, email, password) {
  const q = `
        INSERT INTO users
        (firstname, lastname, email, password)
        VALUES
        ($1, $2, $3, $4)
        RETURNING id
    `;

  const params = [
    firstname || null,
    lastname || null,
    email || null,
    password || null
  ];

  return db.query(q, params);
};

////////////////////////////////////////////////////////////////////////////////////

exports.getPassword = function(usersemail) {
  const q = `SELECT id, password FROM users WHERE email = $1`;
  const params = [usersemail];
  return db.query(q, params);
};

////////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////////

exports.checkPassword = function(
  textEnteredInLoginForm,
  hashedPasswordFromDatabase
) {
  return new Promise(function(resolve, reject) {
    bcrypt.compare(textEnteredInLoginForm, hashedPasswordFromDatabase, function(
      err,
      doesMatch
    ) {
      if (err) {
        reject(err);
      } else {
        resolve(doesMatch);
      }
    });
  });
};

////////////////////////////////////////////////////////////////////////////////////

exports.uploadImages = function(image, id) {
  const q = `
        UPDATE users
        SET image =$1
        WHERE id = $2
        returning *`;
  const params = [image || null, id || null];
  return db.query(q, params);
};

////////////////////////////////////////////////////////////////////////////////////

exports.getUserById = function(id) {
  const q = `
          SELECT *
        FROM users
        WHERE id = $1
        `;
  const params = [id];
  return db.query(q, params);
};

////////////////////////////////////////////////////////////////////////////////////

exports.uploadBio = function(bio, id) {
  const q = `
        UPDATE users
        SET bio=$1
        WHERE id=$2
        returning *
        `;
  const params = [bio || null, id || null];
  return db.query(q, params);
};

////////////////////////////////////////////////////////////////////////////////////

exports.getStatus = function(id, otherProfileId) {
  const q = `
    SELECT * FROM friendships
WHERE (receiver_id = $1 AND sender_id = $2)
OR (receiver_id = $2 AND sender_id = $1)
          `;
  const params = [id || null, otherProfileId || null];
  return db.query(q, params);
};

exports.makeRequest = function(id, otherProfileId) {
  const q = `
        INSERT INTO friendships
        (sender_id, receiver_id)
        VALUES ($1, $2)
        returning *
        `;
  const params = [id || null, otherProfileId || null];
  return db.query(q, params);
};

exports.cancelRequest = function(id, otherProfileId) {
  const q = `
          DELETE FROM friendships
          WHERE sender_id = $1 AND
          receiver_id = $2
          returning *
          `;
  const params = [id || null, otherProfileId || null];
  return db.query(q, params);
};

exports.acceptFriendship = function(id, otherProfileId) {
  const q = `
        UPDATE friendships
        SET accepted=true
        WHERE (sender_id = $2 AND receiver_id = $1)
        returning *
            `;
  const params = [id || null, otherProfileId || null];
  return db.query(q, params);
};

exports.endFriendship = function(id, otherProfileId) {
  const q = `
              DELETE FROM friendships
              WHERE (sender_id = $1 AND receiver_id = $2)
              OR (sender_id = $2 AND receiver_id = $1)
              returning *
              `;
  const params = [id || null, otherProfileId || null];
  return db.query(q, params);
};

exports.getFriendsOrWanabees = function(id) {
  const q = `SELECT users.id, firstname, lastname, image, accepted
    FROM friendships
    JOIN users
    ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
    OR (accepted = true AND receiver_id= $1 AND sender_id = users.id)
    OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)
`;
  const params = [id || null];
  return db.query(q, params);
};

///////////////// PART 8 - SOCKET ///////////////////////
exports.getUsersByIds = function getUsersByIds(arrayOfIds) {
  const query = `SELECT id, firstname, lastname, image FROM users WHERE id = ANY($1)`;
  return db.query(query, [arrayOfIds]);
};
exports.getDataById = function(id) {
  return db.query(`SELECT * FROM users WHERE id=$1`, [id]).then(result => {
    return result.rows[0];
  });
};

///////////////// PART 9 - CHAT //////////////////////
exports.saveChatMessage = function(sender_id, chat_message) {
  const q = `
        INSERT INTO chat
        (sender_id, chat_message)
        VALUES
        ($1, $2)
        RETURNING *
    `;
  const params = [sender_id || null, chat_message || null];

  return db.query(q, params);
};

exports.showLastTenMessages = function() {
  return db
    .query(
      `SELECT users.firstname, users.lastname, users.image, chat.chat_message, chat.created_at, chat.id, chat.sender_id
                FROM users
                JOIN chat
                ON users.id = chat.sender_id
                ORDER BY chat.id DESC LIMIT 10`
    )
    .then(result => {
      return result.rows;
    });
};
