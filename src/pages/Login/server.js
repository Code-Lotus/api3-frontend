const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()

// configure the database and associate the models with it
const db = require("./app/models");
const { HOST } = require("./app/config/db.config");

const app = express();
const port = process.env.PORT;

var corsOptions = {
  origin: 'http://127.0.0.1:5174',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'x-access-token'],
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

// set port, listen for requests
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}.`);
});

const Role = db.role;

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

// initial function helps us to create 3 rows in database: user, admin and moderator
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);