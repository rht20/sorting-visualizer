export function insertionSort(array) {
	const sortingSteps = [];
	const sortedIndices = [];

	for (let i = 1; i < array.length; i++) {
		sortingSteps.push({
			array: [...array],
			keyIndex: i,
		});

		for (let j = i - 1; j >= 0; j--) {
			sortingSteps.push({
				array: [...array],
				comparison: [j, j + 1],
				keyIndex: j + 1,
			});

			if (array[j] > array[j + 1]) {
				sortingSteps.push({
					array: [...array],
					swap: [j, j + 1],
					keyIndex: j + 1,
				});
				[array[j], array[j + 1]] = [array[j + 1], array[j]];
			} else {
				break;
			}
		}
	}

	for (let i = 0; i < array.length; i++) {
		sortedIndices.push(i);
	}

	sortingSteps.push({
		array: [...array],
		sortedIndices: [...sortedIndices],
	});

	return sortingSteps;
}
