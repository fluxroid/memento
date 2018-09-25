import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      output: ''
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit = () => {
    this.setState({output: this.state.input});
  }

  handleFormChange = (value) => {
    this.setState({input: value});
  }

  render() {
    const input = this.state.input;
    const output = this.state.output;

    return (
      <div className="App">
        <NoteForm 
          placeholder={'Take a Note...'} 
          onFormChange={this.handleFormChange}
          onFormSubmit={this.handleFormSubmit}
          input={input}
        />
        <p>{output}</p>
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
    this.props.onFormChange(event.target.value);
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" 
            placeholder={this.props.placeholder} 
            value={this.props.input} 
            onChange={this.handleChange} 
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      );
  }
}

export default App;
