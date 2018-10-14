import React, { Component } from 'react';

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
  	event.target.name === "stepForm" ? this.props.onFormStepChange(event.target) :
    this.props.onFormTitleChange(event.target);
  	}

  handleDeleteStep = (event) => {
  	console.log(event.target.name)
  	this.props.onFormDelete(event.target);
  }  

	render() {
		const stepForms = this.props.input.stepForms.map((form, index) =>
			<div id={form.id} 
				key={form.id}
			> 
	  		<input type="text" 
	  			value={form.content} 
	  			onChange={this.handleChange}
	  			name={"stepForm"}
	  			id={index}
	  		/>
	  		<input type="button" 
	  			value="X" 
	  			onClick={this.handleDeleteStep} 
	  			name={form.id}
	  		/>
  		</div>
  	);

		return (
			<div>
			<form 
        onSubmit={this.handleSubmit} 
        className={"GoalForm"}
        autoComplete={"off"}
      >
        <input type="text" 
          placeholder={this.props.input.title} 
          value={this.props.input.title} 
          onChange={this.handleChange}
          name="title" 
        />
        <input type="button" 
        	value="Add Step" 
        	onClick={this.props.onIncrementStep}/>
        {stepForms}
       <input type="submit" value="Submit" />
      </form>
      <p>{this.state.steps}</p>
      </div>
		);
	}
}

export default GoalForm;