import React, { Component } from "react";
import $ from "jquery";
import {
	getDivHeight,
	getHeight,
	getWidth,
	getMarginRight,
	getMarginTop,
} from "../helper/cssPropertyHelper";

class CountingSortVisualizationController extends Component {
	componentDidUpdate(prevProps) {
		const { currentSortingStep } = this.props;

		if (currentSortingStep === prevProps.currentSortingStep) {
			return;
		}

		const { array } = this.props;

		this.adjustCurrentStep(array, currentSortingStep);

		if ("storeCount" in currentSortingStep) {
			const { storeCount } = currentSortingStep;
			this.addStoreCountAnimation(storeCount[0], storeCount[1], array);
		} else if ("placeAtSortedArray" in currentSortingStep) {
			const { placeAtSortedArray } = currentSortingStep;
			this.addPlaceAtSortedArrayAnimation(
				placeAtSortedArray[0],
				placeAtSortedArray[1],
				array
			);
		}
	}

	adjustCurrentStep(array, currentSortingStep) {
		for (let i = 0; i < array.length; i++) {
			const id = this.getArrayBarId(i);
			$(id).css({
				height: getHeight(array[i], true),
				background: this.getBackgroundColorOfArrayBar(array, i, currentSortingStep),
				marginTop: `${getMarginTop(array[i], true)}px`,
			});
			$(id)
				.children("div")
				.eq(0)
				.text(array[i] ? array[i] : "");
		}

		if ("counts" in currentSortingStep) {
			const { counts } = currentSortingStep;
			for (let i = 0; i < counts.length; i++) {
				$(this.getCountsArrayBarId(i)).css({
					background: counts[i] ? "#6caccf" : "gray",
				});
				$(this.getCountsArrayCountBarId(i)).children("div").eq(0).text(counts[i]);
			}
		}
	}

	addTemporaryArrayBar(index, value, isArrayBar) {
		const id = isArrayBar ? this.getArrayBarId(index) : this.getCountsArrayBarId(index);
		const position = $(id).position();

		const div = $(id).clone();
		div.attr("id", "temp" + index);
		div.css({
			left: position.left,
			top: position.top,
			background: "#6caccf",
			position: "absolute",
		});
		div.children("div").eq(0).text(value);
		$(".card-body").children("div").eq(0).append(div);
	}

	removeTemporaryArrayBar(index) {
		$("#temp" + index).remove();
	}

	invisibleArrayBar(index) {
		const id = this.getArrayBarId(index);
		$(id).css({ background: "none" });
		$(id).children("div").eq(0).text("");
	}

	visibleArrayBar(index, value) {
		const id = this.getArrayBarId(index);
		$(id).css({
			background: "gray",
			height: `${getHeight(value, true)}px`,
			marginTop: `${getMarginTop(value, true)}px`,
		});
		$(id).children("div").eq(0).text(value);
	}

	addStoreCountAnimation(indexI, indexJ, array) {
		this.addTemporaryArrayBar(indexI, array[indexI], true);
		this.invisibleArrayBar(indexI);

		const idJ = this.getCountsArrayBarId(indexJ);
		const posOfJ = $(idJ).position();

		const { counts } = this.props.currentSortingStep;
		const { playbackSpeed } = this.props;

		$("#temp" + indexI).animate(
			{
				left: posOfJ.left + "px",
				top: posOfJ.top + "px",
				width: getWidth(counts),
			},
			playbackSpeed
		);

		setTimeout(() => {
			this.removeTemporaryArrayBar(indexI);

			$(idJ).css({ background: "#6caccf" });
			$(this.getCountsArrayCountBarId(indexJ))
				.children("div")
				.eq(0)
				.text(counts[indexJ] + 1);
		}, playbackSpeed);
	}

	addPlaceAtSortedArrayAnimation(indexI, indexJ, array) {
		this.addTemporaryArrayBar(indexI, indexI, false);

		const { counts } = this.props.currentSortingStep;

		$(this.getCountsArrayBarId(indexI)).css({
			background: counts[indexI] - 1 ? "#6caccf" : "gray",
		});

		const idJ = this.getArrayBarId(indexJ);
		const posOfJ = $(idJ).position();

		const { playbackSpeed } = this.props;

		$("#temp" + indexI).animate(
			{
				left: posOfJ.left + "px",
				top: posOfJ.top + "px",
				width: getWidth(array),
			},
			playbackSpeed
		);

		setTimeout(() => {
			this.removeTemporaryArrayBar(indexI);

			this.visibleArrayBar(indexJ, indexI);
			$(this.getCountsArrayCountBarId(indexI))
				.children("div")
				.eq(0)
				.text(counts[indexI] - 1);
		}, playbackSpeed);
	}

	getArrayBarId(index) {
		return "#arrayBar" + index;
	}

	getCountsArrayBarId(index) {
		return "#countsArrayBar" + index;
	}

	getCountsArrayCountBarId(index) {
		return "#countsArrayCountBar" + index;
	}

	getBackgroundColorOfArrayBar(array, index, currentSortingStep) {
		if (array[index] === 0) {
			return "none";
		} else if (
			("storeCount" in currentSortingStep && currentSortingStep.storeCount[0] === index) ||
			("placeAtSortedArray" in currentSortingStep &&
				currentSortingStep.placeAtSortedArray[1] === index)
		) {
			return "#6caccf";
		} else if ("sortedIndices" in currentSortingStep) {
			return currentSortingStep.sortedIndices.includes(index) ? "#A1C084" : "none";
		}
		return "gray";
	}

	render() {
		const { array, currentSortingStep } = this.props;
		const counts = "counts" in currentSortingStep ? currentSortingStep.counts : [];

		const widthOfArrayBar = getWidth(array);
		const widthOfCountsArrayBar = getWidth(counts);

		return (
			<div style={{ position: "relative", height: `${getDivHeight()}px` }}>
				{array.map((value, index) => (
					<div
						key={index}
						id={"arrayBar" + index}
						className="array-bar"
						style={{
							height: `${getHeight(value, true)}px`,
							width: `${widthOfArrayBar}%`,
							background: this.getBackgroundColorOfArrayBar(
								array,
								index,
								currentSortingStep
							),
							marginRight: `${getMarginRight(array, index)}%`,
							marginTop: `${getMarginTop(value, true)}px`,
							marginBottom: `${20}px`,
						}}>
						<div className="bar-text">{value ? value : ""}</div>
					</div>
				))}

				{counts.map((value, index) => (
					<div
						key={index}
						id={"countsArrayBar" + index}
						className="array-bar"
						style={{
							height: `${getHeight(index, true)}px`,
							width: `${widthOfCountsArrayBar}%`,
							background: value ? "#6caccf" : "gray",
							marginRight: `${getMarginRight(counts, index)}%`,
							marginTop: `${getMarginTop(index, true)}px`,
						}}>
						<div className="bar-text">{index}</div>
					</div>
				))}

				{counts.map((value, index) => (
					<div
						key={index}
						id={"countsArrayCountBar" + index}
						className="array-bar"
						style={{
							height: `${20}px`,
							width: `${widthOfCountsArrayBar}%`,
							background: "none",
							marginRight: `${getMarginRight(counts, index)}%`,
						}}>
						<div className="bar-text">{value}</div>
					</div>
				))}
			</div>
		);
	}
}

export default CountingSortVisualizationController;
