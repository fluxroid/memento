import React, { Component } from 'react';

class CheckBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: this.props.parent
		};
		this.handleCheck = this.handleCheck.bind(this);
	}

	handleCheck(event) {
		this.setState({
			checked: !this.state.checked
		});
	}

	render() {
		return (
			<input
				type={"checkbox"}
				checked={this.props.parent || this.state.checked}
				onChange={this.handleCheck}
				className={"CheckBox"}
				/>
		)
	}

}
export default CheckBox