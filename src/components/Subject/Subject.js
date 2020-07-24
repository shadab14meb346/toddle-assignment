import React from 'react';
import './Subject.css';

const Subject = ({ name }) => {
	return (
		<div>
			<h1 className="title">{name}</h1>
		</div>
	);
};

export default Subject;
