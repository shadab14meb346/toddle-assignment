const ID = function () {
	return '_' + Math.random().toString(36).substr(2, 9);
};

export class Node {
	constructor(value) {
		this.id = ID();
		this.value = value;
		this.children = [];
		this.parent = null;
		this.level = null;
	}

	append(node) {
		node.parent = this;
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

export class Tree {
	constructor() {
		this.root = null;
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
	traverseBF(fn) {
		let newTree = new Tree();
		const arr = [this.root];
		while (arr.length) {
			const node = arr.shift();

			arr.push(...node.children);

			newTree.add(node.parent === null ? node['id'] : node.parent.id, node);
			fn(node);
		}
		return newTree;
	}
	traverseAndCopy() {
		const newTree = new Tree();
		const arr = [this.root];
		while (arr.length) {
			this.add(this.root);
		}
	}
}
