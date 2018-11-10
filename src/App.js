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
  constructor(props){
    super(props);
    this.state = {hideSide: true};
    this.hideSideBar = this.hideSideBar.bind(this);
  }

  hideSideBar = (cond) => {
    if (cond !== this.state.hideSide)   
      this.setState({hideSide: cond});
  }

  render() {
    const NewNotesPage = withStorage(withFeature(NotesPage, "output", "id", {title: '', body: ''}));
    const NewGoalsPage = withStorage(withFeature(GoalsPage, "goals", "goalId", {title: ''}));
    const labelObject = {
        input: this.props.input,
        output: this.props.output,
        submit: this.props.submit, 
        delete: this.props.delete, 
        change: this.props.change
    };
    const NewSideBar = <SideBar labels = {labelObject}/>;
    
    return (
      <Router>
      <div className="App">
        <NavBar />
        <div className="Content">
          <div className="Filler"></div>
          <div>
            <Route exact path="/" 
              render={() => <HomePage hideSide={this.hideSideBar}/>}/>
            <Route exact path="/notes" 
              render={() => <NewNotesPage hideSide={this.hideSideBar}/>}/>
            <Route exact path="/goals" 
              render={() => <NewGoalsPage hideSide={this.hideSideBar} labels = {labelObject}/>}/>
          </div>
          {this.state.hideSide ? <div className="Filler"></div> : NewSideBar}
        </div>
      </div>
      </Router>
    );
  }
}
// <Route exact path="/notes" component={NotesPage} />
export default App;
