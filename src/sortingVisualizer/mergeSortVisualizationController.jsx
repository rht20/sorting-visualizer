import React, { Component } from "react";
import $ from "jquery";
import {
	getDivHeight,
	getHeight,
	getWidth,
	getMarginRight,
	getMarginTop,
} from "./cssPropertyHandler";

class MergeSortVisualizationController extends Component {
	componentDidUpdate(prevProps) {
		const { currentSortingStep } = this.props;

		if (currentSortingStep === prevProps.currentSortingStep) {
			return;
		}

		const { array } = this.props;

		this.adjustCurrentStep(array, currentSortingStep);

		if ("moveToAuxiliaryArray" in currentSortingStep) {
			const { moveToAuxiliaryArray } = currentSortingStep;
			this.addMoveToAuxiliaryArrayAnimation(
				moveToAuxiliaryArray[0],
				moveToAuxiliaryArray[1],
				array
			);
		} else if ("copyBackToOriginalArray" in currentSortingStep) {
			const { auxiliaryArray, copyBackToOriginalArray } = currentSortingStep;
			this.addCopyBackToOriginalArrayAnimation(
				copyBackToOriginalArray[0],
				copyBackToOriginalArray[1],
				auxiliaryArray
			);
		}
	}

	adjustCurrentStep(array, currentSortingStep) {
		for (let i = 0; i < array.length; i++) {
			const id = this.getArrayBarId(i);
			$(id).css({
				height: getHeight(array[i]),
				background: this.getBackgroundColorOfArrayBar(i),
				marginTop: `${getMarginTop(array[i])}px`,
			});
			$(id)
				.children("div")
				.eq(0)
				.text(array[i] ? array[i] : "");
		}

		if ("auxiliaryArray" in currentSortingStep) {
			const { auxiliaryArray } = currentSortingStep;
			for (let i = 0; i < auxiliaryArray.length; i++) {
				const id = this.getAuxiliaryArrayBarId(i);
				$(id).css({
					background: auxiliaryArray[i] ? "gray" : "none",
				});
				$(id)
					.children("div")
					.eq(0)
					.text(auxiliaryArray[i] ? auxiliaryArray[i] : "");
			}
		}
	}

	addTemporaryArrayBar(index, value, isArrayBar) {
		const id = isArrayBar ? this.getArrayBarId(index) : this.getAuxiliaryArrayBarId(index);
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

	invisibleArrayBar(index, isArrayBar) {
		const id = isArrayBar ? this.getArrayBarId(index) : this.getAuxiliaryArrayBarId(index);
		$(id).css({ background: "none" });
		$(id).children("div").eq(0).text("");
	}

	visibleArrayBar(index, value, isArrayBar) {
		const id = isArrayBar ? this.getArrayBarId(index) : this.getAuxiliaryArrayBarId(index);
		$(id).css({
			background: "gray",
			height: `${getHeight(value)}px`,
			marginTop: `${getMarginTop(value)}px`,
		});
		$(id).children("div").eq(0).text(value);
	}

	addMoveToAuxiliaryArrayAnimation(indexI, indexJ, array) {
		this.addTemporaryArrayBar(indexI, array[indexI], true);
		this.invisibleArrayBar(indexI, true);

		const idJ = this.getAuxiliaryArrayBarId(indexJ);
		const posOfJ = $(idJ).position();

		const { playbackSpeed } = this.props;

		$("#temp" + indexI).animate(
			{
				left: posOfJ.left + "px",
				top: posOfJ.top + "px",
			},
			playbackSpeed
		);

		setTimeout(() => {
			this.removeTemporaryArrayBar(indexI);
			this.visibleArrayBar(indexJ, array[indexI], false);
		}, playbackSpeed);
	}

	addCopyBackToOriginalArrayAnimation(indexI, indexJ, array) {
		this.addTemporaryArrayBar(indexI, array[indexI], false);
		this.invisibleArrayBar(indexI, false);

		const idJ = this.getArrayBarId(indexJ);
		const posOfJ = $(idJ).position();

		const { playbackSpeed } = this.props;

		$("#temp" + indexI).animate(
			{
				left: posOfJ.left + "px",
				top: posOfJ.top + "px",
			},
			playbackSpeed
		);

		setTimeout(() => {
			this.removeTemporaryArrayBar(indexI);
			this.visibleArrayBar(indexJ, array[indexI], true);
		}, playbackSpeed);
	}

	getTextFontColor(index, currentSortingStep) {
		if (
			"start" in currentSortingStep &&
			"end" in currentSortingStep &&
			(index < currentSortingStep.start || index > currentSortingStep.end)
		) {
			return "gray";
		}
		return "white";
	}

	getArrayBarId(index) {
		return "#arrayBar" + index;
	}

	getAuxiliaryArrayBarId(index) {
		return "#auxiliaryArrayBar" + index;
	}

	getBackgroundColorOfArrayBar(index) {
		const { array, currentSortingStep } = this.props;

		if ("comparison" in currentSortingStep && currentSortingStep.comparison.includes(index)) {
			return "#6caccf";
		} else if (
			"sortedIndices" in currentSortingStep &&
			currentSortingStep.sortedIndices.includes(index)
		) {
			return "#A1C084";
		} else if (
			"start" in currentSortingStep &&
			"end" in currentSortingStep &&
			(index < currentSortingStep.start || index > currentSortingStep.end)
		) {
			return "#454545";
		}
		return array[index] ? "gray" : "none";
	}

	render() {
		const { array, currentSortingStep } = this.props;
		const auxiliaryArray =
			"auxiliaryArray" in currentSortingStep ? currentSortingStep.auxiliaryArray : [];

		const widthOfArrayBar = getWidth(array);

		return (
			<>
				<div style={{ position: "relative", height: `${getDivHeight()}px` }}>
					{array.map((value, index) => (
						<div
							key={index}
							id={"arrayBar" + index}
							className="array-bar"
							style={{
								height: `${getHeight(value)}px`,
								width: `${widthOfArrayBar}%`,
								background: this.getBackgroundColorOfArrayBar(index),
								marginRight: `${getMarginRight(array, index)}%`,
								marginTop: `${getMarginTop(value)}px`,
								marginBottom: `${10}px`,
							}}>
							<div
								className="bar-text"
								style={{
									color: this.getTextFontColor(index, currentSortingStep),
								}}>
								{value ? value : ""}
							</div>
						</div>
					))}

					{auxiliaryArray.map((value, index) => (
						<div
							key={index}
							id={"auxiliaryArrayBar" + index}
							className="array-bar"
							style={{
								height: `${value ? getHeight(value) : 0}px`,
								width: `${widthOfArrayBar}%`,
								background: "gray",
								marginRight: `${getMarginRight(array, index)}%`,
								marginTop: `${getMarginTop(value)}px`,
							}}>
							<div className="bar-text">{value ? value : ""}</div>
						</div>
					))}
				</div>
			</>
		);
	}
}

export default MergeSortVisualizationController;
