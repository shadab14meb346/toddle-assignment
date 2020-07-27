import React, { useState } from 'react';
import './MainComponent.css';
import { NodeComponent } from '../NodeComponent/Node';
import {
	deepCopyObject,
	deepCopyObjectAndFormArray
} from '../../utils/deepCopyObj';
import { Node } from '../../utils/utils';

const getNodeByIdInTree = (tree, nodeId) => {
	if (!nodeId) return tree;
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
const deleteNode = (tree, node) => {
	const parent = getNodeByIdInTree(tree, node.parentId);
	parent.children = parent.children.filter((child) => child.id !== node.id);
};
const nodeIndex = (nodeId, dataInArrayFormat) => {
	for (let i = 0; i < dataInArrayFormat.length; i++) {
		if (dataInArrayFormat[i].id === nodeId) return i;
	}
};

export default function MainComponent() {
	const [tree, setTree] = useState([]);
	const [inputText, setInputText] = useState('');
	const [headNode, setHeadNode] = useState(null);
	const [level, setLevel] = useState(1);

	const onChangeHandler = (e) => {
		setInputText(e.target.value);
	};

	const handleClick = (e) => {
		if (level === 1) {
			addNewNode(null, new Node(inputText, level, null));
		} else {
			addNewNode(headNode.id, new Node(inputText, level, headNode.id));
		}
	};
	const dataStr =
		'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(tree));
	const addNewNode = (parentId, newNode) => {
		const clonedPrevTree = deepCopyObjectAndFormArray(tree);
		if (parentId) {
			setTree((prevTree) => {
				const parentNode = getNodeByIdInTree(clonedPrevTree, parentId);
				parentNode.children.push(newNode);
				return clonedPrevTree;
			});
		} else {
			setTree((prevTree) => {
				clonedPrevTree.push(newNode);
				return clonedPrevTree;
			});
		}
	};

	const onIndent = (node) => {
		setTree((prevTree) => {
			const clonedPrevTree = deepCopyObjectAndFormArray(prevTree);
			const clonedNode = deepCopyObject(node);
			if (!node.parentId) {
				const index = nodeIndex(node.id, clonedPrevTree);
				if (!index) return prevTree;
				const toBeParent = clonedPrevTree[index - 1];
				setHeadNode(toBeParent);
				clonedNode.parentId = toBeParent.id;
				clonedNode.level = toBeParent.level + 1;
				setLevel(toBeParent.level + 1);
				toBeParent.children.push(clonedNode);
				return clonedPrevTree.filter((child) => child.id !== node.id);
			} else {
				const parentNodeOfClickedNode = getNodeByIdInTree(
					clonedPrevTree,
					node.parentId
				);
				let siblings = parentNodeOfClickedNode.children;
				const index = nodeIndex(node.id, siblings);
				const toBeParent = siblings[index - 1];
				clonedNode.level = clonedNode.level + 1;
				setLevel(toBeParent.level + 1);
				parentNodeOfClickedNode.children = parentNodeOfClickedNode.children.filter(
					(sibInd) => sibInd.id !== node.id
				);
				toBeParent.children.push(clonedNode);
				return clonedPrevTree;
			}
		});
	};

	const onOutdent = (node) => {
		setTree((prevTree) => {
			if (!node.parentId) return prevTree;
			const clonedPrevTree = deepCopyObjectAndFormArray(prevTree);
			const clonedNode = deepCopyObject(node);
			const parentNodeOfClickedNode = getNodeByIdInTree(
				clonedPrevTree,
				node.parentId
			);
			parentNodeOfClickedNode.children = parentNodeOfClickedNode.children.filter(
				(child) => child.id !== node.id
			);
			clonedNode.level = node.level - 1;
			clonedNode.parentId = null;
			setLevel(node.level - 1);
			setHeadNode(null);
			if (!parentNodeOfClickedNode.parentId) {
				clonedPrevTree.push(clonedNode);
			} else {
				const toBeParentNode = getNodeByIdInTree(
					clonedPrevTree,
					parentNodeOfClickedNode.parentId
				);
				toBeParentNode.children.push(clonedNode);
			}
			return clonedPrevTree;
		});
	};

	const onDelete = (node) => {
		setTree((prevTree) => {
			const clonedPrevTree = deepCopyObjectAndFormArray(prevTree);
			const clonedNode = deepCopyObject(node);
			const fondNode = getNodeByIdInTree(clonedPrevTree, node.id);
			const parentNodeId = node.parentId;
			if (parentNodeId) {
				const parentNode = getNodeByIdInTree(clonedPrevTree, parentNodeId);
				parentNode.children = parentNode.children.filter(
					(child) => child.id !== node.id
				);
				return clonedPrevTree;
			} else {
				return clonedPrevTree.filter((child) => child.id !== node.id);
			}
		});
	};

	const handleFile = (e) => {
		const content = e.target.result;
		console.log('file content', content);
		setTree(JSON.parse(content));
	};

	const handleChangeFile = (file) => {
		let fileData = new FileReader();
		fileData.onloadend = handleFile;
		fileData.readAsText(file);
	};

	return (
		<div>
			<div className="tree-container">
				{tree.map((node) => {
					return (
						<NodeComponent
							key={node.id}
							node={node}
							onIndent={onIndent}
							onOutdent={onOutdent}
							onDelete={onDelete}
						/>
					);
				})}
			</div>
			<input
				type="text"
				className="input-text"
				onChange={onChangeHandler}
				placeholder="add a standard"></input>
			<button className="button" onClick={handleClick}>
				<i className="fas fa-plus-circle"></i>Add a standard
			</button>
			<a href={dataStr} download="treeStrc.json">
				Download as json
			</a>
			<div>
				<p>Upload file to generate structure</p>
				<input
					type="file"
					accept=".json"
					onChange={(e) => handleChangeFile(e.target.files[0])}
				/>
			</div>
		</div>
	);
}
