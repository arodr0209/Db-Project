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

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)";
  const values = [
    "title from backend",
    "desc from backend",
    "cover pic from backend",
  ];

  db.query(q, [values], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      res.json("Book added!");
    }
  });
});

app.listen(8800, () => {
  console.log("Backend server is running!");
});
