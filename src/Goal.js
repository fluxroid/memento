import React, { Component } from 'react';

class Goal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "+",
			visible: false
		};
		this.handleDrop = this.handleDrop.bind(this);
	}

	handleDrop() {
		this.setState({
			text: this.state.text === "+"? "-" : "+",
			visible: !this.state.visible
		});
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
			<div className={"Goal"}>
				<div>
					<input type="checkbox" 
					/>
					<span>{goal.title}</span>
					<span className={"DropDown"}>
						<button 
							type="text"
							onClick={this.handleDrop}
						>
							{this.state.text}
						</button>
					</span>
				</div>
				<div>{this.state.visible && steps}</div>
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