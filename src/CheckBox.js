import React from 'react';

const CheckBox = ({checked, name, onChange}) => {
		return (
			<input
				type={"checkbox"}
				checked={checked}
				name={name}
				onChange={(event) => onChange(event)}
				className={"CheckBox"}
				/>
		)
	}
	
export default CheckBox