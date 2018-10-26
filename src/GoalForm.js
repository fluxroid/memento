import React, { Component } from 'react';
import './GoalForm.css';


class GoalForm extends Component {
	constructor(props) {
  	super(props);
    this.state = {
    	tags:['Work','School',"Fitness"]
    	};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
		this.handleDeleteStep = this.handleDeleteStep.bind(this);
	}

	handleSubmit = (event) => {
    event.preventDefault();
    this.props.onFormSubmit(); 
  	}

  handleChange = (event) => {
    this.props.onFormChange(event.target);
  	}

  handleDeleteStep = (event) => {
  	this.props.onFormDelete(event.target);
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
      	</div>
      </form>
      </div>
		);
	}
}

export default GoalForm;