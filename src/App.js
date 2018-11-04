import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import withFeature from './hoc/withFeature.js'
import withStorage from './hoc/withStorage.js'
import GoalsPage from './GoalsPage.js';
import HomePage from './HomePage.js';
import NotesPage from './NotesPage.js';
import NavBar from './NavBar.js'
import SideBar from './SideBar.js'
import './css/App.css';

class App extends Component {
  render() {
    const NewSideBar = withStorage(withFeature(SideBar, "label", "labelID", {label: ""}));
    return (
      <Router>
      <div className="App">
        <NavBar />
        <div className="Content">
          <div className="Filler"></div>
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
          <NewSideBar />
        </div>
      </div>
      </Router>
    );
  }
}
// <Route exact path="/notes" component={NotesPage} />
export default App;
