import React, { Component } from 'react';
import './css/Goal.css';
import CheckBox from './CheckBox.js'
//import Timer from './Timer.js'

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
				visible: {...oldVisible, ...{[event.target.name]: !value }}
		});
	}
	

	handleCheck(event) {
		const oldChecked = this.state.checked;
		const [goalIndex, key] = event.target.name.split(',');
		if (goalIndex in oldChecked){
			const newValue = {[key]: !oldChecked[goalIndex][key]};
			const newObj = {[goalIndex]: {...oldChecked[goalIndex], ...newValue}};
			this.setState({
				checked: {...oldChecked, ...newObj}
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
			const {title, id, date, labels, ...steps} = goal;
			const shownLabels = Object.keys(labels).filter(label => labels[label]);
			const children = Object.keys(steps).map(stepId => {
				return (
					<div key={stepId}>
							<CheckBox
								parent={goalIndex in checked && checked[goalIndex]['title']}
							/>
							<span className="Children">
								<input type="text" 
          				value={goal[stepId]}
          				name={goalIndex+","+stepId} 
          				onChange={event => this.props.onGoalEdit(event.target)}
          				className={"Children"}
        				/>
							</span>
					</div>
				);	
			})
			return (
			<div className="GoalWrapper">
			<div key={id} className={"Goal"}>
				<div>
					<input type="checkbox" 
						name={goalIndex+",title"}
						onChange={this.handleCheck}
						className={"CheckBox"}
					/>
					<span>
						<input type="text" 
          		value={title} 
          		name={goalIndex+",title"}
          		onChange={event => this.props.onGoalEdit(event.target)}
          		className={"GoalTitle"}
        		/>
					</span>
					<span className={"DeleteGoal"}>
						<button
							name={id}
							type="text"
							onClick={event => this.props.onGoalDelete(event.target)}
						>
							x
						</button>
					</span>
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
				<div>{this.state.visible[goalIndex] && children}</div>
			</div>
			<div className={"GoalLabelContainer"} >
					<ul>{shownLabels.map(label => 
						<li className={"GoalLabelSelection"}><button>{label}</button></li>)}
					</ul>
			</div>
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