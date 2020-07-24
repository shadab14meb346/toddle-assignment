import React from 'react';
import Subject from './components/Subject/Subject';
import ActionTitle from './components/ActionTitle/ActionTitle';
import StandardTitle from './components/StandardTitle/StandardTitle';
import TreeComponent from './components/TreeComponent/TreeComponent';
import './App.css';

function App() {
	return (
		<div className="container">
			<div className="content">
				<Subject name="MATHEMATICS" />
				<div className="heading">
					<ActionTitle />
					<StandardTitle />
				</div>
				<TreeComponent />
			</div>
		</div>
	);
}

export default App;
