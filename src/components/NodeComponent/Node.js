import React from 'react';
import './Node.css';

export const NodeComponent = ({ node, onIndent, onOutdent }) => {
	const onIndentClick = (node) => {
		onIndent(node);
	};
	const onOutdentClick = (node) => {
		onOutdent(node);
	};
	return (
		<>
			<div className="main">
				<div className="arrow" onClick={(e) => onOutdentClick(node)}>
					<i className="fas fa-arrow-left"></i>
				</div>
				<div className="arrow" onClick={(e) => onIndentClick(node)}>
					<i className="fas fa-arrow-right"></i>
				</div>
				<div
					className="indent"
					style={{
						marginLeft: node.level > 0 ? `${node.level * 20}px` : 0
					}}
				/>
				<div
					className="text"
					// contentEditable="true"
					style={{
						color:
							node.level === 1 ? '#18dc60' : node.level === 2 ? 'grey' : '#ccc'
					}}>
					{node.value}
				</div>
			</div>
			{node.children.map((node) => {
				return (
					<NodeComponent
						node={node}
						key={node.id}
						onIndent={(node) => onIndentClick(node)}
						onOutdent={(node) => onOutdentClick(node)}
					/>
				);
			})}
		</>
	);
};
