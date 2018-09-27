import React, { Component } from 'react';
import Note from './Note.js';
import NoteForm from './NoteForm.js';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {title: '', body: ''},
      output: []

    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleNoteEdit = this.handleNoteEdit.bind(this);
  }

  handleNoteEdit = (target) => {
    const [index, key] = target.name.split(',');
    const output = [...this.state.output]
    output[index][key] = target.value; 
    
    this.setState({
      output: output
    });
  }

  handleFormSubmit = () => {
    const oldOutput = this.state.output;
    this.setState({
      output: [ ...oldOutput, this.state.input, ],
      input: {title: '', body: ''}
 
    });
  }

  handleFormChange = (target) => {
    this.setState({
      input: { ...this.state.input, ...{[target.name]: target.value} }
    });
  }

  render() {
    const input = this.state.input;
    const output = this.state.output;

    return (
      <div className="App">
        <NoteForm
          head={'Title'} 
          body={'Take a Note...'} 
          onFormChange={this.handleFormChange}
          onFormSubmit={this.handleFormSubmit}
          input={input}
        />
        <Note
          texts={output}
          onNoteEdit={this.handleNoteEdit}
        />
      </div>
    );
  }
}

export default App;
