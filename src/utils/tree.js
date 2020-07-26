import fs from 'fs';
const ID = function () {
	return '_' + Math.random().toString(36).substr(2, 9);
};

class Node {
	constructor(value) {
		this.id = ID();
		this.value = value;
		this.children = [];
		this.parentId = null;
		this.level = null;
	}

	append(node) {
		node.parentId = this.id;
		const l = this.level === null ? -1 : this.level;
		node.level = l + 1;
		this.children.push(node);
	}

	delete(nodeId) {
		this.children = this.children.filter((node) => node.id !== nodeId);
	}

	isRoot() {
		return this.value === 'root';
	}
}

class Tree {
	constructor() {
		this.root = new Node('root');
	}

	// add node
	add(parentId, newNode) {
		this._insert(this.root, parentId, newNode);
	}

	_insert(node, parentId, newNode) {
		if (node.id === parentId) {
			node.append(newNode);
			return;
		}
		for (const child of node.children) {
			this._insert(child, parentId, newNode);
		}
	}
	// =======================================

	indent(node) {
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
	}

	outdent(node) {
		const grandParent = node.parent.parent;
		if (!grandParent) {
			return;
		}
		node.parent.delete(node.id);
		grandParent.append(node);
		this.updateLevels(node);
	}

	updateLevels(node) {
		for (const child of node.children) {
			child.level = node.level + 1;
			this.updateLevels(child);
		}
	}
}

const tree1 = new Tree();

const root = new Node('root');

tree1.root = root;

const numbers = new Node('numbers');
const count = new Node('count');

const maths = new Node('maths');
const d = new Node('describe');
const d2 = new Node('describe child');

// tree1.add(tree1.root.id, numbers);
// tree1.add(tree1.root.id, maths);

// tree1.add(numbers.id, count);
// tree1.add(maths.id, d);
// tree1.add(d.id, d2);

export { tree1, Node };
