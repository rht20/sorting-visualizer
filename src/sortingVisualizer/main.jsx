import React, { Component } from "react";
import { bubbleSort } from "./algorithm/bubbleSort";
import { selectionSort } from "./algorithm/selectionSort";
import { insertionSort } from "./algorithm/insertionSort";
import { countingSort } from "./algorithm/countingSort";
import { mergeSortCaller } from "./algorithm/mergeSort";
import BubbleSortVisualizationController from "./visualizationController/bubbleSortVisualizationController";
import SelectionSortVisualizationController from "./visualizationController/selectionSortVisualizationController";
import InsertionSortVisualizationController from "./visualizationController/insertionSortVisualizationController";
import CountingSortVisualizationController from "./visualizationController/countingSortVisualizationController";
import MergeSortVisualizationController from "./visualizationController/mergeSortVisualizationController";
import VisualizationController from "./visualizationController/visualizationController";
import Navbar from "./layout/navbar";
import Footer from "./layout/footer";
import "./css/style.css";

class Main extends Component {
	constructor() {
		super();

		this.state = {
			array: [],
			sortingSteps: [],
			currentSortingAlgorithmKey: "bubbleSort",
			currentArraySizeKey: "size10",
			currentPlaybackSpeedKey: "playbackSpeed1",
		};
	}

	componentDidMount() {
		this.resetArray();
	}

	changeSortingAlgorithm = (sortingAlgorithmKey) => {
		this.setState({ currentSortingAlgorithmKey: sortingAlgorithmKey }, this.resetArray);
	};

	changeArraySize = (arraySizeKey) => {
		this.setState({ currentArraySizeKey: arraySizeKey }, this.resetArray);
	};

	changePlaybackSpeed = (playbackSpeedKey) => {
		this.setState({ currentPlaybackSpeedKey: playbackSpeedKey });
	};

	resetArray = () => {
		const arraySizeKeyValueMapping = this.getArraySizeKeyValueMapping();
		const n = arraySizeKeyValueMapping[this.state.currentArraySizeKey];

		const array = [];
		const maxValue = this.state.currentSortingAlgorithmKey === "countingSort" ? 20 : 99;

		for (let i = 0; i < n; i++) {
			array.push(Math.floor(Math.random() * maxValue + 1));
		}
		array[0] = maxValue;
		array[1] = 1;

		this.setState({ array }, this.sort);
	};

	sort() {
		const sortingAlgorithmsKeyFunctionMapping = this.getSortingAlgorithmsKeyFunctionMapping();
		const sortingFunction =
			sortingAlgorithmsKeyFunctionMapping[this.state.currentSortingAlgorithmKey];

		const sortingSteps = sortingFunction([...this.state.array]);

		this.setState({ sortingSteps });
	}

	getSortingAlgorithmsKeyAndName() {
		const sortingAlgorithmsKeyAndName = [
			["bubbleSort", "Bubble Sort"],
			["selectionSort", "Selection Sort"],
			["insertionSort", "Insertion Sort"],
			["countingSort", "Counting Sort"],
			["mergeSort", "Merge Sort"],
		];
		return sortingAlgorithmsKeyAndName;
	}

	getSortingAlgorithmsKeyFunctionMapping() {
		const sortingAlgorithmsKeyFunctionMapping = {
			bubbleSort: bubbleSort,
			selectionSort: selectionSort,
			insertionSort: insertionSort,
			countingSort: countingSort,
			mergeSort: mergeSortCaller,
		};
		return sortingAlgorithmsKeyFunctionMapping;
	}

	getSortingAlgorithmsKeyVisualizationControllerMapping() {
		const sortingAlgorithmsKeyVisualizationControllerMapping = {
			bubbleSort: BubbleSortVisualizationController,
			selectionSort: SelectionSortVisualizationController,
			insertionSort: InsertionSortVisualizationController,
			countingSort: CountingSortVisualizationController,
			mergeSort: MergeSortVisualizationController,
		};
		return sortingAlgorithmsKeyVisualizationControllerMapping;
	}

	getArraySizeKeyAndValue() {
		const arraySizeKeyAndValue = [
			["size5", 5],
			["size10", 10],
			["size25", 25],
			["size50", 50],
		];
		return arraySizeKeyAndValue;
	}

	getArraySizeKeyValueMapping() {
		const arraySizeKeyValueMapping = {
			size5: 5,
			size10: 10,
			size25: 25,
			size50: 50,
		};
		return arraySizeKeyValueMapping;
	}

	getPlaybackSpeedKeyAndValue() {
		const playbackSpeedKeyAndValue = [
			["playbackSpeed025", 0.25],
			["playbackSpeed05", 0.5],
			["playbackSpeed1", 1],
			["playbackSpeed15", 1.5],
			["playbackSpeed2", 2],
		];
		return playbackSpeedKeyAndValue;
	}

	getPlaybackSpeedKeyValueMapping() {
		const playbackSpeedKeyValueMapping = {
			playbackSpeed025: 0.25,
			playbackSpeed05: 0.5,
			playbackSpeed1: 1,
			playbackSpeed15: 1.5,
			playbackSpeed2: 2,
		};
		return playbackSpeedKeyValueMapping;
	}

	getCurrentPlaybackSpeed() {
		const playbackSpeedKeyValueMapping = this.getPlaybackSpeedKeyValueMapping();
		const playbackSpeed =
			400 * playbackSpeedKeyValueMapping[this.state.currentPlaybackSpeedKey];
		return playbackSpeed;
	}

	render() {
		const {
			array,
			sortingSteps,
			currentSortingAlgorithmKey,
			currentArraySizeKey,
			currentPlaybackSpeedKey,
		} = this.state;

		const sortingAlgorithmsKeyVisualizationControllerMapping = this.getSortingAlgorithmsKeyVisualizationControllerMapping();
		const SortingVisualizationController =
			sortingAlgorithmsKeyVisualizationControllerMapping[currentSortingAlgorithmKey];

		return (
			<>
				<Navbar
					sortingAlgorithmsKeyAndName={this.getSortingAlgorithmsKeyAndName()}
					arraySizeKeyAndValue={this.getArraySizeKeyAndValue()}
					changeSortingAlgorithm={this.changeSortingAlgorithm}
					changeArraySize={this.changeArraySize}
					currentSortingAlgorithmKey={currentSortingAlgorithmKey}
					currentArraySizeKey={currentArraySizeKey}
					generateRandomArray={this.resetArray}
					changePlaybackSpeed={this.changePlaybackSpeed}
				/>
				<VisualizationController
					array={array}
					sortingSteps={sortingSteps}
					playbackSpeed={this.getCurrentPlaybackSpeed()}
					sortingVisualizationController={<SortingVisualizationController />}
					playbackSpeedKeyAndValue={this.getPlaybackSpeedKeyAndValue()}
					currentPlaybackSpeedKey={currentPlaybackSpeedKey}
					changePlaybackSpeed={this.changePlaybackSpeed}
				/>
				<Footer />
			</>
		);
	}
}

export default Main;
