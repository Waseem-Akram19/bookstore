import React, {useState} from 'react';


import {
  TextField,
  Button,
} from "@mui/material";
import { getDatabase, ref, set,push } from 'firebase/database';
import { app } from '../Database/firebase';

import './Addbook.css';

const AddBook = () => {
  const [book, setBook] = useState({
    bookname: "",
    author: "",
  });

  const db = getDatabase(app);

  const { bookname, author } = book;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  const AddBook = (e) => {
    e.preventDefault();
    if(book.bookname === '')
    {
      alert('Please Enter Book Name');
    }else if(book.author === '')
    {
      alert('Please Enter Book Author');
    }
    else{
      const newBook = push(ref(db, 'booksdata'));
      set(newBook, {
        bookname: bookname,
        author: author,
      }).then((value) => { alert('Add Book Successfully'); }).catch((error) => alert("Error Adding Book"));

      setBook('');
    }
  }
  return (
    <>
      <div className='main_form'>
      <div className='header'>Add Book</div>
      < br />
        <label >
          <b>Name</b>
        </label>
        <TextField
          type="text"
          placeholder='Enter Book Name'
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
          placeholder='Enter Author Name'
          value={book.author}
          name="author"
          onChange={handleChange}
          required
          size='small'
        />
        <br />
        <Button variant="contained" color="success" onClick={AddBook} style={{marginTop:'15px'}}>Add Book</Button>
      </div>
    </>
  )
}

export default AddBook;