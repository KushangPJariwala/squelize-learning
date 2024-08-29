const { faker } = require("@faker-js/faker");
const bodyParser = require("body-parser");
var mysql = require("mysql");
var express = require("express");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root", // your root username
  database: "join_us", // the name of your db
  password: "Kush@ng3092",
});

// const q = `CREATE TABLE users (
//     email VARCHAR(255) PRIMARY KEY,
//     created_at TIMESTAMP DEFAULT NOW()
// )`;

// for (i = 0; i < 500; i++) {
//   var person = {
//     email: faker.internet.email(),
//     created_at: faker.date.past(),
//   };

//   connection.query("INSERT INTO users SET ?", person, function (err, result) {
//     if (err) throw err;
//     // console.log(result);
//   });
// }

// const q = `select * from users`;
// connection.query(q, function (err, result) {
//   if (err) throw err;
//   const data = result;

//   data?.map((u) => {
//     console.log("u.email", u.email);
//   });
// });

app.get("/", function (req, res) {
  var q = "SELECT COUNT(*) as count FROM users";
  connection.query(q, function (error, results) {
    if (error) throw error;
    var count = results[0].count;
    res.render("index", { count });
  });
});

app.post("/register", function (req, res) {
  console.log("req", req.body);
  var person = { email: req.body.email };
  connection.query("INSERT INTO users SET ?", person, function (err, result) {
    console.log(err);
    console.log(result);
    res.redirect("/");
  });
});

app.listen(7500, () => {
  console.log("connected");
});
