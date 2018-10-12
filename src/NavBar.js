import React from 'react';
import {Link} from "react-router-dom";

const NavBar = (loginStatus, signOut) => {
	return (
		<div>
			<ul className="NavBar">
				<li><Link to="/">Home</Link></li>
				<li><Link to="/notes">Notes</Link></li>
				<li><Link to="/goals">Goals</Link></li>
			</ul>
		</div>
		);
}
//<li><Link to="/login">Login</Link></li>

export default NavBar;