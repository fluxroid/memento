import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import NotesPage from './NotesPage.js';
import NavBar from './NavBar.js'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);  
  }

  

  render() {
    return (
      <Router>
      <div className="App">
        <NavBar />
        <NotesPage />
      </div>
      </Router>
    );
  }
}

export default App;
