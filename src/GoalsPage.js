import React, { Component } from 'react';
import GoalForm from './GoalForm.js';

class GoalsPage extends Component {
	constructor(props) {
		super(props)
	 	this.state = {
      input: {body: '', steps:[]},
      output: [],
      deleted: false,
      previousOutput: []
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	handleFormSubmit = () => {
    const oldOutput = this.state.output;
    const newOutput = [ ...oldOutput, {...this.state.input}];
    this.setState({
      output: newOutput,
      input: {body: ''} 
    });
  }

  handleFormChange = (target) => {
    this.setState({
      input: { ...this.state.input, ...{[target.name]: target.value} }
    });
  }

	render() {
		const {input, output, deleted} = {...this.state};

		return (
			<div>
			<GoalForm
					body={'Write a goal'} 
          onFormChange={this.handleFormChange}
          onFormSubmit={this.handleFormSubmit}
          input={input}
			/>
			<p>{input.body}</p>
			</div>
		)
	}
}

export default GoalsPage;