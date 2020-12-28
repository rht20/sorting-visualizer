import React from "react";

const ProgressBar = ({ progress }) => {
	return (
		<div class="progress" style={{ height: `${10}px` }}>
			<div
				class="progress-bar"
				role="progressbar"
				style={{ width: `${progress}%`, background: "gray" }}
				aria-valuenow="25"
				aria-valuemin="0"
				aria-valuemax="100"></div>
		</div>
	);
};

export default ProgressBar;
