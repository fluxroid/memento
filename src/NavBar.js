import React from 'react';
import {Link} from "react-router-dom";

const NavBar = ({hideSide, hideStatus}) => {
	return (
		<div>
			<ul className="NavBar">
				<li><Link to="/">Memento</Link></li>
				<li><Link to="/notes">Notes</Link></li>
				<li><Link to="/goals">Goals</Link></li>
				<button className={"HideSideBarButton"} onClick={()=> hideSide()}>
					{hideStatus? "Show":"Hide"}
				</button>
			</ul>
		</div>
		);
}
//<li><Link to="/login">Login</Link></li>

export default NavBar;