function isArrayUndefined(array) {
	return typeof array === "undefined";
}

export function getRightMargin(array, index) {
	return !isArrayUndefined(array) && index === array.length - 1 ? 0 : 0.5;
}

export function getHeight(value) {
	const offset = 28;
	return value + offset;
}

export function getWidth(array) {
	if (isArrayUndefined(array)) {
		return 0;
	}

	const arrayLength = array.length;
	const totalMarginLength = (arrayLength - 1) * getRightMargin();
	return (100 - totalMarginLength) / arrayLength;
}
