import React, { Component } from 'react';
import Note from './Note.js';
import NoteForm from './NoteForm.js';

class NotesPage extends Component {
  // componentWillUnmount() {
  // } 

  render() {  
    return (
    	<div>
        <NoteForm
          head={'Title'} 
          body={'Content'} 
          onFormChange={this.props.change}
          onFormSubmit={this.props.submit}
          input={this.props.input}
          labels={this.props.labels}
        />
        <Note
          texts={this.props.output}
          onNoteEdit={this.props.edit}
          onNoteDelete={this.props.delete}
        />
        <div>
        {
          this.props.deleted && 
          <button 
            onClick={this.props.undo}
            className={'Undo'}
          >Undo</button>
        }
        </div>
        </div>
    );
  }
}

export default NotesPage;
