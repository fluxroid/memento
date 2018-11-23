import React from 'react';

const SearchBar = (props) => {
		const path = "/results/query="+props.input.result.toLowerCase();
		return (

		<form 
			className={"SearchForm"}
		  autoComplete={"off"}
		>
				<input type='text'
					className={"SearchInput"}
					value={props.input.result}
					name={"result"}
					onChange={event => {
						props.change(event.target); 
					}}
				/>	
				<input type="submit" 
       	value="Search"
       	className={"SearchButton"}
       	onClick={event => {
    			event.preventDefault();
       		props.history.replace(path);
       	}}
       	/>
		</form>
		);
}

export default SearchBar;