import React, { Component } from 'react';
import './css/NoteForm.css';
import LabelSelection from './LabelSelection.js';

class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleLabels: false,
      clickedLabels: {}
    };


    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleVisibleLabel = this.handleVisibleLabel.bind(this);
    this.toggleLabel = this.toggleLabel.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onFormSubmit('labels',this.state.clickedLabels);
    this.setState({
      visibleLabels: false,
      clickedLabels: {}
      }); 
  }

  handleVisibleLabel = (event) => {
    const value = this.state.visibleLabels;
    this.setState({visibleLabels : !value});
  }  

  handleChange = (event) => {
    this.props.onFormChange(event.target);
  }

  toggleLabel = (event) => {
    const name = event.target.name;
    const clickedLabels = this.state.clickedLabels;
    if (name in this.state.clickedLabels) {
      const value = !this.state.clickedLabels[name];
      this.setState({clickedLabels: {...clickedLabels, ...{[name]: value}}});
    }
    else {
      this.setState({clickedLabels: {...clickedLabels, ...{[name]: true}}});
    }
  }
  
  render() {
    return (
      <div className="NoteFormWrapper">
       {this.state.visibleLabels && <LabelSelection 
          className={"LabelContainerNotes"} 
          output={this.props.labels.output}
          toggle={this.toggleLabel}
          selected={this.state.clickedLabels}
      />}
      <form 
        onSubmit={this.handleSubmit} 
        onMouseEnter={this.handleFocus}
        onMouseLeave={this.handleBlur}
        className={"NoteForm"}
        autoComplete={"off"}
      >
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
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            name="body" 
          />
          
        <div>
        <input type="submit" value="Submit" />
        <input type="button" 
          value="Label"
          onClick={this.handleVisibleLabel} 
        />
        </div>
      </form>
     
      </div>
      );
  }
}

export default NoteForm;
