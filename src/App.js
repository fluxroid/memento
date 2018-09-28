import React, { Component } from 'react';
import Note from './Note.js';
import NoteForm from './NoteForm.js';
import './App.css';

var id = 0;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {title: '', body: ''},
      output: [],
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
  }

  handleUndo = () => {
    const previousOutput = this.state.previousOutput;
    this.setState({
      output: previousOutput[previousOutput.length - 1],
      deleted: previousOutput.length > 1,
      previousOutput: previousOutput.slice(0,-1)
    })
  }

  handleNoteDelete = (target) => {
    const id = parseInt(target, 10);    
    this.setState({
      previousOutput: [...this.state.previousOutput, this.state.output],
      output: this.state.output.filter( note => note.id !== id),
      deleted: true
    });
  }

  handleFormSubmit = () => {
    const oldOutput = this.state.output;
    this.setState({
      output: [ ...oldOutput, {id, ...this.state.input}],
      input: {title: '', body: ''}
 
    });
    id+=1
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
        <NoteForm
          head={'Title'} 
          body={'Take a Note...'} 
          onFormChange={this.handleFormChange}
          onFormSubmit={this.handleFormSubmit}
          input={input}
        />
        <span>
        {
          deleted && <button onClick={this.handleUndo}>Undo</button>
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
