import React, { useState } from 'react';

import { NodeComponent } from './Node';
import { Tree, Node } from './tree';

const traverseAndReturnTree = (tree) => {
	return _traverseAndReturnTree(tree.root);
};

const _traverseAndReturnTree = (node) => {
	const result = [];
	if (node.value !== 'root') {
		result.push(<NodeComponent node={node} />);
		for (const child of node.children) {
			result.push(<NodeComponent node={child} />);
		}
	} else {
		for (const child of node.children) {
			result.push(<NodeComponent node={child} />);
		}
	}
	return result;
};

const tree1 = new Tree();

const root = new Node('root');

tree1.root = root;

const numbers = new Node('numbers');
const count = new Node('count');

const maths = new Node('maths');
const d = new Node('describe');
const d2 = new Node('describe child');

tree1.add(tree1.root.id, numbers);
tree1.add(tree1.root.id, maths);

tree1.add(numbers.id, count);
tree1.add(maths.id, d);
tree1.add(d.id, d2);

const getNode = (tree, newNode) => {
	return _getNode(tree.root, newNode);
};

const _getNode = (node, newNode) => {
	let resultNode;
	if (node.id === newNode.id) {
		return node;
	}
	for (const child of node.children) {
		resultNode = _getNode(child, newNode);
	}
	return resultNode;
};

const indent1 = (node, prevTree) => {
	const nodeClone = { ...node };
	const ourNode = getNode(prevTree, nodeClone);
	const siblings = ourNode.parent.children;
	if (siblings.length <= 1) {
		return;
	}
	let index;
	let willBeParent;
	for (let i = 0; i < siblings.length; i++) {
		if (siblings[i].id === ourNode.id) {
			index = i - 1;
			willBeParent = siblings[index];
			break;
		}
	}
	if (willBeParent) {
		ourNode.parent.children = ourNode.children.filter(
			(child) => child.id !== ourNode.id
		);
		willBeParent.children.push(ourNode);
	}
};
const indent = (node) => {
	const siblings = node.parent.children;
	if (siblings.length <= 1) {
		return;
	}
	let index;
	let willBeParent;
	for (let i = 0; i < siblings.length; i++) {
		if (siblings[i].id === node.id) {
			index = i - 1;
			willBeParent = siblings[index];
			break;
		}
	}
	if (willBeParent) {
		node.parent.delete(node.id);
		willBeParent.append(node);
		this.updateLevels(node);
	}
	return node;
};
export default function App() {
	const [tree, setTree] = useState(tree1);
	const [text, setText] = useState('');
	const [headNode, setHeadNode] = useState(tree1.root);

	const onChangeHandler = (e) => {
		setText(e.target.value);
	};
	const handleClick = (e) => {
		console.log(headNode);
		headNode.append(new Node(text));
	};
	const indent = (tree, newNode) => {};

	const _indent = (node, newNode, oldTree) => {};

	const deepCopyObject = (objToCopy) => {
		if (typeof objToCopy !== 'object' || objToCopy === null) {
			return objToCopy;
		}
		const newObject = {};
		for (const key in objToCopy) {
			newObject[key] = deepCopyObject(objToCopy[key]);
		}
		return newObject;
	};
	// console.log(tree1);

	const traverseAndUpdateTree = (tree) => {
		_traverseAndUpdateTree(tree.root);
	};
	const _traverseAndUpdateTree = (node, indentedNode) => {
		if (node.id === indentedNode.id) {
			node = indentedNode;
			return;
		}
		for (const child of node.children) {
			_traverseAndUpdateTree(child);
		}
	};

	// const cloneTree = (tree) => {
	// 	const newTree = new Tree();
	// 	for (const child of tree.root.children) {
	// 		_cloneTree(child, newTree);
	// 	}
	// 	return newTree;
	// };
	// console.log(cloneTree(tree1));
	// const _cloneTree = (node, newTree) => {
	// 	newTree.add(node.parent.id);
	// };
	const onIndent = (node) => {
		// setTree((prevTree) => {
		// 	const treeClone = deepCopyObject(prevTree);
		// 	for (const child of node.children) return indent1(node, treeClone);
		// });
		setHeadNode(node);
	};
	return (
		<div className="main">
			<div className="tree-container">
				{tree.root.children.map((node) => {
					return (
						<NodeComponent key={node.id} node={node} onIndent={onIndent} />
					);
				})}
			</div>
			<input
				type="text"
				onChange={onChangeHandler}
				placeholder="add a standard"></input>
			<button onClick={handleClick}>Add a standard</button>
		</div>
	);
}
