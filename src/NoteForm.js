import React, { Component } from 'react';

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
            value={this.props.input.title} 
            onChange={this.handleChange} 
            name="title"
          />
          <input type="text" 
            placeholder={this.props.body} 
            value={this.props.input.body} 
            onChange={this.handleChange}
            name="body" 
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      );
  }
}

export default NoteForm;
