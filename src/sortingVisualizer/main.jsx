import React, { Component } from "react";
import VisualizationController from "./visualizationController/visualizationController";
import {
	getSortingAlgorithmsKeyAndName,
	getSortingAlgorithmsKeyFunctionMapping,
	getSortingAlgorithmsKeyVisualizationControllerMapping,
	getArraySizeKeyAndValue,
	getArraySizeKeyValueMapping,
	getPlaybackSpeedKeyAndValue,
	getPlaybackSpeedKeyValueMapping,
} from "./listAndMapping/listAndMapping";
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
		const arraySizeKeyValueMapping = getArraySizeKeyValueMapping();
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
		const sortingAlgorithmsKeyFunctionMapping = getSortingAlgorithmsKeyFunctionMapping();
		const sortingFunction =
			sortingAlgorithmsKeyFunctionMapping[this.state.currentSortingAlgorithmKey];

		const sortingSteps = sortingFunction([...this.state.array]);

		this.setState({ sortingSteps });
	}

	getCurrentPlaybackSpeed() {
		const playbackSpeedKeyValueMapping = getPlaybackSpeedKeyValueMapping();
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

		const sortingAlgorithmsKeyVisualizationControllerMapping = getSortingAlgorithmsKeyVisualizationControllerMapping();
		const SortingVisualizationController =
			sortingAlgorithmsKeyVisualizationControllerMapping[currentSortingAlgorithmKey];

		return (
			<>
				<Navbar
					sortingAlgorithmsKeyAndName={getSortingAlgorithmsKeyAndName()}
					arraySizeKeyAndValue={getArraySizeKeyAndValue()}
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
					playbackSpeedKeyAndValue={getPlaybackSpeedKeyAndValue()}
					currentPlaybackSpeedKey={currentPlaybackSpeedKey}
					changePlaybackSpeed={this.changePlaybackSpeed}
				/>
				<Footer />
			</>
		);
	}
}

export default Main;
