export function selectionSort(array) {
	const sortingSteps = [];
	const sortedIndices = [];

	for (let i = 0; i < array.length; i++) {
		let minIndex = i;
		for (let j = i + 1; j < array.length; j++) {
			sortingSteps.push({
				array: [...array],
				sortedIndices: [...sortedIndices],
				comparison: [minIndex, j],
				minIndex: minIndex,
			});

			if (array[j] < array[minIndex]) {
				minIndex = j;
				sortingSteps.push({
					array: [...array],
					sortedIndices: [...sortedIndices],
					minIndex: minIndex,
				});
			}
		}

		if (minIndex !== i) {
			sortingSteps.push({
				array: [...array],
				sortedIndices: [...sortedIndices],
				swap: [i, minIndex],
				minIndex: minIndex,
			});
			[array[i], array[minIndex]] = [array[minIndex], array[i]];
		}

		sortedIndices.push(i);
	}

	sortingSteps.push({
		array: [...array],
		sortedIndices: [...sortedIndices],
	});

	return sortingSteps;
}
