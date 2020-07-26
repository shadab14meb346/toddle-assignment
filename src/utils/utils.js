const ID = function () {
	return '_' + Math.random().toString(36).substr(2, 9);
};
export const treedata = [
	{
		id: '#level1.1',
		value: 'level 1 text 1',
		level: 1,
		children: [
			{
				id: '#level1.1.1',
				value: 'level 1 text 1 child 1',
				level: 2,
				children: []
			},
			{
				id: '#level1.1.2',
				value: 'level 1 text 1 child 2',
				level: 2,
				children: []
			},
			{
				id: '#level1.1.3',
				value: 'level 1 text 1 child 3',
				level: 2,
				children: [
					{
						id: '#level1.1.3.1',
						value: 'level 1 text 1 child 3 child 1',
						level: 3,
						children: []
					}
				]
			}
		]
	},
	{
		id: '#level1.2',
		value: 'level 1 text 2',
		level: 1,
		children: [
			{
				id: '#level1.2.1',
				value: 'level 1 text 2 child 1',
				level: 2,
				children: [
					{
						id: '#level1.2.2',
						level: 3,
						value: 'level 1 text 2 child 1 child 1',
						children: []
					}
				]
			}
		]
	},
	{
		id: '#level1.3',
		value: 'level 1 text 3',
		level: 1,
		children: [
			{
				id: '#level1.2.1',
				level: 2,
				value: 'level 1 text 3 child 1',
				children: []
			}
		]
	}
];
export class Node {
	constructor(value, level, parentId) {
		this.id = ID();
		this.value = value;
		this.children = [];
		this.parentId = parentId;
		this.level = level;
	}
}

const _insert = (node, parentId, newNode) => {
	if (node.id === parentId) {
		node.append(newNode);
		return;
	}
	for (const child of node.children) {
		_insert(child, parentId, newNode);
	}
};
const add = (node, parentId, newNode) => {
	_insert(node, parentId, newNode);
};
const updateLevels = (node) => {
	for (const child of node.children) {
		child.level = node.level + 1;
		this.updateLevels(child);
	}
	return node;
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
		updateLevels(node);
	}
};
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

const _indentTree = (indentNodeId, node) => {
	let resultNode;
	if (node.id === indentNodeId) {
		return node;
	}
	for (const child of node.children) {
		resultNode = _getNode(child, indentNodeId);
	}
	return resultNode;
};

const getNodeByIdInTree = (tree, nodeId) => {
	for (const node of tree) {
		if (node.id === nodeId) return node;
		_getNodeByIdInTree(node, nodeId);
	}
};
const _getNodeByIdInTree = (node, nodeId) => {
	if (node.id === nodeId) {
		return node;
	}
	for (const child of node.children) {
		_getNodeByIdInTree(child, nodeId);
	}
};
const _traverseAndUpdate = (node, nodeId, newNode) => {
	if (node.id === nodeId) {
		node.children.push(newNode);
		console.log(node.children);
		return;
	}
	for (const child of node.children) {
		_traverseAndUpdate(child, nodeId, newNode);
	}
};

const traverseAndDelete = (tree, nodeToDelete) => {
	for (const child of tree) {
		console.log(child.id, nodeToDelete.id);
		if (child.id === nodeToDelete.id) {
			const filtered = child.children.filter(
				(child) => child.id !== nodeToDelete.id
			);
			child.children = filtered;
			console.log('Called', tree);
			return;
		}
		_traverseAndDelete(child, nodeToDelete);
	}
};
const _traverseAndDelete = (node, nodeToDelete) => {
	if (node.id === nodeToDelete.id) {
		const filtered = node.children.filter(
			(child1) => child1.id !== nodeToDelete.id
		);
		node.children = filtered;
		return;
	}
	for (const child of node.children) {
		_traverseAndDelete(child, nodeToDelete);
	}
};
