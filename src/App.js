import React, { Component } from 'react';
import Note from './Note.js';
import NoteForm from './NoteForm.js';
import NavBar from './NavBar.js'
import './App.css';

var idCache = localStorage.getItem('id');
var id = idCache? JSON.parse(idCache) : 0;

class App extends Component {
  constructor(props) {
    super(props);
    const cachedNotes = localStorage.getItem('output');
    this.state = {
      input: {title: '', body: ''},
      output: cachedNotes? JSON.parse(cachedNotes) : [],
      previousOutput: [],
      deleted: false

    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleNoteEdit = this.handleNoteEdit.bind(this);
    this.handleNoteDelete = this.handleNoteDelete.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
  }

  handleNoteEdit = (target) => {
    const [index, key] = target.name.split(',');
    const output = [...this.state.output]
    output[index][key] = target.value; 
    
    this.setState({
      output: output
    });
    localStorage.setItem("output", JSON.stringify(this.state.output))
  }

  handleUndo = () => {
    const previousOutput = this.state.previousOutput;
    this.setState({
      output: previousOutput[previousOutput.length - 1],
      deleted: previousOutput.length > 1,
      previousOutput: previousOutput.slice(0,-1)
    })
  }

  handleNoteDelete = (target, timer=false) => {
    const id = parseInt(target, 10);
    const newOutput = this.state.output.filter( note => note.id !== id);   
    this.setState({
      previousOutput: [...this.state.previousOutput, this.state.output],
      output: newOutput,
      deleted: timer ? false : true
    });
    localStorage.setItem("output", JSON.stringify(newOutput));
  }

  handleFormSubmit = () => {
    const date = {date: new Date()};
    const oldOutput = this.state.output;
    const newOutput = [ ...oldOutput, {id, ...this.state.input, ...date}];
    localStorage.setItem("output", JSON.stringify(newOutput))
    this.setState({
      output: newOutput,
      input: {title: '', body: ''}
 
    });
    id+=1;
    localStorage.setItem("id", JSON.stringify(id));
  }

  handleFormChange = (target) => {
    this.setState({
      input: { ...this.state.input, ...{[target.name]: target.value} }
    });
  }

  render() {
    const input = this.state.input;
    const output = this.state.output;
    const deleted = this.state.deleted;
    return (
      <div className="App">
        <NavBar />
        <NoteForm
          head={'Title'} 
          body={'Content'} 
          onFormChange={this.handleFormChange}
          onFormSubmit={this.handleFormSubmit}
          input={input}
        />
        <span>
        {
          deleted && 
          <button 
            onClick={this.handleUndo}
            className={'Undo'}
          >Undo</button>
        }
        </span>
        <Note
          texts={output}
          onNoteEdit={this.handleNoteEdit}
          onNoteDelete={this.handleNoteDelete}
        />
      </div>
    );
  }
}

export default App;
