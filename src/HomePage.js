import React, { Component } from 'react';

class HomePage extends Component {
	render() {
		const text = `memento
		/məˈmenˌtō/
		noun
		an object kept as a reminder or 
		souvenir of a person or 
		event.`

		return (
			<div className="HomeContainer">
				<div className="HomeContent">{text}</div>
			</div>
		)
	}
}
export default HomePage;