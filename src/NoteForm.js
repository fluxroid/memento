import React, { Component } from 'react';

class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {titleRender: false};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handeFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({titleRender: false});
    this.props.onFormSubmit(); 
  }

  handleChange = (event) => {
    this.props.onFormChange(event.target);
  }

  handleBlur = (event) => {
    const name = event.target.name;
    if (name !== "body" && name !== "title")
      this.setState({titleRender: false});
  }

  handleFocus = () => {
    this.setState({titleRender: true});
  }
  
  render() {
    const titleRender = this.state.titleRender;
    return (
      <form 
        onSubmit={this.handleSubmit} 
        onMouseEnter={this.handleFocus}
        onMouseLeave={this.handleBlur}
        className={"NoteForm"}
        autoComplete={"off"}
      >
          { titleRender && 
          <input type="text" 
            placeholder={this.props.head} 
            value={this.props.input.title} 
            onChange={this.handleChange}
            name="title"
          />       
          }
          <input type="text" 
            placeholder={this.props.body} 
            value={this.props.input.body} 
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            name="body" 
          />
        <input type="submit" value="Submit" />
      </form>
      );
  }
}

export default NoteForm;
