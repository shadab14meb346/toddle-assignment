const ID = function () {
	return '_' + Math.random().toString(36).substr(2, 9);
};
export class Node {
	constructor(value, level, parentId) {
		this.id = ID();
		this.value = value;
		this.children = [];
		this.parentId = parentId;
		this.level = level;
	}
}
