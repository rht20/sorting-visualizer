export function isUndefined(array) {
	return typeof array === "undefined";
}

function getOffset() {
	return 28;
}

export function getDivHeight() {
	return 500;
}

export function getMarginTop(value) {
	return 230 - 2 * value - getOffset();
}

export function getMarginRight(array, index) {
	return !isUndefined(array) && index === array.length - 1 ? 0 : 0.5;
}

export function getHeight(value) {
	return 2 * value + getOffset();
}

export function getWidth(array) {
	if (isUndefined(array)) {
		return 0;
	}

	const arrayLength = array.length;
	const totalMarginLength = (arrayLength - 1) * getMarginRight();
	return (100 - totalMarginLength) / arrayLength;
}
