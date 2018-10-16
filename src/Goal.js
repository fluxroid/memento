import React, { Component } from 'react';


class Goal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: {} 
		};
		this.handleDrop = this.handleDrop.bind(this);
	}

	handleDrop(event) {
		const oldVisible = this.state.visible;
		if (event.target.name in this.state.visible){
			const newValue = !oldVisible[event.target.name];
			this.setState({
				visible: {...oldVisible, ...{[event.target.name]: newValue } }
			});
		}
		else {
			this.setState({
				visible: {... oldVisible, ...{[event.target.name]: true }}
			});
		}
	}

	render () {
		const goals = this.props.goals.map( (goal, goalIndex) => {
			const steps = goal.stepForms.map( (step, stepIndex) => {
				return (
					<div key={step.id}>
							<input 
								type="checkbox" 							
							/>
							<span>{step.content}</span>
					</div>
				);	
			})
			return (
			<div key={goal.id} className={"Goal"}>
				<div>
					<input type="checkbox" 
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