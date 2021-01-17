import { bubbleSort } from "../algorithm/bubbleSort";
import { selectionSort } from "../algorithm/selectionSort";
import { insertionSort } from "../algorithm/insertionSort";
import { countingSort } from "../algorithm/countingSort";
import { mergeSortCaller } from "../algorithm/mergeSort";
import BubbleSortVisualizationController from "../visualizationController/bubbleSortVisualizationController";
import SelectionSortVisualizationController from "../visualizationController/selectionSortVisualizationController";
import InsertionSortVisualizationController from "../visualizationController/insertionSortVisualizationController";
import CountingSortVisualizationController from "../visualizationController/countingSortVisualizationController";
import MergeSortVisualizationController from "../visualizationController/mergeSortVisualizationController";

export function getSortingAlgorithmsKeyAndName() {
	const sortingAlgorithmsKeyAndName = [
		["bubbleSort", "Bubble Sort"],
		["selectionSort", "Selection Sort"],
		["insertionSort", "Insertion Sort"],
		["countingSort", "Counting Sort"],
		["mergeSort", "Merge Sort"],
	];
	return sortingAlgorithmsKeyAndName;
}

export function getSortingAlgorithmsKeyFunctionMapping() {
	const sortingAlgorithmsKeyFunctionMapping = {
		bubbleSort: bubbleSort,
		selectionSort: selectionSort,
		insertionSort: insertionSort,
		countingSort: countingSort,
		mergeSort: mergeSortCaller,
	};
	return sortingAlgorithmsKeyFunctionMapping;
}

export function getSortingAlgorithmsKeyVisualizationControllerMapping() {
	const sortingAlgorithmsKeyVisualizationControllerMapping = {
		bubbleSort: BubbleSortVisualizationController,
		selectionSort: SelectionSortVisualizationController,
		insertionSort: InsertionSortVisualizationController,
		countingSort: CountingSortVisualizationController,
		mergeSort: MergeSortVisualizationController,
	};
	return sortingAlgorithmsKeyVisualizationControllerMapping;
}

export function getArraySizeKeyAndValue() {
	const arraySizeKeyAndValue = [
		["size5", 5],
		["size10", 10],
		["size25", 25],
		["size50", 50],
	];
	return arraySizeKeyAndValue;
}

export function getArraySizeKeyValueMapping() {
	const arraySizeKeyValueMapping = {
		size5: 5,
		size10: 10,
		size25: 25,
		size50: 50,
	};
	return arraySizeKeyValueMapping;
}

export function getPlaybackSpeedKeyAndValue() {
	const playbackSpeedKeyAndValue = [
		["playbackSpeed025", 0.25],
		["playbackSpeed05", 0.5],
		["playbackSpeed1", 1],
		["playbackSpeed15", 1.5],
		["playbackSpeed2", 2],
	];
	return playbackSpeedKeyAndValue;
}

export function getPlaybackSpeedKeyValueMapping() {
	const playbackSpeedKeyValueMapping = {
		playbackSpeed025: 0.25,
		playbackSpeed05: 0.5,
		playbackSpeed1: 1,
		playbackSpeed15: 1.5,
		playbackSpeed2: 2,
	};
	return playbackSpeedKeyValueMapping;
}
