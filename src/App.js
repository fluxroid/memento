import React, { Component } from 'react';
import Note from './Note.js'
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      output: {title: '', body: ''}
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit = () => {
    this.setState({output: {title: this.state.title, body: this.state.body} });
  }

  handleFormChange = (target) => {
    this.setState({[target.name]: target.value});
  }

  render() {
    const title = this.state.title;
    const textBody = this.state.body;
    const output = this.state.output;

    return (
      <div className="App">
        <NoteForm
          head={'Title'} 
          body={'Take a Note...'} 
          onFormChange={this.handleFormChange}
          onFormSubmit={this.handleFormSubmit}
          title={title}
          textBody={textBody}
        />
        <Note
          text={output}
          className={'Note'}
        />
      </div>
    );
  }
}

class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onFormSubmit(); 
  }


  handleChange = (event) => {
    this.props.onFormChange(event.target);
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" 
            placeholder={this.props.head} 
            value={this.props.title} 
            onChange={this.handleChange} 
            name="title"
          />
          <input type="text" 
            placeholder={this.props.body} 
            value={this.props.textBody} 
            onChange={this.handleChange}
            name="body" 
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      );
  }
}

export default App;
