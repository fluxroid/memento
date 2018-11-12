import React, { Component } from 'react';
import './css/GoalForm.css';
import LabelSelection from './LabelSelection.js';

class GoalForm extends Component {
	constructor(props) {
  	super(props);
    this.state = {
    	visibleLabels: false,
      clickedLabels: {}
    	};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
		this.handleDeleteStep = this.handleDeleteStep.bind(this);
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

  handleChange = (event) => {
    this.props.onFormChange(event.target);
  	}

  handleDeleteStep = (event) => {
  	this.props.onFormDelete(event.target);
  }

  handleVisibleLabel = (event) => {
    const value = this.state.visibleLabels;
    this.setState({visibleLabels : !value});
  }  

	render() {
    const {title, ...stepForms} = this.props.input;
		const children = Object.keys(stepForms).map(id =>
			<div id={id} 
				key={id}
			> 
	  		<input type="text" 
	  			value={this.props.input[id]} 
	  			onChange={this.handleChange}
	  			name={id}
	  			id={id}
	  			className={"StepForm"}
	  		/>
	  		<input type="button"
	  			value="x" 
	  			onClick={this.handleDeleteStep} 
	  			name={id}
	  			className={"DeleteStep"}
	  		/>
  		</div>
  	);

		return (
      <div className="GoalFormWithLabel">
			<div className="GoalForm">
			<form 
        onSubmit={this.handleSubmit} 
        autoComplete={"off"}
      >
        <input type="text" 
          value={title} 
          onChange={this.handleChange}
          name="title" 
          className={"Title"}
          placeholder={"Title"}
        />
        <input type="button" 
        	value="Add Step" 
        	onClick={this.props.onIncrementStep}
        	className={"AddStep"}
        	/>
        {children}
        <div>
       <input type="submit" 
       	value="Submit"
       	className={"Submit"}
       	/>
       <input type="button"
        value="Label"
        className={"GoalFormLabel"}
        onClick={this.handleVisibleLabel}
        />
      	</div>
      </form>
      </div>
      {this.state.visibleLabels && 
        <LabelSelection 
          className={"LabelContainer"} 
          output={this.props.labels.output}
          toggle={this.toggleLabel}
          selected={this.state.clickedLabels}
        />
      }
      </div>
		);
	}
}

export default GoalForm;