export function mergeSortCaller(array) {
	const sortingSteps = [];
	const auxiliaryArray = [];
	for (let i = 0; i < array.length; i++) {
		auxiliaryArray.push(0);
	}

	mergeSort(array, 0, array.length - 1, auxiliaryArray, sortingSteps);

	const sortedIndices = [];
	for (let i = 0; i < array.length; i++) {
		sortedIndices.push(i);
	}
	sortingSteps.push({
		array: [...array],
		start: 0,
		end: array.length - 1,
		auxiliaryArray: [...auxiliaryArray],
		sortedIndices: [...sortedIndices],
	});

	return sortingSteps;
}

function mergeSort(array, start, end, auxiliaryArray, sortingSteps) {
	sortingSteps.push({
		array: [...array],
		start: start,
		end: end,
		auxiliaryArray: [...auxiliaryArray],
	});

	if (start === end) {
		return;
	}

	const mid = Math.floor((start + end) / 2);

	mergeSort(array, start, mid, auxiliaryArray, sortingSteps);
	mergeSort(array, mid + 1, end, auxiliaryArray, sortingSteps);

	merge(array, start, end, mid, auxiliaryArray, sortingSteps);
}

function merge(array, start, end, mid, auxiliaryArray, sortingSteps) {
	sortingSteps.push({
		array: [...array],
		start: start,
		end: end,
		auxiliaryArray: [...auxiliaryArray],
	});

	let i = start;
	let j = mid + 1;
	let k = start;
	for (; i <= mid && j <= end; k++) {
		sortingSteps.push({
			array: [...array],
			start: start,
			end: end,
			auxiliaryArray: [...auxiliaryArray],
			comparison: [i, j],
		});

		if (array[i] <= array[j]) {
			sortingSteps.push({
				array: [...array],
				start: start,
				end: end,
				auxiliaryArray: [...auxiliaryArray],
				moveToAuxiliaryArray: [i, k],
			});
			auxiliaryArray[k] = array[i];
			array[i++] = 0;
		} else {
			sortingSteps.push({
				array: [...array],
				start: start,
				end: end,
				auxiliaryArray: [...auxiliaryArray],
				moveToAuxiliaryArray: [j, k],
			});
			auxiliaryArray[k] = array[j];
			array[j++] = 0;
		}
	}

	while (i <= mid) {
		sortingSteps.push({
			array: [...array],
			start: start,
			end: end,
			auxiliaryArray: [...auxiliaryArray],
			moveToAuxiliaryArray: [i, k],
		});
		auxiliaryArray[k++] = array[i];
		array[i++] = 0;
	}

	while (j <= end) {
		sortingSteps.push({
			array: [...array],
			start: start,
			end: end,
			auxiliaryArray: [...auxiliaryArray],
			moveToAuxiliaryArray: [j, k],
		});
		auxiliaryArray[k++] = array[j];
		array[j++] = 0;
	}

	for (k = start; k <= end; k++) {
		sortingSteps.push({
			array: [...array],
			start: start,
			end: end,
			auxiliaryArray: [...auxiliaryArray],
			copyBackToOriginalArray: [k, k],
		});
		array[k] = auxiliaryArray[k];
		auxiliaryArray[k] = 0;
	}

	sortingSteps.push({
		array: [...array],
		start: start,
		end: end,
		auxiliaryArray: [...auxiliaryArray],
	});
}
