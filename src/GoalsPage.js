import React, { Component } from 'react';
import GoalForm from './GoalForm.js';
import Goal from './Goal.js';
import './css/GoalPage.css';

class GoalsPage extends Component {
	render() {
		return (
			<div className={"GoalPage"}>
			<GoalForm
        {...this.props}
        title={"Title"}
			/>
      <Goal
        {...this.props}
      />		
			</div>
		)
	}
}

export default GoalsPage;