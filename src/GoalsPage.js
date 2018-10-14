import React, { Component } from 'react';
import GoalForm from './GoalForm.js';

class GoalsPage extends Component {
	constructor(props) {
		super(props)
	 	this.state = {
      input: {title: '', stepForms: []},
      output: [],
      deleted: false,
      previousOutput: [],
      id: 0
    };

    this.handleFormTitleChange = this.handleFormTitleChange.bind(this);
    this.handleFormStepChange = this.handleFormStepChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormDelete = this.handleFormDelete.bind(this);
    this.incrementStep = this.incrementStep.bind(this);

	}

	handleFormSubmit = () => {
    const oldOutput = this.state.output;
    const newOutput = [ ...oldOutput, {...this.state.input}];
    this.setState({
      output: newOutput,
      input: {title: '', stepForms: []} 
    });
  }

  handleFormTitleChange = (target) => {
  	this.setState({
      input: { ...this.state.input, ...{[target.name]: target.value} }
    });
  }

  handleFormStepChange = (target) => {
  	const oldInput = this.state.input;
  	const newStepForms = [...oldInput.stepForms];
  	newStepForms[target.id] = {...newStepForms[target.id], content: target.value}; 
  	this.setState({
  		input: {...oldInput, stepForms: newStepForms}
  	});
  }
  handleFormDelete = (target) => {
  	const id = parseInt(target.name, 10);
  	const oldInput = this.state.input;
  	const newStepForms = oldInput.stepForms.filter((stepForm) => stepForm.id !== id);	
  	this.setState({
  		input: {...oldInput, stepForms: newStepForms}
  	});
  }

  incrementStep = () => {
  	const input = this.state.input;
  	this.setState((state) => ({
  		id: state.id + 1,
  		input: {...input, stepForms: [...input.stepForms, {id: state.id, content: ""}]}
  	}));
  }

	render() {
		const {input, output, deleted} = {...this.state};
		return (
			<div>
			<GoalForm
					title={'Write a goal'}
          onFormTitleChange={this.handleFormTitleChange}
          onFormStepChange={this.handleFormStepChange}
          onFormSubmit={this.handleFormSubmit}
          onFormDelete={this.handleFormDelete}
          onIncrementStep={this.incrementStep}
          input={input}
			/>
			<p>{input.title}</p>
			</div>
		)
	}
}

export default GoalsPage;