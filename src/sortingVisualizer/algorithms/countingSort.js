export function countingSort(array) {
	const sortingSteps = [];
	const sortedIndices = [];

	const maxValue = Math.max(...array);
	const counts = new Array(maxValue + 1).fill(0);

	sortingSteps.push({ array: [...array], counts: [] });
	sortingSteps.push({ array: [...array], counts: [...counts] });

	for (let i = 0; i < array.length; i++) {
		sortingSteps.push({
			array: [...array],
			counts: [...counts],
			currentIndex: i,
			storeCount: [i, array[i]],
		});
		counts[array[i]]++;
	}

	const sortedArray = new Array(array.length).fill(0);
	for (let i = 0, j = 0; i <= maxValue; i++) {
		while (counts[i]) {
			sortingSteps.push({
				array: [...sortedArray],
				counts: [...counts],
				placeAtSortedArray: [i, j],
				sortedIndices: [...sortedIndices],
			});

			sortedArray[j] = i;
			counts[i]--;
			sortedIndices.push(j++);
		}
	}

	sortingSteps.push({
		array: [...sortedArray],
		sortedIndices: [...sortedIndices],
	});

	return sortingSteps;
}
