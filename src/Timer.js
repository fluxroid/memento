import React, { Component } from 'react';

const initialTime = new Date();
initialTime.setHours(23);
initialTime.setMinutes(59);
initialTime.setSeconds(59);

class Timer extends Component {
	constructor(props) {
		super(props);
	
		this.state = { 
			time: initialTime,
			done: false
		};

	}

	componentDidMount() {
		if (!this.state.done) {
		this.timerID = setInterval(
			() => this.tick(),
			1000
			);
		}
	}

	tick() {
		const diff = this.state.time - 1000;
		this.setState({
			time: new Date(diff)
		})
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	render () {
		const {time, done} = this.state;
		return (
		<div>{
			!done && 
			time.toLocaleTimeString('en-US', { hour12: false })}
		</div>
	)
	}
}
export default Timer;