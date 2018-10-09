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
	this.timerOver = this.timerOver.bind(this);
	this.adjustTimer = this.adjustTimer.bind(this);
	}

	componentDidMount() {
		this.adjustTimer()
		if (!this.state.done) {
		this.timerID = setInterval(
			() => this.tick(),
			1000
			);
		}
	}

	adjustTimer = () => {
		const currentDate = new Date();
		const date = new Date(this.props.time);
		const diff = currentDate.getTime() - date.getTime(); 
		if (diff > 24 * 60 * 60 * 1000) {
			this.setState({
				done: true
			});
			this.timerOver();
		}
		else {
			console.log('eys')
			const updatedTime = this.state.time - diff;
			this.setState({
				time: new Date(updatedTime)
			})
		} 
	}

	timerOver = () => {
		this.props.onNoteDelete(this.props.id, true);
	}

	tick() {
		const {time, done} = this.state;
		const diff = time - 1000;
		const total = time.getHours() + time.getMinutes() + time.getSeconds();
		if (!done && total > 0)
			this.setState({
				time: new Date(diff)
			})
		else if (!done && total <= 0) {
			this.setState({
				done: true
			})
			this.timerOver();
		}
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	render () {
		const {time, done} = this.state;
		return (
		<div className={'Timer'}>
		{
			!done && 
			time.toLocaleTimeString('en-US', { hour12: false })
		}
		</div>
	)
	}
}
export default Timer;