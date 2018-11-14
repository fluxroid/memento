import React, { Component } from 'react';
import './css/Goal.css';
import CheckBox from './CheckBox.js'
//import Timer from './Timer.js'

class Goal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: {},
		};
		this.handleDrop = this.handleDrop.bind(this);
	}

	handleDrop(event) {
		const oldVisible = this.state.visible;
		const value = oldVisible[event.target.name];
		this.setState({
				visible: {...oldVisible, ...{[event.target.name]: !value }}
		});
	}

	render () {
		const checked = this.props.checked;
		const goals = this.props.goals.map( (goal, goalIndex) => {
			const {title, id, date, labels, ...steps} = goal;
	
			const shownLabels = Object.keys(labels).filter(label => labels[label]);
			const children = Object.keys(steps).map( (stepId, stepIndex) => {

				return (
					<div key={stepId}>
							<CheckBox
								checked={id in checked && checked[id][stepId]}
								onChange={(event) => this.props.onHandleCheck(event)}
								name={id+","+stepId}
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
			<div key={id} className="GoalWrapper">
			<div className={"Goal"}>
				<div>
					<CheckBox 
						checked={id in checked && checked[id]['title']}
						name={id+",title"}
						onChange={(event) => this.props.onHandleCheck(event)}
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
							onClick={(event) => this.props.onGoalDelete(event.target)}
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
			{(shownLabels.length > 0) && <div className={"GoalLabelContainer"} >
					<ul>{shownLabels.map((label, index) => 
						<li key={index} className={"GoalLabelSelection"}><button>{label}</button></li>)}
					</ul>
			</div>
			}
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