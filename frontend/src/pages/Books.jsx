import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  console.log(books);

  const handleDelete = async (book_id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${book_id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Jaguar Books Shop</h1>
      <div className="books">
        {books.map((book) => (
          <div key={book.book_id} className="book">
            <img src={book.cover} alt="" />
            <h2>{book.book_name}</h2>
            <p>{book.description}</p>
            <p>Price: ${book.price}</p>
            <p>Number in Stock: {book.number_in_stock}</p>
            <p>Department Category: {book.department_category}</p>
            <p>Publisher: {book.publisher_name}</p>
            <p>Author: {book.author_name}</p>
            <br />
            <br />
            <button className="delete" onClick={() => handleDelete(book.book_id)}>
              Delete
            </button>
            <button className="update">
              <Link
                to={{ pathname: `/update/${book.book_id}`, state: {book}} }
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new book
        </Link>
      </button>
    </div>
  );
};

export default Books;