import React from 'react';
import withFeature from './hoc/withFeature.js'
import withStorage from './hoc/withStorage.js'

import Note from './Note.js';
import Goal from './Goal.js';
import './css/ResultsPage.css'

const ResultsPage = (props) => { 
	const [filterValue, value] = props.match.params.keys.split("=")
	
	const filterFunction = (value, filterValue) => {
		const excludedKeys = ["id","date","labels"];
		if (filterValue === 'query') {
			return (item) => item.filter(iter => {
				return Object.keys(iter).some(key => {
					return !(key in excludedKeys) 
					&& String(iter[key]).toLowerCase().includes(value)
				})
			})
		}
		return (item) => item.filter(iter => value in iter[filterValue] && iter[filterValue][value])
	}; 
	
	const NewNote = withStorage(
      withFeature(Note, "notes", "noteId", {title: '', body: ''}, props.deletedLabel, 
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
