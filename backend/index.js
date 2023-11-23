import express from "express";
import mysql2 from "mysql2";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());


const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "Tamusa2024",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = `
    INSERT INTO books (
        \`book_name\`,
        \`price\`,
        \`number_in_stock\`,
        \`department_category\`,
        \`publisher_name\`,
        \`author_name\`,
        \`description\`,
        \`cover\`
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    req.body.book_name,
    req.body.price,
    req.body.number_in_stock,
    req.body.department_category,
    req.body.publisher_name,
    req.body.author_name,
    req.body.description,
    req.body.cover,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});


app.delete("/books/:book_id", (req, res) => {
  const bookId = req.params.book_id;
  const q = " DELETE FROM books WHERE book_id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/books/:book_id", (req, res) => {
  const bookId = req.params.book_id;
  const q = "UPDATE books SET `book_name`= ?, `price`= ?, `number_in_stock`= ?, `department_category`= ?, `publisher_name`= ?, `author_name`= ?, `description`= ?, `cover`= ? WHERE book_id = ?";

  const values = [
    req.body.book_name,
    req.body.price,
    req.body.number_in_stock,
    req.body.department_category,
    req.body.publisher_name,
    req.body.author_name,
    req.body.description,
    req.body.cover,
  ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
