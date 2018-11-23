import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import './css/NavBar.css';
import SearchBar from './SearchBar.js';

import withFeature from './hoc/withFeature.js'
import withStorage from './hoc/withStorage.js'

const NavBar = ({hideSide, hideStatus, deletedLabel}) => {
	const NewSearchBar = 
	withRouter(
	withStorage(
		withFeature(SearchBar, "search", "searchId", {result: ''}, deletedLabel)))
	;

	return (
		<div>
			<ul className="NavBar">
				<li><Link to="/">Memento</Link></li>
				<li><Link to="/notes">Notes</Link></li>
				<li><Link to="/goals">Goals</Link></li>
				<NewSearchBar/>				
				<button className={"HideSideBarButton"} onClick={()=> hideSide()}>
					{hideStatus? "Show":"Hide"}
				</button>
			</ul>
		</div>
		);
}
//<li><Link to="/login">Login</Link></li>

export default NavBar;