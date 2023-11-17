import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

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

  return (
    <div>
      <h1>Books Demo!</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book">
            {book.cover && <img src={book.cover} alt="book cover" />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
