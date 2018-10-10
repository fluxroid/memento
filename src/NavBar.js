import React from 'react';

const NavBar = (loginStatus, signOut) => {
	return (
		<div>
			<ul className="NavBar">
				<li><a href="/">Home</a></li>
				<li><a href="/about">About</a></li>
				<li><a href="/notes">Notes</a></li>
				<li><a href="/goals">Goals</a></li>
				<li><a href="/login">Login</a></li>
			</ul>
		</div>
		);
}

export default NavBar;