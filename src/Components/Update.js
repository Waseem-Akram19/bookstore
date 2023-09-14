import React, { useState, useEffect } from 'react';
import { TextField, Button } from "@mui/material";
import { useParams } from 'react-router-dom';
import { getDatabase, ref, set, get } from 'firebase/database';
import { app } from '../Database/firebase';
import './Addbook.css';

const Update = () => {
  const [book, setBook] = useState({
    id: '',
    bookname: "",
    author: "",
  });

  const [bookdata, setBookdata] = useState([]);
  const { bookid } = useParams();
  const { id, bookname, author } = book;

  const db = getDatabase(app);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  useEffect(() => {
    const viewbooks = ref(db, 'booksdata');
    get(viewbooks)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const booksData = [];
          snapshot.forEach((childSnapshot) => {
            booksData.push({ id: childSnapshot.key, ...childSnapshot.val() });
          });
          setBookdata(booksData);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [db]);

  useEffect(() => {
    if (bookid) {
      const selectedBook = bookdata.find((item) => item.id === bookid);

      if (selectedBook) {
        setBook(selectedBook);
      } else {
        console.log('Book not found');
      }
    } else {
      setBook({
        id: '',
        bookname: "",
        author: "",
      });
    }
  }, [bookid, bookdata]);

  const updateBook = (e) => {
    e.preventDefault();
    if (!id) {
      alert('Please Enter Book ID');
    } else if (!bookname) {
      alert('Please Enter Book Name');
    } else if (!author) {
      alert('Please Enter Author Name');
    } else {
      const bookRef = ref(db, `booksdata/${id}`);

      set(bookRef, {
        id: id,
        bookname: bookname,
        author: author,
      })
        .then(() => {
          alert('Book Updated Successfully');
        })
        .catch((error) => {
          console.error('Error updating book:', error);
          alert('Error Updating Book');
        });
    }
  };

  return (
    <>
      <div className='main_form'>
        <div className='header'>Update Book</div>
        <br />
        <label>
          <b>ID</b>
        </label>
        <TextField
          type="text"
          value={id || ""}
          name="id"
          onChange={handleChange}
          required
          size='small'
        />
        <br />
        <label>
          <b>Name</b>
        </label>
        <TextField
          type="text"
          value={bookname || ""}
          name="bookname"
          onChange={handleChange}
          required
          size='small'
        />
        <br />
        <label>
          <b>Author Name</b>
        </label>
        <TextField
          type="text"
          value={author || ""}
          name="author"
          onChange={handleChange}
          required
          size='small'
        />
        <br />
        <Button variant="contained" color="success" onClick={updateBook}>
          Update Book
        </Button>
      </div>
    </>
  );
}

export default Update;
