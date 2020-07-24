import React from 'react';
import './ActionTitle.css';

const ActionTitle = () => {
	return (
		<div>
			<h3>Actions</h3>
			<div>
				<div>
					<span>Move, </span>
					<span>Ident, </span>
				</div>
				<div>
					<span>Outdent, </span>
					<span>Delete </span>
				</div>
			</div>
		</div>
	);
};

export default ActionTitle;
