import React, { Component } from 'react';
import Note from './Note.js';
import NoteForm from './NoteForm.js';

class NotesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {title: '', body: ''},
      output: this.props.load('output', []),
      deleted: false,
      previousOutput: [],
      id: this.props.load('id', 0)
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
    this.props.save("output", output);
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
    this.props.save("output", newOutput);
  }

  handleFormSubmit = () => {
    const date = {date: new Date()};
    const id = this.state.id;
    const oldOutput = this.state.output;
    const newOutput = [ ...oldOutput, {id, ...this.state.input, ...date}];
    this.setState({
      output: newOutput,
      input: {title: '', body: ''},
      id: id+1
 
    });
    this.props.save("output", newOutput);
    this.props.save("id", id+1);
  }

  handleFormChange = (target) => {
    this.setState({
      input: { ...this.state.input, ...{[target.name]: target.value} }
    });
  }

  render() {
    const {input, output, deleted} = {...this.state};
  
    return (
    	<div>
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

export default NotesPage;
