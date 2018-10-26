import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import withStorage from './withStorage.js'
import withFeature from './withFeature.js'
import GoalsPage from './GoalsPage.js';
import HomePage from './HomePage.js';
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
        <div>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/notes" 
          component={withStorage(
            withFeature(NotesPage, "output", "id", {title: '', body: ''})
            )} />
          <Route exact path="/goals" 
          component={withStorage(
            withFeature(GoalsPage, "goals", "goalId", {title: ''})
            )} />        
        </div>
      </div>
      </Router>
    );
  }
}
// <Route exact path="/notes" component={NotesPage} />
export default App;
