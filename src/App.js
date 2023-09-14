import React from 'react';

import { Route, Routes } from 'react-router-dom';
import AddBook from './Components/AddBook';
import ViewBooks from './Components/ViewBooks';
import Update from './Components/Update';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route eaxct path='/' Component={ViewBooks}></Route>
        <Route eaxct path='/addbook' Component={AddBook}></Route>
        <Route eaxct path='/update/:id' Component={Update}></Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
