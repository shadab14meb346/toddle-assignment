import React from 'react';
import './TreeComponent.css';

const ID = function () {
	return '_' + Math.random().toString(36).substr(2, 9);
};

class Node {
	constructor(value) {
		this.id = ID();
		this.value = value;
		this.children = [];
		this.parent = null;
		this.level = null;
	}

	append(node) {
		this.children.push(node);
	}

	delete(nodeId) {
		this.children = this.children.filter((node) => node.id !== nodeId);
	}
}

class Tree {
	constructor() {
		this.root = new Node('root');
	}

	add(parentId, newNode) {
		this._insert(this.root, parentId, newNode, 0);
	}

	_insert(node, parentId, newNode, level) {
		if (node.id === parentId) {
			newNode.parent = node;
			newNode.level = level;
			node.append(newNode);
			return;
		}
		level++;
		for (const child of node.children) {
			this._insert(child, parentId, newNode, level);
		}
	}

	indent() {}
}

const tree = new Tree();
const numbers = new Node('Numbers');
const count = new Node('Count');
const maths = new Node('Maths');
const simple = new Node('Use simple');
const describe = new Node('Describe');
const describeChild = new Node('Describe Child');

tree.add(tree.root.id, numbers);
tree.add(tree.root.id, maths);
tree.add(numbers.id, count);
tree.add(maths.id, simple);
tree.add(maths.id, describe);
tree.add(describe.id, describeChild);

const _traverseAndRender = (node) => {
	// if (!node.children.length) {
	// 	return (
	// 		<div className="row" id={node.id}>
	// 			<div
	// 				className="indent"
	// 				style={{ marginLeft: `${node.level} *12px` }}></div>
	// 			<div className="textBox">{node.value}</div>
	// 		</div>
	// 	);
	// }
	// if (node.value !== 'root') {
	// 	for (const child of node.children) {
	// 		_traverseAndRender(child);
	// 	}
	// } else {
	// 	for (const child of node.children) {
	// 		_traverseAndRender(child);
	// 	}
	// }
	console.log(node);
	if (!node.children.length) {
		// console.log('NO children nodes', node);
		return <div>{node.value}</div>;
	} else {
		for (const child of node.children) {
			_traverseAndRender(child);
		}
	}
};
const traverseAndRender = (tree) => {
	_traverseAndRender(tree.root);
};
const TreeComponent = () => {
	console.log(traverseAndRender(tree));
	return <div className="main">{traverseAndRender(tree)}</div>;
};

export default TreeComponent;
