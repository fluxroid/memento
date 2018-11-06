import React, { Component } from 'react';
import GoalForm from './GoalForm.js';
import Goal from './Goal.js';
import './css/GoalPage.css';

class GoalsPage extends Component {
	constructor(props) {
		super(props)
	 	this.state = {
      stepId: 0
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormDelete = this.handleFormDelete.bind(this);
    this.incrementStep = this.incrementStep.bind(this);
	}

	handleFormSubmit = () => {
    this.setState({
      stepId: 0
    });
    this.props.submit()
  }

  handleFormDelete = (target) => {
  	const id = parseInt(target.name, 10);
  	const {title, ...steps} = this.props.input;
    const newSteps = {...steps}
    delete newSteps[id];
    this.props.change({title, ...newSteps}, true)
  }

  incrementStep = () => {
  	this.setState((state) => ({
  		stepId: this.state.stepId + 1,
  	}));
    this.props.change({name: this.state.stepId, value: ""})
  }

  componentDidMount() {
    this.props.hideSide(false);
  }

	render() {
		return (
			<div className={"GoalPage"}>
			<GoalForm
        onFormChange={this.props.change}
        onFormSubmit={this.handleFormSubmit}
        onFormDelete={this.handleFormDelete}
        onIncrementStep={this.incrementStep}
        input={this.props.input}
			/>
      <Goal
        goals={this.props.output}
        onGoalDelete={this.props.delete}
        onGoalEdit={this.props.edit}
      />		
			</div>
		)
	}
}

export default GoalsPage;