import express from "express";
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "tamusa",
  password: "tamusa",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("hello this is the backend yoyo");
});

app.get("/books", (req, res) => {
  db.query("SELECT * FROM books", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.listen(8800, () => {
  console.log("Backend server is running!");
});
