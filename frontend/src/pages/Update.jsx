import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  // const [book, setBook] = useState({
  //   book_name: "",
  //   description: "",
  //   price: null,
  //   cover: "",
  //   number_in_stock: null,
  //   department_category: "",
  //   publisher_name: "",
  //   author_name: "",
  // });
  
  const [error, setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state;


  console.log(book)
  const bookId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    // setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/books/${bookId}`, book);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the Book</h1>
      <input
        type="text"
        placeholder="Book title"
        name="book_name"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="Book description"
        name="description"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Book price"
        name="price"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Book cover"
        name="cover"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Number in Stock"
        name="number_in_stock"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Department Category"
        name="department_category"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Publisher Name"
        name="publisher_name"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Author Name"
        name="author_name"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <Link to="/">See all books</Link>
    </div>
  );
};

export default Update;
