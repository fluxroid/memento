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
    this.handleVisibleLabel = this.handleVisibleLabel.bind(this);
    this.toggleLabel = this.toggleLabel.bind(this);
  }

  componentDidMount() {
      const labels = this.state;
      this.setState(this.props.load("NoteFormLabels", labels));
    }

    componentWillUnmount() {
      const labels = this.state;
      this.props.save("NoteFormLabels", labels);
    }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submit('labels',this.state.clickedLabels);
    this.setState({
      visibleLabels: false,
      clickedLabels: {}
      }); 
  }

  handleVisibleLabel = (event) => {
    const value = this.state.visibleLabels;
    this.setState({visibleLabels : !value});
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
       {this.state.visibleLabels && this.props.labels.output.length > 0 
        && <LabelSelection 
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
            onChange={event => { this.props.change(event.target);}}
            name="title"
          />       

          <input type="text" 
            placeholder={this.props.body} 
            value={this.props.input.body} 
            onChange={event => { this.props.change(event.target);}}
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
