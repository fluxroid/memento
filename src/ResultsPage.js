import React from 'react';
import withFeature from './hoc/withFeature.js'
import withStorage from './hoc/withStorage.js'

import Note from './Note.js';
import Goal from './Goal.js';
import './css/ResultsPage.css'

const ResultsPage = (props) => { 
	const [filterValue, value] = props.match.params.keys.split("=")

	const filterFunction = (value, filterValue) => 
	(item) => item.filter(iter => value in iter[filterValue]); 
	
	const NewNote = withStorage(
      withFeature(Note, "output", "id", {title: '', body: ''}, props.deletedLabel, 
      	filterFunction(value, filterValue)));

	const NewGoal = withStorage(
      withFeature(Goal, "goals", "goalId", {title: ''}, props.deletedLabel,
            	filterFunction(value, filterValue)));
	return (
		<div className="ResultsPage">
		<NewNote/>
		<NewGoal/>
		</div>
		)
}

export default ResultsPage;
