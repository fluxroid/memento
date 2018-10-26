import React, { Component } from 'react';

function withStorage(WrappedComponent) {
	return class extends Component {
	
		load = (key, d) => {
			const result = localStorage.getItem(key)
			return result? JSON.parse(result) : d 		
		}
		save = (key, value) => {
			localStorage.setItem(key, JSON.stringify(value));
		}
		render() {
			return (
				<WrappedComponent
					load={this.load}
					save={this.save}
					{...this.props}
				/>
			);
		}
	}
}

export default withStorage;