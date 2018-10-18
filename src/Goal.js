import React, { Component } from 'react';
import CheckBox from './CheckBox.js'

class Goal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: {},
			checked: {}		
		};
		this.handleDrop = this.handleDrop.bind(this);
		this.handleCheck = this.handleCheck.bind(this); 
	}

	handleDrop(event) {
		const oldVisible = this.state.visible;
		const value = oldVisible[event.target.name];
		this.setState({
				visible: {... oldVisible, ...{[event.target.name]: !value }}
		});
	}
	

	handleCheck(event) {
		const oldChecked = this.state.checked;
		const [goalIndex, key] = event.target.name.split(',');
		if (goalIndex in oldChecked){
			const newValue = {[key]: !oldChecked[goalIndex][key]};
			const newObj = {[goalIndex]: {...oldChecked[goalIndex], ...newValue}};
			this.setState({
				checked: {... oldChecked, ...newObj}
			});
		}
		else {
			const newObj = {[goalIndex]: {[key]: true}}
			this.setState({
				checked: {...oldChecked, ...newObj}
			})
		}
	}

	render () {
		const checked = this.state.checked;
		const goals = this.props.goals.map( (goal, goalIndex) => {
			const steps = goal.stepForms.map( (step, stepIndex) => {
				return (
					<div key={step.id}>
							<CheckBox
								parent={goalIndex in checked && checked[goalIndex]['title']}
							/>
							<span>{step.content}</span>
					</div>
				);	
			})
			return (
			<div key={goal.id} className={"Goal"}>
				<div>
					<input type="checkbox" 
						name={goalIndex+","+"title"}
						onChange={this.handleCheck}
					/>
					<span>{goal.title}</span>
					<span className={"DropDown"}>
						<button
							name={goalIndex} 
							type="text"
							onClick={this.handleDrop}
						>
							{this.state.visible[goalIndex] ? "-" : "+" }
						</button>
					</span>
				</div>
				<div>{this.state.visible[goalIndex] && steps}</div>
			</div>
			);
				}
			)
		
		return (
			<div className={"GoalContainer"}>
				{goals}
			</div>
		);
	}
}
export default Goal;