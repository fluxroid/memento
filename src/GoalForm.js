import React, { Component } from 'react';

class GoalForm extends Component {
	constructor(props) {
  	super(props);
    this.state = {
    	tags:['Work','School',"Fitness"],
    	stepForms: [],
    	steps: 0
    	};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
		this.incrementStep = this.incrementStep.bind(this);
	}



	handleSubmit = (event) => {
    event.preventDefault();
    this.props.onFormSubmit(); 
  	}

  handleChange = (event) => {
    this.props.onFormChange(event.target);
  	}

  incrementStep = () => {
  	this.setState({
  		steps: this.state.steps + 1,
  		stepForms: [...this.state.stepForms, 
  		<input type="text" onChange={this.handleChange}/>
  		]
  	});

  }

	render() {
		return (
			<div>
			<form 
        onSubmit={this.handleSubmit} 
        className={"GoalForm"}
        autoComplete={"off"}
      >
        <input type="text" 
          placeholder={this.props.body} 
          value={this.props.input.body} 
          onChange={this.handleChange}
          name="body" 
        />
        <input type="button" 
        	value="Add Step" 
        	onClick={this.incrementStep}/>
        {this.state.stepForms.map((step) => step)}
       <input type="submit" value="Submit" />
      </form>
      <p>{this.state.steps}</p>
      </div>
		);
	}
}

export default GoalForm;