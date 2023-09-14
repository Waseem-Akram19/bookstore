import {initializeApp} from 'firebase/app'; 


const firebaseConfig = {
    apiKey: "AIzaSyChLW276ESIcsyYE6TdAgNxHpwf5xD-rDc",
    authDomain: "bookstore-e0e00.firebaseapp.com",
    projectId: "bookstore-e0e00",
    storageBucket: "bookstore-e0e00.appspot.com",
    messagingSenderId: "150598387931",
    appId: "1:150598387931:web:7acad192ef15c50dee24fe",
    databaseURL: "https://bookstore-e0e00-default-rtdb.firebaseio.com",
  };

  export const app = initializeApp(firebaseConfig);