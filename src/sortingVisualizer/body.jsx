import React, { Component } from "react";
import $ from "jquery";

class Body extends Component {
	componentDidMount() {
		console.log("Body - componentDidMount");

		this.addAnimation("first", "last", 200, 250);

		// setTimeout(() => {
		// 	// console.log("xxx", $("#first").position().left);
		// 	let leftI = $(".array-bar").eq(0).position().left;
		// 	let leftJ = $(".array-bar").eq(2).position().left;
		// 	let dist = leftJ - leftI;

		// 	console.log(leftI, leftJ, dist);

		// 	$("#first").animate({ left: dist }, 500, () => {
		// 		$("#first").animate({ height: 250, left: 0 }, 0);
		// 	});
		// 	$("#last").animate({ left: -dist }, 500, () => {
		// 		$("#last").animate({ height: 200, left: 0 }, 0);
		// 	});
		// }, 10);

		// setTimeout(() => {
		// 	let leftI = $(".array-bar").eq(0).position().left;
		// 	let leftJ = $(".array-bar").eq(1).position().left;
		// 	let dist = leftJ - leftI;

		// 	console.log(leftI, leftJ, dist);

		// 	$("#first").animate({ left: dist }, 500, () => {
		// 		$("#first").animate({ height: 100, left: 0 }, 0);
		// 	});
		// 	$("#second").animate({ left: -dist }, 500, () => {
		// 		$("#second").animate({ height: 250, left: 0 }, 0);
		// 	});
		// }, 1000);

		// setTimeout(() => {
		// 	const leftI = $(".array-bar").eq(0).position().left;
		// 	const leftJ = $(".array-bar").eq(2).position().left;
		// 	const dist = leftJ - leftI;

		// 	console.log(leftI, leftJ, dist);

		// 	$("#first").animate({ left: dist });
		// 	$("#last").animate({ left: -dist });

		// 	// $("#first")[0].style.setProperty("--from-pos", `${0}px`);
		// 	// $("#first")[0].style.setProperty("--to-pos", `${dist}px`);
		// 	// $("#first")[0].style.setProperty("--animation-duration", `${1000}ms`);
		// 	// $("#last")[0].style.setProperty("--from-pos", `${0}px`);
		// 	// $("#last")[0].style.setProperty("--to-pos", `${-dist}px`);
		// 	// $("#last")[0].style.setProperty("--animation-duration", `${1000}ms`);
		// }, 5000);

		// let leftPosOfFirstDiv = $("#first").position().left;
		// let leftPosOfSecondDiv = $("#second").position().left;
		// let diff = leftPosOfSecondDiv - leftPosOfFirstDiv;

		// console.log(leftPosOfFirstDiv, leftPosOfSecondDiv, diff);

		// $("#first")[0].style.setProperty("--from-pos", `${0}px`);
		// $("#first")[0].style.setProperty("--to-pos", `${diff}px`);
		// $("#second")[0].style.setProperty("--from-pos", `${0}px`);
		// $("#second")[0].style.setProperty("--to-pos", `${-diff}px`);

		// setTimeout(() => {
		// 	let leftPosOfFirstDiv = $("#first").position().left;
		// 	let leftPosOfSecondDiv = $("#second").position().left;
		// 	let diff = leftPosOfSecondDiv - leftPosOfFirstDiv;

		// 	console.log(leftPosOfFirstDiv, leftPosOfSecondDiv, diff);
		// }, 500);

		// setTimeout(() => {
		// 	$("#first").id = "temp";
		// 	$("second").id = "first";
		// 	$("#first").id = "second";

		// 	// $("#first")[0].style.left = `${leftPosOfSecondDiv - leftPosOfFirstDiv}px`;
		// 	// $("#second")[0].style.left = `${0}px`;
		// 	leftPosOfFirstDiv = $("#first").offset().left;
		// 	leftPosOfSecondDiv = $("#second").offset().left;
		// 	diff = leftPosOfSecondDiv - leftPosOfFirstDiv;
		// 	console.log(leftPosOfFirstDiv, leftPosOfSecondDiv, diff);
		// 	// $("#first")[0].style.setProperty("--from-pos", `${0}px`);
		// 	// $("#first")[0].style.setProperty("--to-pos", `${diff}px`);
		// 	// $("#second")[0].style.setProperty("--from-pos", `${0}px`);
		// 	// $("#second")[0].style.setProperty("--to-pos", `${-diff}px`);
		// }, 1005);
	}

	addArrayBar(id, value) {
		const position = $("#" + id).position();

		console.log("addArrayBar", $("#" + id).offsetLeft, $("#" + id).offsetTop);
		const style =
			"height: " +
			value +
			"px; " +
			"width: 100%; " +
			"left: " +
			$("#" + id).offsetLeft +
			"; " +
			"top: " +
			$("#" + id).offsetTop +
			"; " +
			"background: green";

		// {
		// 	height: `${getHeight(array[index])}px`,
		// 	width: `${getWidth(array)}%`,
		// 	left: position.left,
		// 	top: position.top,
		// 	background: this.getBackgroundColor(index),
		// };

		const outerDiv = $("<div/>", {
			id: "temp" + id,
			class: "array-bar",
			style: style,
		});

		const innerDiv = $("<div/>", {
			class: "bar-text",
			text: `${value}`,
		});

		outerDiv.append(innerDiv);
		$("#" + id).append(outerDiv);
		// $("body").append(outerDiv);
	}

	addAnimation(id1, id2, value1, value2) {
		this.addArrayBar(id1, value1);
		this.addArrayBar(id2, value2);

		const leftI = $("#" + id1).position().left;
		const leftJ = $("#" + id2).position().left;
		const dist = leftJ - leftI;

		$("#temp" + id1).animate({ left: dist }, 500);
		$("#temp" + id2).animate({ left: -dist }, 500);
	}

	render() {
		return (
			<div className="container-fluid mt-2 dark">
				<div className="card text-white bg-dark mb-3">
					<div className="card-body">
						<div
							id="first"
							className="array-bar"
							style={{
								height: `${200}px`,
								width: `${10}%`,
								marginRight: `${5}px`,
							}}>
							<div className="bar-text">200</div>
						</div>
						<div
							id="second"
							className="array-bar"
							style={{
								height: `${100}px`,
								width: `${10}%`,
								marginRight: `${5}px`,
							}}>
							<div className="bar-text">100</div>
						</div>
						<div
							id="last"
							className="array-bar"
							style={{
								height: `${250}px`,
								width: `${10}%`,
								background: "#A1C084",
							}}>
							<div className="bar-text">250</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Body;
