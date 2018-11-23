import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import withFeature from './hoc/withFeature.js'
import withStorage from './hoc/withStorage.js'
import GoalsPage from './GoalsPage.js';
import HomePage from './HomePage.js';
import NotesPage from './NotesPage.js';
import ResultsPage from './ResultsPage.js';
import NavBar from './NavBar.js'
import SideBar from './SideBar.js'    
import './css/App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      hideSide: true,
      deletedLabel: ''
    };
    this.hideSideBar = this.hideSideBar.bind(this);
    this.removeLabel = this.removeLabel.bind(this);
  }

  removeLabel = (label) => {
   this.setState({deletedLabel: label});
  }

  hideSideBar = () => {
    const value = this.state.hideSide;   
    this.setState({hideSide: !value});
  }

  render() {
    const deletedLabel = this.state.deletedLabel;
    const NewNotesPage = withStorage(
      withFeature(NotesPage, "notes", "noteId", {title: '', body: ''}, deletedLabel));
    const NewGoalsPage = withStorage(
      withFeature(GoalsPage, "goals", "goalId", {title: ''}, deletedLabel));
    const labelObject = {
        input: this.props.input,
        output: this.props.output,
        submit: this.props.submit, 
        delete: this.props.delete, 
        change: this.props.change
    };
    const NewResultsPage = withStorage(ResultsPage);
    const NewSideBar = <SideBar labels = {labelObject} removeLabel = {this.removeLabel}/>;
    const hideSide = this.state.hideSide;

    return (
      <Router>
      <div className="App">
        <NavBar hideSide={this.hideSideBar} hideStatus={hideSide} deletedLabel={deletedLabel}/>

        <div className="Content">
          <div className="Filler"></div>
          <div>
            <Route exact path="/" 
              render={() => <HomePage />}/>
            <Route exact path="/notes" 
              render={() => <NewNotesPage 
                labels = {labelObject} 
                deletedLabel = {deletedLabel}
                hideStatus={hideSide}
                />
              }
            />
            <Route exact path="/goals" 
              render={() => <NewGoalsPage 
                labels = {labelObject}
                deletedLabel = {deletedLabel} 
                hideStatus={hideSide}
                />
              }
            />
            <Route path="/results/:keys"
              render={(props) => <NewResultsPage {...props} 
              labels= {labelObject}
              notes={this.props.load("notes", [])}
              goals={this.props.load("goals", [])}
              deletedLabel = {deletedLabel} 
              hideStatus={hideSide}
              />
            }
            />
          </div>
          {this.state.hideSide ? <div className="Filler2"></div> : NewSideBar}
        </div>
      </div>
      </Router>
    );
  }
}
// <Route exact path="/notes" component={NotesPage} />
export default App;
