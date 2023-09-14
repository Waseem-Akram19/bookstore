import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { getDatabase, ref, get, remove } from 'firebase/database';
import { app } from '../Database/firebase';

import './viewbook.css';
import { Button } from '@mui/material';

const ViewBooks = () => {

    const db = getDatabase(app);
    const [books, setBooks] = useState([]);
    useEffect(() => {
        const viewbooks = ref(db, 'booksdata');
        get(viewbooks)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const booksData = [];
                    snapshot.forEach((childSnapshot) => {
                        booksData.push({ id: childSnapshot.key, ...childSnapshot.val() });
                    });
                    setBooks(booksData);
                } else {
                    console.log('No data available');
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [db]);

    const onDelete = (id) => {
        const deleteBook = ref(db, `booksdata/${id}`);
        remove(deleteBook)
            .then(() => {
                setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
            }).then((value)=>{
                alert('Delete Book Successfully');
            }).catch((error) => {
                console.error('Error deleting data:', error);
            });
    };

    return (
        <>
            <div className='main_table'>
                <div className='header'>Books Data</div>
                <Link to='/addbook' style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color='success' className='addbook' style={{ marginLeft: '10px', marginBottom: '10px' }}>Add Book</Button>
                </Link>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Author</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr key={book.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{book.bookname}</td>
                                <td>{book.author}</td>
                                <td><Link to={`/update/${book.id}`} style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" color='primary' style={{ marginRight: '10px' }}>Edit</Button>
                                </Link>
                                    <Button variant="outlined"
                                        style={{ backgroundColor: 'red', color: 'white' }} onClick={()=>onDelete(book.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ViewBooks;