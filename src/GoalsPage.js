import React, { Component } from 'react';
import GoalForm from './GoalForm.js';
import Goal from './Goal.js';

class GoalsPage extends Component {
	constructor(props) {
		super(props)
		const cachedGoals = localStorage.getItem('goals');
		const goalIdCache = localStorage.getItem('goalId');

	 	this.state = {
      input: {title: '', stepForms: []},
      output: cachedGoals? JSON.parse(cachedGoals) : [],
      deleted: false,
      previousOutput: [],
      goalId: goalIdCache? JSON.parse(goalIdCache) : 0,
      stepId: 0
    };

    this.handleFormTitleChange = this.handleFormTitleChange.bind(this);
    this.handleFormStepChange = this.handleFormStepChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormDelete = this.handleFormDelete.bind(this);
    this.incrementStep = this.incrementStep.bind(this);

	}

	handleFormSubmit = () => {
    const oldOutput = this.state.output;
    const id = this.state.goalId;
    const newOutput = [ ...oldOutput, {id, ...this.state.input}];
    this.setState({
      output: newOutput,
      input: {title: '', stepForms: []}, 
      goalId: id + 1,
      previousOutput: oldOutput,
      stepId: 0
    });
    localStorage.setItem("goalIdCache", JSON.stringify(this.state.goalId));
    localStorage.setItem("goals", JSON.stringify(newOutput))
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
  		stepId: this.state.stepId + 1,
  		input: {...input, stepForms: [...input.stepForms, {id: this.state.stepId, content: ""}]}
  	}));
  }

	render() {
		const {input, output, deleted} = {...this.state};
		const steps = input.stepForms.map((stepForm) => <p>{stepForm.content}</p>)
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
			<Goal
				goals={output}
			/>
			</div>
		)
	}
}

export default GoalsPage;