import React, { Component } from 'react';
import Note from './Note.js';
import NoteForm from './NoteForm.js';

class NotesPage extends Component {
  render() {  
    return (
    	<div>
        <NoteForm
          {...this.props}
          head={'Title'} 
          body={'Content'} 
        />
        <Note
          {...this.props}
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
