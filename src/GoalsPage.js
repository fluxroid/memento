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
    this.handleGoalDelete = this.handleGoalDelete.bind(this);
    this.handleGoalEdit = this.handleGoalEdit.bind(this);
    this.handleFormDelete = this.handleFormDelete.bind(this);
    this.incrementStep = this.incrementStep.bind(this);
	}

	handleFormSubmit = () => {
    const oldOutput = this.state.output;
    const id = this.state.goalId;
    console.log(id);
    const newOutput = [ ...oldOutput, {id, ...this.state.input}];
    this.setState({
      output: newOutput,
      input: {title: '', stepForms: []}, 
      goalId: id + 1,
      previousOutput: oldOutput,
      stepId: 0
    });
    localStorage.setItem("goalId", JSON.stringify(id+1));
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

  handleGoalEdit = (target) => {
    let [goalIndex, stepIndex] = target.name.split(',');
    goalIndex = parseInt(goalIndex, 10);
    stepIndex = parseInt(stepIndex, 10);
    console.log(goalIndex)
    const output = [...this.state.output]
    const key = stepIndex === -1? "title" : "content";
    if (key === "title") {
      output[goalIndex][key] = target.value;
    }
    else {
      output[goalIndex]['stepForms'][stepIndex][key] = target.value;
    }
    this.setState({
      output: output
    });
    localStorage.setItem("goals", JSON.stringify(this.state.output));
  }
  

  handleGoalDelete = (target) => {
    const id = parseInt(target.name, 10);
    const newGoal = this.state.output.filter(( goal => goal.id !== id));
    this.setState({
      previousOutput: [...this.state.previousOutput, this.state.newGoal],
      output: newGoal,
      deleted: true
    });
    localStorage.setItem("goals", JSON.stringify(newGoal));
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
		return (
			<div>
			<GoalForm
        onFormTitleChange={this.handleFormTitleChange}
        onFormStepChange={this.handleFormStepChange}
        onFormSubmit={this.handleFormSubmit}
        onFormDelete={this.handleFormDelete}
        onIncrementStep={this.incrementStep}
        input={input}
			/>
			<Goal
				goals={output}
        onGoalDelete={this.handleGoalDelete}
        onGoalEdit={this.handleGoalEdit}
			/>
			</div>
		)
	}
}

export default GoalsPage;