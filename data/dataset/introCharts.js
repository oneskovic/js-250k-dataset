var labelType, useGradients, nativeTextSupport, animate;

(function() {
	var ua = navigator.userAgent, iStuff = ua.match(/iPhone/i)
			|| ua.match(/iPad/i), typeOfCanvas = typeof HTMLCanvasElement, nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'), textSupport = nativeCanvasSupport
			&& (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
	// I'm setting this based on the fact that ExCanvas provides text support
	// for IE
	// and that as of today iPhone/iPad current text support is lame
	labelType = (!nativeCanvasSupport || (textSupport && !iStuff)) ? 'Native'
			: 'HTML';
	nativeTextSupport = labelType == 'Native';
	useGradients = nativeCanvasSupport;
	animate = !(iStuff || !nativeCanvasSupport);
})();

function pieChart(json,offset) {

	// init PieChart
	var pieChart = new $jit.PieChart({
		injectInto : 'graph-opensource',
		// whether to add animations
		animate : true,
		// offsets
		offset : 10,
		sliceOffset : 0,
		labelOffset : 20,
		// slice style
		// type: useGradients? 'stacked:gradient' : 'stacked',
		// whether to show the labels for the slices
		showLabels : false,
		// resize labels according to
		// pie slices values set 7px as
		// min label size
		resizeLabels : 7,

		// enable tips
		Tips : {
			enable : true,
			onShow : function(tip, elem) {
				var uprogress_oss=progress_oss;
				if(progress_oss==0.001){
					uprogress_oss=0;
				}
				if(progress_oss==99.999){
					uprogress_oss=100;
				}
				tip.innerHTML = "<b>Open source</b>: " +uprogress_oss+"%";
			}
		}
	});
	// load JSON data.
	pieChart.loadJSON(json);
	// end
	return pieChart;
}

function barChart() {
	// init data
	var json = {
		'color' : [ '#9C470E', '#e6e6e6' ],
		'label' : [ 'Progress','Left'],
		'values' : [ {
			'label' : 'Progress',
			'values' : [ 1, 99 ]
		} ]

	};
	// init BarChart
	var barChart = new $jit.BarChart({
		// id of the visualization container
		injectInto : 'graph-total-figure',
		// whether to add animations
		animate : true,
		// horizontal or vertical barcharts
		orientation : 'vertical',
		// bars separation
		barsOffset : 0,
		// visualization offset
		Margin : {
			top : 5,
			left : 5,
			right : 5,
			bottom : 5
		},
		// labels offset position
		labelOffset : 5,
		// bars style
		// type: useGradients? 'stacked:gradient' : 'stacked',
		// whether to show the aggregation of the values
		showAggregates : false,
		// whether to show the labels for the bars
		showLabels : false,
		// labels style
		// add tooltips
		Tips : {
			enable : true,
			onShow : function(tip, elem) {
				tip.innerHTML = "<b>" + elem.name + "</b>: " + elem.value+"%";
			}
		}
	});
	// load JSON data.
	barChart.loadJSON(json);

	return barChart;
}
