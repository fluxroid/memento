import React, { Component } from 'react';
import Note from './Note.js';
import NoteForm from './NoteForm.js';

class NotesPage extends Component {
  constructor(props) {
    super(props);  
	}

  render() {  
    return (
    	<div>
        <NoteForm
          head={'Title'} 
          body={'Content'} 
          onFormChange={this.props.change}
          onFormSubmit={this.props.submit}
          input={this.props.input}
        />
        <span>
        {
          this.props.deleted && 
          <button 
            onClick={this.props.undo}
            className={'Undo'}
          >Undo</button>
        }
        </span>
        <Note
          texts={this.props.output}
          onNoteEdit={this.props.edit}
          onNoteDelete={this.props.delete}
        />
        </div>
    );
  }
}

export default NotesPage;
