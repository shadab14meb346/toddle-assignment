export const deepCopyObject = (objToCopy) => {
	if (typeof objToCopy !== 'object' || objToCopy === null) {
		return objToCopy;
	}
	const newObject = {};
	for (const key in objToCopy) {
		if (Array.isArray(objToCopy[key])) {
			newObject[key] = objToCopy[key].map((elem) => {
				return deepCopyObject(elem);
			});
		} else {
			newObject[key] = deepCopyObject(objToCopy[key]);
		}
	}
	return newObject;
};
export const deepCopyObjectAndFormArray = (objToCopy) => {
	return Object.values(deepCopyObject(objToCopy));
};
