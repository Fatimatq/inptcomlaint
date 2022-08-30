const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const bcrypt = require('bcrypt')
const saltRounds = 10

const app = express();


app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  password: "Fatima1234",
  host: "localhost",
  database: "users",
});

app.post("/Sinscrire", (req, res) => {

  const fullName = req.body.fullName;
  const password = req.body.password;
  const gmail = req.body.gmail;
  const dateOfBirthday = req.body.dateOfBirthday;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err)
    }
    db.query("INSERT INTO registerlogin (fullName, password, gmail, dateOfBirthday) VALUES (?,?,?,?)",
      [fullName, hash, gmail, dateOfBirthday],
      (err, result) => {
        console.log(err);
      }
    );
  })


});

app.post("/Connexion", (req, res) => {

  const gmail = req.body.gmail;
  const password = req.body.password;


  db.query("SELECT gmail, password FROM registerlogin WHERE gmail= ? AND password=? ",
    [gmail, password],
    (err, result) => {
      if (err) {
        res.send({ err: err })
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "wrong gmail/psswor combination" });
      }
    }
  );

});

app.post("/Envoyer", (req, res) => {

  const name = req.body.name;
  const pavNumber = req.body.pavNumber;
  const roomNumber = req.body.roomNumber;
  const problem = req.body.problem;
  db.query("INSERT INTO reclamation (name, pavNumber, roomNumber, problem) VALUES (?,?,?,?)",
    [name, pavNumber, roomNumber, problem],
    (err, result) => {
      console.log(err);
    });
});




app.listen(3001, () => {
  console.log("running server");
});
