import React from 'react';
import styles from './Node.module.css';

export const NodeComponent = ({ node, onIndent }) => {
	const onIndentClick = (node) => {
		onIndent(node);
	};

	return (
		<>
			<div class={styles.main}>
				<div class={styles.arrow} onClick={(e) => onIndentClick(node)}>
					i
				</div>
				<div
					class={styles.indent}
					style={{
						marginLeft: node.level > 0 ? `${node.level * 20}px` : 0
					}}
				/>
				<div
					class={styles.text}
					style={{
						color:
							node.level === 0 ? '#18dc60' : node.level === 1 ? 'grey' : '#ccc'
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
					/>
				);
			})}
		</>
	);
};
