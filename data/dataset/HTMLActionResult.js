/*global define, document*/

define(function () {
        "use strict";

        /**
         * @constructor
         * @param {!Object} action
         * @param {!number} index
         * @param {!HTMLTableElement} outputTable
         * @param {!number} pxPerCm
         */
        function HTMLActionResult(action, index, outputTable, pxPerCm) {
            var descriptionCell = document.createElement('td'),
                statusCell = document.createElement('td'),
                elapsedMsCell = document.createElement('td'),
                speedCell  = document.createElement('td'),
                pagesPerHrCell  = document.createElement('td');

            function formatNumber(number) {
                if (number > 1000000) {
                    return (number / 1000000).toFixed(2) + " mill";
                }
                return number.toFixed(2);
            }

            function pxPerMsToKmPerHr(pxPerMs) {
                // Google knows!
                // https://www.google.com.au/search?q=centimeters%20per%20millisecond%20to%20kilometers%20per%20hour
                var cmPerSecond = (pxPerMs / pxPerCm),
                    kmsPerHr = (cmPerSecond * 36);
                return formatNumber(kmsPerHr);
            }

            function toPagesPerMin(stepsPerMs) {
                // http://anycount.com/WordCountBlog/how-many-words-in-one-page/
                var pagesPerHr = (stepsPerMs / 3838) * 1000 * 60 * 60;
                return formatNumber(pagesPerHr);
            }

            function start() {
                statusCell.textContent = "running";
                elapsedMsCell.textContent = "";
                speedCell.textContent = "";
            }

            function complete(state) {
                statusCell.textContent = state.status ? "done" : "failed";
                elapsedMsCell.textContent = state.elapsedTime;
                if (state.horizontalTravelPx !== undefined) {
                    speedCell.classList.add("active");
                    speedCell.textContent = pxPerMsToKmPerHr(state.horizontalTravelPx / state.elapsedTime);
                }
                if (state.travelledSteps !== undefined) {
                    pagesPerHrCell.classList.add("active");
                    pagesPerHrCell.textContent = toPagesPerMin(state.travelledSteps / state.elapsedTime);
                }
            }

            function init() {
                var tr = document.createElement('tr');

                descriptionCell.className = "action";
                statusCell.className = "status";
                elapsedMsCell.className = "elapsed";
                speedCell.className = "speed";
                pagesPerHrCell.className = "pages";

                [descriptionCell, statusCell, elapsedMsCell, speedCell, pagesPerHrCell].forEach(function(cell) {
                    tr.appendChild(cell);
                });

                outputTable.appendChild(tr);
                descriptionCell.textContent = (index + 1) + ". " + action.state.description;

                action.subscribe("start", start);
                action.subscribe("complete", complete);
            }
            init();
        }

        return HTMLActionResult;
    }
);
