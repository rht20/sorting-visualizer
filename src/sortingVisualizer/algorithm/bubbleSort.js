export function bubbleSort(array) {
	const sortingSteps = [];
	const sortedIndices = [];

	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array.length - i - 1; j++) {
			const indexI = j;
			const indexJ = j + 1;

			sortingSteps.push({
				array: [...array],
				sortedIndices: [...sortedIndices],
				comparison: [indexI, indexJ],
			});

			if (array[indexI] > array[indexJ]) {
				sortingSteps.push({
					array: [...array],
					sortedIndices: [...sortedIndices],
					swap: [indexI, indexJ],
				});
				[array[indexI], array[indexJ]] = [array[indexJ], array[indexI]];
			}
		}
		sortedIndices.push(array.length - i - 1);
		sortingSteps.push({ array: [...array], sortedIndices: [...sortedIndices] });
	}

	return sortingSteps;
}
