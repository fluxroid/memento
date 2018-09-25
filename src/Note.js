import React from 'react';

const Note = ({
	text
}) =>
	<div className={'Note'}>
		<h3>{text.title}</h3>
		{text.body}
	</div>

export default Note;