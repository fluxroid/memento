import React from 'react';

const LabelSelection = ({className, output, toggle, selected}) => {
	const labels = output.map(value => {
			const color = selected[value.label]? '#F0E68C' : '#AFEEEE'; 
			return <li key={value.id} 
						className={"LabelSelection"}
						>
						<button 
							style={{background: color}}
							onClick={toggle}
							name={value.label}>{value.label}</button>
						</li>
			});

	return (
		<div className={className}>
		<ul>
		{labels}
		</ul>
		</div>
		);
}

export default LabelSelection; 