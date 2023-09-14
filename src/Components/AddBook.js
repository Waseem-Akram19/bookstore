import React, {useState} from 'react';


import {
  TextField,
  Button,
  Modal,
} from "@mui/material";
import { getDatabase, ref, set } from 'firebase/database';
import { app } from '../Database/firebase';

import './Addbook.css';

const AddBook = () => {
  const [book, setBook] = useState({
    id: '',
    bookname: "",
    author: "",
  });

  const db = getDatabase(app);

  const { id, bookname, author } = book;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  const AddBook = (e) => {
    e.preventDefault();
    if(book.id === ''){
      alert('Please Enter Book Id');
    }else if(book.bookname === '')
    {
      alert('Please Enter Book Name');
    }else if(book.author === '')
    {
      alert('Please Enter Book Author');
    }
    else{
      set(ref(db, `booksdata/${id}`), {
        id: id,
        bookname: bookname,
        author: author,
      }).then((value) => { alert('Add Book Successfully'); }).catch((error) => alert("Error Adding Book"));
    }
  }
  return (
    <>
      <div className='main_form'>
      <div className='header'>Add Book</div>
      < br />
        <label >
          <b>ID</b>
        </label>
        <TextField
          type="text"
          value={book.id}
          name="id"
          onChange={handleChange}
          required
          size='small'
        />
        < br />
        <label >
          <b>Name</b>
        </label>
        <TextField
          type="text"
          value={book.bookname}
          name="bookname"
          onChange={handleChange}
          required
          size='small'
        />
        < br />
        <label >
          <b>Author Name</b>
        </label>
        <TextField
          type="text"
          value={book.author}
          name="author"
          onChange={handleChange}
          required
          size='small'
        />
        <br />
        {/* <Button onClick={AddBook}> Add Book</Button> */}
        <Button variant="contained" color="success" onClick={AddBook}>Add Book</Button>
      </div>
    </>
  )
}

export default AddBook;