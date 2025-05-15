
// import Chart from "./Chart.min.js";

//color
var colorlist = ['#f23500', '#bd2459', '#ff9500', '#ffc40e', '#ffdd85'];
var colorlist2 = ['#e14868', '#f6d300', '#25c38f'];
var gridcolor = '#d7d7d7';
var gridfontcolor = '#999999';
var lineColor = '#999999';
var daycolor = '#e5e5e5';
var pointcolor = '#ffd300';
var activecolor = '#ffd300';
var linebgcolor = 'rgba(37, 195, 143, 0.1)';
var lowBloodcolor = '#ff9500';
var hiddenH = (document.documentElement.clientWidth > 350 ) ? 0 : -20;
var isFirstRound = false;
var highBloodcolor = '#bd2459';
var _ctx;

function drawNumber() {
	var ani =  $('.number-animation');
	if (!$('.number-animation') ) return;
	setTimeout(function() {
		$('.num-ani.count1').numberAnimate();
		$('.num-ani.count2').numberAnimate();
		$('.num-ani.count3').numberAnimate();
	}, 100);
}

function playNumber(num){
	var _num = num.toString();
	var c1 = _num.substring(0,1);
	var c2 = _num.substring(1,2);
	var c3 = _num.substring(2,3);

	$('.num-ani.count1').numberAnimate('set', c1);
	setTimeout(function() {
		$('.num-ani.count2').numberAnimate('set', c2);
	}, 200);
	setTimeout(function() {
		$('.num-ani.count3').numberAnimate('set', c3);
	}, 400);
}

// Pie chart
function drawPie(ctx, ctxLine,  graphNum){
	var graphColor = [];
	graphColor[0] = "#ffe600";
	graphColor[1] = "#ffc700";

	if (graphNum == 0) {
		graphColor[0] = "#eee";
		graphColor[1] = "#eee";
	}

	var graLine = ctxLine.createRadialGradient(0, 0, 440, 220, 440, 220);
	var a = 0;
	var count = 0;
	ctx.beginPath();
	ctx.strokeStyle = "#eee"
	ctx.lineWidth = "40";
	ctx.lineCap = "round";
	ctx.arc(220, 220, 200, 0, Math.PI * 0.68, true);
	ctx.stroke();
	drawLoading1();

	function drawLoading1() {
		a += 0.001;
		graLine.addColorStop(0.5, graphColor[0]);
		graLine.addColorStop(1, graphColor[1]);
		ctxLine.lineWidth = "40";
		ctxLine.clearRect(0, 0, ctxLine.width, ctxLine.height);
		ctxLine.beginPath();
		ctxLine.lineCap = 'round';
		ctxLine.strokeStyle = graLine;
		ctxLine.arc(220, 220, 200, 0, Math.PI * graphNum / 8 * count);
		ctxLine.stroke();
		count += a;
		if (count <= 1.35) setTimeout(drawLoading1, 30);

		console.log('dr', Math.PI * graphNum / 8 * count)
	}
}

// Doughnut chart
function drawDoughnut(ctx, datalist, isStatus){
	var color = colorlist;
	if (isStatus == true) color = colorlist2;
	const myChart = new Chart(ctx, {
		type: 'doughnut',
		data: {
			datasets: [{
				data: datalist,
				backgroundColor:color,
				borderColor: '#ffffff',
				borderWidth: 1,
				weight:2,
			}]
		},
		options: {
			maintainAspectRatio: false,
			scales: {
				y: {beginAtZero: true}
			},
			tooltips : {enabled:false},
			legend : {enabled :false},
			cutoutPercentage : 65,
		}
	});
}

function drawMultiDough(doughnut01, doughnut02, doughnut03){
	var color1 = ['#FFE35C', '#FFD700'];
	// var color1 = ['#ffffff', '#000000'];
	var color2 = ['#FFBBAC', '#FF6947'];
	var color3 = ['#7BB0FF', '#8186FF'];
	var bgColor = ['#efefef', '#efefef'];
	var shdowColor = '#aaa';
	var shadowBlur = 10;
	var shadowOffsetX = 2.5;
	var shadowOffsetY = 2.5;

	doughnut01.easyPieChart({
		barColor: function(percent) {
			var ctx = this.renderer.getCtx();
			var canvas = this.renderer.getCanvas();
			var gradient = ctx.createLinearGradient(0,0,-155, 0);
			if (percent == 0) {
				gradient.addColorStop(0, 'transparent');
				gradient.addColorStop(1, 'transparent');
			} else{
				gradient.addColorStop(0, color1[0]);
				gradient.addColorStop(1, color1[1]);
			}
			ctx.shadowColor = shdowColor;
			ctx.shadowBlur = shadowBlur;
			ctx.shadowOffsetX = shadowOffsetX;
			ctx.shadowOffsetY = shadowOffsetY;
			// ctx.filters = 'blur(10px)';
			return gradient;
		},
		trackColor: 'transparent',
		scaleColor: 'transparent',
		lineCap: 'round',
		lineWidth: 17,
		size: 155,
		animate: 1000,
	});

	doughnut02.easyPieChart({
		barColor: function(percent) {
			var ctx = this.renderer.getCtx();
			var canvas = this.renderer.getCanvas();
			var gradient = ctx.createLinearGradient(0,0,-115,0);
			if (percent == 0) {
				gradient.addColorStop(0, 'transparent');
				gradient.addColorStop(1, 'transparent');
			} else{
				gradient.addColorStop(0, color2[0]);
				gradient.addColorStop(1, color2[1]);
			}
			ctx.shadowColor = shdowColor;
			ctx.shadowBlur = shadowBlur;
			ctx.shadowOffsetX = shadowOffsetX;
			ctx.shadowOffsetY = shadowOffsetY;
			// ctx.filters = 'blur(10px)';
			return gradient;
		},
		trackColor: 'transparent',
		scaleColor: 'transparent',
		lineCap: 'round',
		lineWidth: 17,
		size: 115,
		animate: 1000,
	}); 

	doughnut03.easyPieChart({
		barColor: function(percent) {
			var ctx = this.renderer.getCtx();
			var canvas = this.renderer.getCanvas();
			var gradient = ctx.createLinearGradient(0,0,-75,0);
			if (percent == 0) {
				gradient.addColorStop(0, 'transparent');
				gradient.addColorStop(1, 'transparent');
			} else{
				gradient.addColorStop(0, color3[0]);
				gradient.addColorStop(1, color3[1]);
			}
			ctx.shadowColor = shdowColor;
			ctx.shadowBlur = shadowBlur;
			ctx.shadowOffsetX = shadowOffsetX;
			ctx.shadowOffsetY = shadowOffsetY;
			// ctx.filters = 'blur(10px)';
			return gradient;
		},
		trackColor: 'transparent',
		scaleColor: 'transparent',
		lineCap: 'round',
		lineWidth: 17,
		size: 75,
		animate: 1000,
	});
}

function drawCircle(doughnut01){
	var color1 = ['#ffd700', '#ffd700'];
	// var color1 = ['#ffffff', '#000000'];
	var shdowColor = '#aaa';
	var shadowBlur = 10;
	var shadowOffsetX = 2.5;
	var shadowOffsetY = 2.5;
	var _w = 86;
	var _lw = 6;
	// console.log($( window ).width());
	if($( window ).width() < 320) {
		_w = 60;
		_lw = 5;
	}

	doughnut01.easyPieChart({
		barColor: function(percent) {
			var ctx = this.renderer.getCtx();
			var canvas = this.renderer.getCanvas();
			var gradient = ctx.createLinearGradient(0,0,-155, 0);
			if (percent == 0) {
				gradient.addColorStop(0, 'transparent');
				gradient.addColorStop(1, 'transparent');
			} else{
				gradient.addColorStop(0, color1[0]);
				gradient.addColorStop(1, color1[1]);
			}
			ctx.shadowColor = shdowColor;
			ctx.shadowBlur = shadowBlur;
			ctx.shadowOffsetX = shadowOffsetX;
			ctx.shadowOffsetY = shadowOffsetY;
			// ctx.filters = 'blur(10px)';
			return gradient;
		},
		trackColor: '#eee',
		scaleColor: 'transparent',
		lineCap: 'round',
		lineWidth: _lw,
		size: _w,
		animate: 1000,
	});
}

function drawBigCircle(doughnut01){
	var color1 = ['#ffd700', '#ffd700'];
	// var color1 = ['#ffffff', '#000000'];
	var shdowColor = '#aaa';
	var shadowBlur = 10;
	var shadowOffsetX = 2.5;
	var shadowOffsetY = 2.5;
	var _w = 200;
	var _lw = 14;

	doughnut01.easyPieChart({
		barColor: function(percent) {
			var ctx = this.renderer.getCtx();
			var canvas = this.renderer.getCanvas();
			var gradient = ctx.createLinearGradient(0,0,-155, 0);
			if (percent == 0) {
				gradient.addColorStop(0, 'transparent');
				gradient.addColorStop(1, 'transparent');
			} else{
				gradient.addColorStop(0, color1[0]);
				gradient.addColorStop(1, color1[1]);
			}
			ctx.shadowColor = shdowColor;
			ctx.shadowBlur = shadowBlur;
			ctx.shadowOffsetX = shadowOffsetX;
			ctx.shadowOffsetY = shadowOffsetY;
			// ctx.filters = 'blur(10px)';
			return gradient;
		},
		trackColor: '#eee',
		scaleColor: 'transparent',
		lineCap: 'round',
		lineWidth: _lw,
		size: _w,
		animate: 1000,
	});
}

// Stack chart
function drawStackBar(ctx, dataArr, tooltipArr, yScale){
	var barWidth = getBarWidth(dataArr.length);

	var useYScale = true;
	if ( yScale == null || yScale == '' || yScale == 'undefined' ) {
		yScale = 0;
		useYScale = false;
	}

	const myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			datasets: [{
				data: dataArr[0],
				backgroundColor: colorlist[0],
				barThickness : barWidth,
			}, {
				data: dataArr[1],
				backgroundColor: colorlist[1],
				barThickness : barWidth,
			}, {
				data: dataArr[2],
				backgroundColor: colorlist[2],
				barThickness : barWidth,
			}, {
				data: dataArr[3],
				backgroundColor: colorlist[3],
				barThickness : barWidth,
			}],
			labels: getLabelText(dataArr)
		},
		options: {
			maintainAspectRatio: false,
			legend : {display :false},
			tooltips: getTootip(tooltipArr),
			scales: {
				xAxes: [{
					offset: true,
					stacked: true,
					gridLines: {
						drawOnChartArea: false,
						lineWidth: 1,
						drawTicks: false,
						color: gridcolor,
					},
					ticks: {
						autoSkip:true,
						maxRotation:0,
						minRotation:0,
						fontColor: gridfontcolor,
						fontSize: 12,
						stepSize: 1,
						beginAtZero: false,
						padding: 8
					}
				}],
				yAxes: [{
					stacked: true, 
					gridLines: {
					// 가로선
					display: useYScale,
					offsetGridLines : true,
					drawOnChartArea: false,
					drawBorder: true,
					color: gridcolor,
					drawTicks: false,
					lineWidth: 1,
					drawBorder: false,
				},
				ticks: {
					display: useYScale,
					stepSize: yScale
				},
				}]
			},
		}
	});
}

// Bar - 내부 권장목표 등에서 사용되는 라인 그리기 plugin
var horizonalLinePlugin = {
	beforeDraw: function (chartInstance) {
		var yScale = chartInstance.scales["y-axis-0"];
		var canvas = chartInstance.chart;
		var ctx = canvas.ctx;
		var index, line, style, setLineDash;

		if (chartInstance.options.horizontalLine) {
			for (index = 0; index < chartInstance.options.horizontalLine.length; index++) {
				line = chartInstance.options.horizontalLine[index];

				if (!line.style) style = "rgba(169,169,169, .6)";
				else style = line.style;
				if (line.y) yValue = yScale.getPixelForValue(line.y);
				else yValue = 0;
				ctx.lineWidth = 1;

				if (yValue) {
					ctx.save();
					ctx.beginPath();
					ctx.moveTo(22, yValue);
					ctx.lineTo(canvas.width, yValue);
					ctx.strokeStyle = style;
					ctx.setLineDash([5, 5]);
					ctx.stroke();
					ctx.restore();
				}
				if (line.text) {
					ctx.fillStyle = style;
					ctx.fillText(line.text, 0, yValue + ctx.lineWidth);
				}
			}
			return;
		};
	}
};

Chart.pluginService.register(horizonalLinePlugin);
var isRoundRect = false;
// Bar chart
function drawBar(ctx, dataArr, target, tooltipArr, yScale, onlyWeek){
	isRoundRect = false;
	_ctx = ctx;
	var barWidth, colorArr;
	barWidth = getBarWidth(dataArr.length);
	colorArr = getColorArr(dataArr, target);

	var useYScale = true;
	if ( yScale == null || yScale == '' || yScale == 'undefined' ) {
		yScale = 0;
		useYScale = false;
	}
	var isOnlyWeek = true;
	if ( onlyWeek == null || onlyWeek == '' || onlyWeek == 'undefined' ) {
		onlyWeek = false;
	}

	const myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			datasets: [{
				data: dataArr,
				backgroundColor: colorArr,
				hoverBackgroundColor : activecolor,
				barThickness : barWidth,
			}],
			labels: getLabelText(dataArr, isOnlyWeek),
		},
		options: {
			maintainAspectRatio: true,
			legend : {display :false},
			horizontalLine: [{
				"y": target,
				"style": gridcolor
			}],
			tooltips: getTootip(tooltipArr),
			scales: {
				xAxes: [{
					offset: true,
					stacked: true,
					gridLines: {
						drawOnChartArea: false,
						lineWidth: 1,
						drawTicks: false,
						color: gridcolor,
					},
					ticks: {
						autoSkip:true,
						maxRotation:0,
						minRotation:0,
						fontColor: gridfontcolor,
						fontSize: 12,
						stepSize: 1,
						beginAtZero: false,
						padding: 8
					}
				}],
				yAxes: [{
					stacked: true, 
					gridLines: {
						display: useYScale,
						lineWidth: 1,
						color: gridcolor,
						drawBorder: false,
					},
					ticks: {
						display: useYScale,
						stepSize: yScale
					}
				}]
			},
		}
	});
}
function drawBar2(ctx, mindata, maxdata, dataArr, tooltipArr, target, yScale, onlyWeek){
	isRoundRect = false;
	var barWidth, colorArr;
	barWidth = getBarWidth(dataArr.length);
	// if ( dataArr.length < 12 ) {
	// 	colorArr = daycolor;
	// } else {
		// colorArr = getColorArr(dataArr, target);
	// }
	var _maxdata = maxdata;
	if ( maxdata == null ) _maxdata =10000;
	var _mindata = mindata;
	if ( mindata == null ) _mindata = 0;
	var useYScale = true;
	if ( yScale == null || yScale == '' || yScale == 'undefined' ) {
		yScale = 0;
		useYScale = false;
	}

	const myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			datasets: [{
				data: dataArr,
				backgroundColor: colorArr,
				hoverBackgroundColor : activecolor,
				barThickness : barWidth,
			}],
			labels: getLabelText(dataArr, onlyWeek)
		},
		options: {
			maintainAspectRatio: false,
			legend : {display :false},
			horizontalLine: [{
				"y": target,
				"style": gridcolor
			}],
			tooltips: getTootip(tooltipArr),
			scales: {
				xAxes: [{
					offset: true,
					stacked: true,
					gridLines: {
						drawOnChartArea: false,
						lineWidth: 1,
						drawTicks: false,
						color: gridcolor,
					},
					ticks: {
						autoSkip:true,
						maxRotation:0,
						minRotation:0,
						fontColor: gridfontcolor,
						fontSize: 12,
						stepSize: 1,
						beginAtZero: false,
						padding: 8
					}
				}],
				yAxes: [{
					stacked: true, 
					gridLines: {
						display: useYScale,
						lineWidth: 1,
						color: gridcolor,
						drawBorder: false,
					},
					ticks: {
					// display: useYScale,
					// stepSize: yScale,
					beginAtZero: true,
					min:_mindata,
					max:_maxdata,
					display: true,
					stepSize: 1000,
					callback: function(value, index, ticks) {
						if ( value == mindata || value == maxdata)
							return value;
						else if ( value == target )
							return '평균';
						else
							return '';
					}
				}
			}]
		},
	}
});
}

function drawBar3(ctx, dataArr, lableArr, yScale , labelTxt){
	isRoundRect = false;
	var barWidth, colorArr;
	barWidth = 50;

	var _labelTxt = '';
	if ( labelTxt != null ) _labelTxt = labelTxt;

	var gradient = ctx.createLinearGradient(0,0,0,300);
	gradient.addColorStop(0, '#ffd700');
	gradient.addColorStop(1, '#ffed00');
	colorArr = [daycolor, gradient];

	var useYScale = true;
	if ( yScale == null || yScale == '' || yScale == 'undefined' ) {
		yScale = 0;
		useYScale = false;
	}

	const myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			datasets: [{
				data: dataArr,
				backgroundColor: colorArr,
				hoverBackgroundColor : activecolor,
				barThickness : barWidth,
			}],
			labels: lableArr,
		},
		options: {
			maintainAspectRatio: false,
			legend : {display :false},
			tooltips :{enabled:false},
			hover: {animationDuration: 0},
			animation: {
				duration: 1,
				onComplete: function () {
					var chartInstance = this.chart,
					ctx = chartInstance.ctx;
					ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
					ctx.textAlign = 'center';
					ctx.textBaseline = 'bottom';
					ctx.fillStyle = "#999";

					this.data.datasets.forEach(function (dataset, i) {
						var meta = chartInstance.controller.getDatasetMeta(i);
						meta.data.forEach(function (bar, index) {
							var data = dataset.data[index] + " " + _labelTxt;
							ctx.fillText(data, bar._model.x, bar._model.y - 5);
						});
					});
				}
			},
			scales: {
				xAxes: [{
					offset: true,
					stacked: true,
					gridLines: {
						drawOnChartArea: false,
						lineWidth: 1,
						drawTicks: false,
						color: gridcolor,
					},
					ticks: {
						autoSkip:true,
						maxRotation:0,
						minRotation:0,
						fontColor: gridfontcolor,
						fontSize: 12,
						stepSize: 1,
						beginAtZero: false,
						padding: 8
					}
				}],
				yAxes: [{
					stacked: true, 
					gridLines: {
						display: useYScale,
						lineWidth: 1,
						color: gridcolor,
						drawBorder: false,
					},
					ticks: {
						display: false,
						stepSize: yScale
					}
				}]
			},
		}
	});
}

function drawBar4(ctx, dataArr, lableArr, yScale , labelTxt){
	isRoundRect = false;
	var barWidth, colorArr;
	barWidth = 16;

	var _mindata = 0;
	var _maxdata = 10;

	var _labelTxt = '';
	if ( labelTxt != null ) _labelTxt = labelTxt;

	var gradient = ctx.createLinearGradient(0,0,0,300);
	gradient.addColorStop(0, '#ffd700');
	gradient.addColorStop(1, '#ffed00');
	colorArr = gradient;

	var useYScale = true;
	if ( yScale == null || yScale == '' || yScale == 'undefined' ) {
		yScale = 0;
		useYScale = false;
	}

	const myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			datasets: [{
				data: dataArr,
				backgroundColor: colorArr,
				hoverBackgroundColor : activecolor,
				barThickness : barWidth,
			}],
			labels: lableArr,
		},
		options: {
			maintainAspectRatio: false,
			legend : {display :false},
			tooltips :{enabled:false},
			scales: {
				xAxes: [{
					offset: true,
					stacked: true,
					gridLines: {
						drawOnChartArea: false,
						lineWidth: 1,
						drawTicks: false,
						color: gridcolor,
					},
					ticks: {
						autoSkip:true,
						maxRotation:0,
						minRotation:0,
						fontColor: gridfontcolor,
						fontSize: 12,
						stepSize: 1,
						beginAtZero: false,
						padding: 8
					}
				}],
				yAxes: [{
					stacked: true, 
					gridLines: {
						display: useYScale,
						lineWidth: 1,
						color: gridcolor,
						drawBorder: false,
					},
					ticks: {
						beginAtZero: true,
						min:_mindata,
						max:_maxdata,
						display: true,
						stepSize: yScale,
						callback: function(value, index, ticks) {
							if ( value == _mindata || value == _maxdata || value == yScale)
								return value;
							else
								return '';
						}
					}
				}]
			},
		}
	});
}


//Sleep 
function drawSleep(ctx, mindata, maxdata, dataArr, tooltipArr, target, yScale, onlyWeek){
	isRoundRect = false;
	var barWidth, colorArr;
	barWidth = getBarWidth(dataArr.length);
	// if ( dataArr.length < 12 ) {
	// 	colorArr = daycolor;
	// } else {
		colorArr = getColorArr(dataArr, target);
	// }

	var useYScale = true;
	if ( yScale == null || yScale == '' || yScale == 'undefined' ) {
		yScale = 0;
		useYScale = false;
	}

	const myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			datasets: [{
				data: dataArr,
				backgroundColor: colorArr,
				hoverBackgroundColor : activecolor,
				barThickness : barWidth,
			}],
			labels: getLabelText(dataArr, onlyWeek)
		},
		options: {
			maintainAspectRatio: false,
			legend : {display :false},
			horizontalLine: [{
				"y": target,
				"style": gridcolor
			}],
			tooltips: getTootip(tooltipArr),
			scales: {
				xAxes: [{
					offset: true,
					stacked: true,
					gridLines: {
						drawOnChartArea: false,
						lineWidth: 1,
						drawTicks: false,
						color: gridcolor,
					},
					ticks: {
						autoSkip:true,
						maxRotation:0,
						minRotation:0,
						fontColor: gridfontcolor,
						fontSize: 12,
						stepSize: 1,
						beginAtZero: false,
						padding: 8
					}
				}],
				yAxes: [{
					stacked: true, 
					gridLines: {
						display: useYScale,
						lineWidth: 1,
						color: gridcolor,
						drawBorder: false,
					},
					ticks: {
						// display: useYScale,
						// stepSize: yScale,
						beginAtZero: true,
						min:mindata,
						max:maxdata,
						display: true,
						stepSize: 10,
						callback: function(value, index, ticks) {
							if ( value == mindata || value == maxdata)// || value == target  )
								return value;
							else
								return '';
					}
				}
			}]
		},
	}
});
}

function setTime(time){
	var _time = time;
	if (time > 12 && time < 24){
		_time =  time  - 24;
	}
	return _time;
}

function setTimeArr(dataArr){
	var array = [];
	$.each(dataArr, function( index ) {
		var datalist = dataArr[index];
		if (datalist != null) {
			var _datalist = [];
			_datalist.push(setTime(datalist[0]));
			_datalist.push(setTime(datalist[1]));
			array.push(_datalist);
		} else {
			array.push(null);
		}
	});
	return array;
}

function drawSleepTime(ctx, mindata, maxdata, dataArr, tooltipArr){
	var _mindata = setTime(mindata);
	var _maxdata = setTime(maxdata);
	var _dataArr = setTimeArr(dataArr);
	var bar = {
		type: 'bar',
		data: _dataArr,
		maxBarThickness: 8,
		backgroundColor: '#e5e5e5',
		borderDash: [2,2],
		// hoverBackgroundColor:'#ffd700',
	}

	var lowPressure = {
		type: 'line',
		data: getArr(_dataArr,'low'),
		fill: false,
		pointStyle: 'circle',
		showLine: false,
		pointBackgroundColor: '#999999',
		pointHoverBackgroundColor: '#ffd700',
		pointBorderColor:  '#999999',
		pointHoverBorderColor:'#ffd700',
		pointRadius: 4,
		pointHoverRadius: 4,
	}

	var highPressure = {
		type: 'line',
		data: getArr(_dataArr,'high'),
		fill: false,
		pointStyle: 'circle',
		showLine: false,
		pointBackgroundColor:  '#999999',
		pointHoverBackgroundColor: '#ffd700',
		pointBorderColor: '#999999',
		pointHoverBorderColor:'#ffd700',
		pointRadius: 4,
		pointHoverRadius: 4,
	}

	const myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: getLabelText(_dataArr),
			datasets: [lowPressure, highPressure, bar],
		},            
		options: {
			maintainAspectRatio: false,
			scales: {
				weight: 10,
				yAxes: [{
					weight: 100,
					offset: true,
					gridLines: {display:false},
					ticks: {
						min:_mindata,
						max:_maxdata,
						display: true,
						stepSize: 1,
						drawTicks:false,
						beginAtZero: false,
						callback: function(value, index, ticks) {
							if ( value == _mindata )
								return mindata;
							else if ( value == _maxdata)
								return value;
							else
								return '';
						}
					},
				}],
				xAxes: [{
					offset: true,
					gridLines: {
						offsetGridLines: false,
						padding: 3,
						drawOnChartArea: true,
						drawTicks: false,
						color: gridcolor,
						borderDash: [2,2]
					},
					ticks: {
						maxTicksLimit: 20,
						fontColor: gridfontcolor,
						fontSize: 12,
						stepSize: 1,
						beginAtZero: false,
						padding: 8

					}
				}]
			},
			tooltips: getTootip(tooltipArr),
			legend : {display :false},
			// annotation : getAnnotation(bgArr),
		}
	});
}



// Line chart - 혈당
function drawLine(ctx, dataArr, tooltipArr, bgArr, yScale, onlyWeek, onlyCircle, target){
	var useYScale = true;
	if ( yScale == null || yScale == '' || yScale == 'undefined' ) {
		yScale = 0;
		useYScale = false;
	}

	if (target == null || target == "" || target == 'undefined') {
		target = 0;
	}

	if (dataArr.length == 2) {
		var chartA = {
			type: 'line',
			data: dataArr[0],
			lineTension: 0,
			fill: false,
			borderWidth: 1,
			borderColor: gridfontcolor,
			pointRadius: 4,
			pointHoverRadius: 4,
			pointHoverBackgroundColor: activecolor,
			pointStyle: 'circle',
			pointBackgroundColor: '#fff',
			spanGaps: true,
		};

		var chartB = {
			type: 'line',
			data: dataArr[1],
			lineTension: 0,
			fill: false,
			borderWidth: 1,
			borderColor: gridfontcolor,
			pointRadius: 4,
			pointHoverRadius: 4,
			pointHoverBackgroundColor: activecolor,
			pointStyle: 'circle',
			pointBackgroundColor: gridfontcolor,
			spanGaps: true,
		};

		const myChart = new Chart(ctx, {
			type: 'line',
			data: {
				datasets: [chartA, chartB],
				labels: getLabelText(dataArr[0], onlyWeek),
			}, 
			options: {
				maintainAspectRatio: false,
				scales: {
					weight: 10,
					yAxes: [{
						weight: 10,
						offset: true,
						gridLines: {
							display:false,
							lineWidth: 1,
							color: gridcolor,
							drawBorder: false,
						},
						ticks: {
							min:60,
							max:150,
							display: useYScale,
							stepSize: 10,
							drawTicks:false,
							beginAtZero: false,
							callback: function(value, index, ticks) {
								if ( value == 60 || value == 150 || value == target )
									return value;
								else
									return '';
							}
						}
					}],
					xAxes: [{
						offset: true,
						gridLines: {
							offsetGridLines: false,
							padding: 3,
							drawOnChartArea: true,
							drawTicks: false,
							color: gridcolor,
							borderDash: [2,2]
						},
						ticks: {
							autoSkip:true,
							maxRotation:0,
							minRotation:0,
							maxTicksLimit: 20,
							fontColor: gridfontcolor,
							fontSize: 12,
							stepSize: 1,
							beginAtZero: false,
							padding: 8
						}
					}]
				},
				tooltips: getTootip(tooltipArr),
				legend : {display :false},			
				annotation : getAnnotation(bgArr),
			},
		});

	} else {
		var bg = '#fff';
		if (onlyCircle == true) bg = gridfontcolor;
		const myChart = new Chart(ctx, {
			type: 'line',
			data: {
				datasets: [{
					data: dataArr,
					lineTension: 0,
					fill: false,
					borderWidth: 1,
					borderColor: gridfontcolor,
					pointRadius: 4,
					pointHoverRadius: 4,
					pointBackgroundColor: bg,
					pointHoverBackgroundColor: activecolor,
					pointStyle: 'circle',
				}],
				labels: getLabelText(dataArr, onlyWeek)
			},
			options: {
				spanGaps: true,
				maintainAspectRatio: false,				
				horizontalLine: [{
					"y": target,
					"style": gridcolor
				}],
				scales: {
					weight: 10,
					yAxes: [{
						weight: 100,
						offset: true,
						gridLines: {
							display: false,
							lineWidth: 1,
							color: gridcolor,
							drawBorder: true,
						},
						ticks: {
							min:60,
							max:150,
							display: useYScale,
							stepSize: 10,
							drawTicks:false,
							beginAtZero: false,
							callback: function(value, index, ticks) {
								if ( value == 60 || value == 150 || value == target )
									return value;
								else
									return '';
							}
						}
					}],
					xAxes: [{
						offset: true,
						gridLines: {
							offsetGridLines: false,
							padding: 3,
							drawOnChartArea: true,
							drawTicks: false,
							color: gridcolor,
							borderDash: [2,2]
						},
						ticks: {
							autoSkip:true,
							maxRotation:0,
							minRotation:0,
							maxTicksLimit: 20,
							fontColor: gridfontcolor,
							fontSize: 12,
							stepSize: 1,
							beginAtZero: true,
							padding: 8
						}
					}]
				},
				tooltips: getTootip(tooltipArr),
				legend : {display :false},			
				annotation : getAnnotation(bgArr),
			}
		});
	}	
}

//Line - 혈압
function drawLine2(ctx, dataArr, tooltipArr, bgArr, yScale, onlyWeek, onlyCircle, target){
	var useYScale = true;
	if ( yScale == null || yScale == '' || yScale == 'undefined' ) {
		yScale = 0;
		useYScale = false;
	}

	if (target == null || target == "" || target == 'undefined') {
		target = 0;
	}

	var bg = '#fff';
	if (onlyCircle == true) bg = gridfontcolor;
	const myChart = new Chart(ctx, {
		type: 'line',
		data: {
			datasets: [{
				data: dataArr,
				lineTension: 0,
				fill: false,
				borderWidth: 1,
				borderColor: gridfontcolor,
				pointRadius: 4,
				pointHoverRadius: 4,
				pointBackgroundColor: bg,
				pointHoverBackgroundColor: activecolor,
				pointStyle: 'circle',
				spanGaps: true,
			}],
			labels: getLabelText(dataArr, onlyWeek)
		},
		options: {
			maintainAspectRatio: false,				
			horizontalLine: [{
				"y": target,
				"style": gridcolor
			}],
			scales: {
				weight: 10,
				yAxes: [{
					weight: 100,
					offset: true,
					gridLines: {
						display: false,
						lineWidth: 1,
						color: gridcolor,
						drawBorder: true,
					},
					ticks: {
						min:0,
						max:200,
						display: true,
						stepSize: 10,
						drawTicks:false,
						beginAtZero: false,
						callback: function(value, index, ticks) {
							if ( value == 0 || value == 200 || value == target )
								return value;
							else
								return '';
						}
					}
				}],
				xAxes: [{
					offset: true,
					gridLines: {
						offsetGridLines: false,
						padding: 3,
						drawOnChartArea: true,
						drawTicks: false,
						color: gridcolor,
						borderDash: [2,2]
					},
					ticks: {
						autoSkip:true,
						maxRotation:0,
						minRotation:0,
						maxTicksLimit: 20,
						fontColor: gridfontcolor,
						fontSize: 12,
						stepSize: 1,
						beginAtZero: true,
						padding: 8
					}
				}]
			},
			tooltips: getTootip(tooltipArr),
			legend : {display :false},			
			annotation : getAnnotation(bgArr),
		}
	});
}

// Dot chart
function drawDot(ctx, dataArr, tooltipArr, bgArr){
	const myChart = new Chart(ctx, {
		type: 'line',
		data: {
			datasets: [{
				data: dataArr,
				lineTension: 0,
				fill: false,
				borderWidth: 0,
				borderColor: gridfontcolor,
				pointRadius: 4,
				pointHoverRadius: 4,
				pointBackgroundColor: gridfontcolor,
				pointHoverBackgroundColor: activecolor,
				pointHoverBorderColor: activecolor,
				pointStyle: 'circle',
				showLine:false,
			}],
			labels: getLabelText(dataArr)
		},
		options: {
			maintainAspectRatio: false,
			scales: {
				weight: 10,
				yAxes: [{
					min:0,
					weight: 100,
					offset: true,
					gridLines: {display:false,},
					ticks: {
						display: false, 
						beginAtZero: true,
						min:getminticks(dataArr),
						max:getmaxticks(dataArr),
					},
				}],
				xAxes: [{
					offset: true,
					gridLines: {
						offsetGridLines: false,
						padding: 3,
						drawOnChartArea: true,
						drawTicks: false,
						color: gridcolor,
						borderDash: [2,2]
					},
					ticks: {
						autoSkip:true,
						maxRotation:0,
						minRotation:0,
						maxTicksLimit: 20,
						fontColor: gridfontcolor,
						fontSize: 12,
						beginAtZero: false,
						padding: 8
					}
				}]
			},
			tooltips: getTootip(tooltipArr),
			legend : {display :false},
			annotation : getAnnotation(bgArr),
		}
	});
}

// Body chart
function drawBody(ctx, mindata, maxdata, dataArr, tooltipArr, bgArr){
	const myChart = new Chart(ctx, {
		type: 'line',
		data: {
			datasets: [{
				data: dataArr,
				lineTension: 0,
				fill: false,
				borderWidth: 0,
				borderColor: gridfontcolor,
				pointRadius: 4,
				pointHoverRadius: 4,
				pointBackgroundColor: '#fff',
				pointHoverBackgroundColor: activecolor,
				pointHoverBorderColor: activecolor,
				pointStyle: 'circle',
				showLine:true,
				spanGaps: true,
			}],
			labels: getLabelText(dataArr)
		},
		options: {
			maintainAspectRatio: false,
			scales: {
				weight: 10,
				yAxes: [{
					weight: 100,
					offset: true,
					gridLines: {display:false,},
					ticks: {
						beginAtZero: true,
						min:mindata,
						max:maxdata,
						display: true,
						stepSize: 10,
						callback: function(value, index, ticks) {
							if ( value == mindata || value == maxdata)// || value == target  )
								return value;
							else
								return '';
						}
					},
				}],
				xAxes: [{
					offset: true,
					gridLines: {
						offsetGridLines: false,
						padding: 3,
						drawOnChartArea: true,
						drawTicks: false,
						color: gridcolor,
						borderDash: [2,2],
					},
					ticks: {
						autoSkip:true,
						maxRotation:0,
						minRotation:0,
						maxTicksLimit: 20,
						fontColor: gridfontcolor,
						fontSize: 12,
						beginAtZero: false,
						padding: 8,

					}
				}]
			},
			tooltips: getTootip(tooltipArr),
			legend : {display :false},
			annotation : getAnnotation(bgArr),
		}
	});
}

// Blood Chart
function drawBlood(ctx, dataArr, tooltipArr, bgArr){
	var bar = {
		type: 'bar',
		data: dataArr,
		maxBarThickness: 1,
		backgroundColor: lineColor,
		borderDash: [2,2]
	}

	var lowPressure = {
		type: 'line',
		data: getArr(dataArr,'low'),
		fill: false,
		pointStyle: 'circle',
		showLine: false,
		pointBackgroundColor: lowBloodcolor,
		pointHoverBackgroundColor: lowBloodcolor,
		pointBorderColor: lowBloodcolor,
		pointRadius: 5,
		pointHoverRadius: 5,
	}

	var highPressure = {
		type: 'line',
		data: getArr(dataArr,'high'),
		fill: false,
		pointStyle: 'circle',
		showLine: false,
		pointBackgroundColor: highBloodcolor,
		pointHoverBackgroundColor: highBloodcolor,
		pointBorderColor: highBloodcolor,
		pointRadius: 5,
		pointHoverRadius: 5,
	}

	const myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: getLabelText(dataArr),
			datasets: [lowPressure, highPressure, bar],
		},            
		options: {
			maintainAspectRatio: false,
			scales: {
				weight: 10,
				yAxes: [{
					weight: 100,
					offset: true,
					gridLines: {display:false},
					ticks: {
						// display: false, 
						// beginAtZero: true,
						// min:getminticks(getArr(dataArr,'low')),
						// max:getmaxticks(getArr(dataArr,'high')),
						min:80,
						max:130,
						display: true,
						stepSize: 10,
						drawTicks:false,
						beginAtZero: false,
						callback: function(value, index, ticks) {
							if ( value == 80 || value == 130)// || value == target  )
								return value;
							else
								return '';
						}
					},
				}],
				xAxes: [{
					offset: true,
					gridLines: {
						offsetGridLines: false,
						padding: 3,
						drawOnChartArea: true,
						drawTicks: false,
						color: gridcolor,
						borderDash: [2,2]
					},
					ticks: {
						autoSkip:true,
						maxRotation:0,
						minRotation:0,
						maxTicksLimit: 20,
						fontColor: gridfontcolor,
						fontSize: 12,
						stepSize: 1,
						beginAtZero: false,
						padding: 8

					}
				}]
			},
			tooltips: getTootip(tooltipArr),
			legend : {display :false},
			annotation : getAnnotation(bgArr),
		}
	});
}

// Heart Chart
function drawHeart(ctx, dataArr, tooltipArr, mindata, maxdata, yScale, target){
	var _min = 50;
	if ( mindata != null) _min = mindata;
	var _max = 160;
	if ( maxdata != null) _max = maxdata;
	
	var useYScale = true;
	if ( yScale == null || yScale == '' || yScale == 'undefined' ) {
		yScale = 0;
		useYScale = false;
	}

	var bar = {
		type: 'bar',
		data: dataArr,
		maxBarThickness: 5,
		backgroundColor: lineColor,
		borderDash: [2,2],
		hoverBackgroundColor:'#ffd700',
	}

	var lowPressure = {
		type: 'line',
		data: getArr(dataArr,'low'),
		fill: false,
		pointStyle: 'circle',
		showLine: false,
		pointBackgroundColor: '#999999',
		pointHoverBackgroundColor: '#ffd700',
		pointBorderColor:  '#999999',
		pointHoverBorderColor:'#ffd700',
		pointRadius: 2,
		pointHoverRadius: 2,
	}

	var highPressure = {
		type: 'line',
		data: getArr(dataArr,'high'),
		fill: false,
		pointStyle: 'circle',
		showLine: false,
		pointBackgroundColor:  '#999999',
		pointHoverBackgroundColor: '#ffd700',
		pointBorderColor: '#999999',
		pointHoverBorderColor:'#ffd700',
		pointRadius: 2,
		pointHoverRadius: 2,
	}

	const myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: getLabelText(dataArr),
			datasets: [lowPressure, highPressure, bar],
		},            
		options: {
			maintainAspectRatio: false,
			horizontalLine: [{
				"y": target,
				"style": gridcolor
			}],
			scales: {
				weight: 10,
				yAxes: [{
					weight: 100,
					offset: true,
					gridLines: {
						display: useYScale,
						lineWidth: 1,
						color: gridcolor,
						drawBorder: false,
					},
					ticks: {
						min:_min,
						max:_max,
						display: true,
						stepSize: yScale,
						drawTicks:false,
						beginAtZero: true,
						callback: function(value, index, ticks) {
									if ( value == _min || value == _max)// || value == target  )
										return value;
									else
										return '';
								}
							},
						}],
						xAxes: [{
							offset: true,
							gridLines: {
								offsetGridLines: false,
								padding: 3,
								drawOnChartArea: useYScale,
								drawTicks: false,
								color: gridcolor,
								borderDash: [2,2],
								// drawBorder: false,
							},
							ticks: {
								autoSkip:true,
								maxRotation:0,
								minRotation:0,
								maxTicksLimit: 20,
								fontColor: gridfontcolor,
								fontSize: 12,
								beginAtZero: false,
								padding: 8,

							}
						}]
					},
					tooltips: getTootip(tooltipArr),
					legend : {display :false},
			// annotation : getAnnotation(bgArr),
		}
	});
}

function drawHeart2(ctx, dataArr, tooltipArr, mindata, maxdata, yScale, target){
	var _min = 50;
	if ( mindata != null) _min = mindata;
	var _max = 160;
	if ( maxdata != null) _max = maxdata;
	
	var useYScale = true;
	if ( yScale == null || yScale == '' || yScale == 'undefined' ) {
		yScale = 0;
		useYScale = false;
	}

	var bar = {
		type: 'bar',
		data: dataArr,
		maxBarThickness: 8,
		backgroundColor: '#ffd700',
		borderDash: [2,2],
		hoverBackgroundColor:'#ffd700',
	}

	var lowPressure = {
		type: 'line',
		data: getArr(dataArr,'low'),
		fill: false,
		pointStyle: 'circle',
		showLine: false,
		pointBackgroundColor: '#ffd700',
		pointHoverBackgroundColor: '#ffd700',
		pointBorderColor:  '#ffd700',
		pointHoverBorderColor:'#ffd700',
		pointRadius: 3,
		pointHoverRadius: 3,
	}

	var highPressure = {
		type: 'line',
		data: getArr(dataArr,'high'),
		fill: false,
		pointStyle: 'circle',
		showLine: false,
		pointBackgroundColor:  '#ffd700',
		pointHoverBackgroundColor: '#ffd700',
		pointBorderColor: '#ffd700',
		pointHoverBorderColor:'#ffd700',
		pointRadius: 3,
		pointHoverRadius: 3,
	}

	const myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: getLabelText(dataArr),
			datasets: [lowPressure, highPressure, bar],
		},            
		options: {
			maintainAspectRatio: false,
			horizontalLine: [{
				"y": target,
				"style": gridcolor
			}],
			scales: {
				weight: 10,
				yAxes: [{
					weight: 100,
					offset: true,
					gridLines: {
						display: useYScale,
						lineWidth: 1,
						color: gridcolor,
						drawBorder: false,
					},
					ticks: {
						min:_min,
						max:_max,
						display: true,
						stepSize: yScale,
						drawTicks:false,
						beginAtZero: true,
						callback: function(value, index, ticks) {
									if ( value == _min || value == _max)// || value == target  )
										return value;
									else
										return '';
								}
							},
						}],
						xAxes: [{
							offset: true,
							gridLines: {
								offsetGridLines: false,
								padding: 3,
								drawOnChartArea: useYScale,
								drawTicks: false,
								color: gridcolor,
								borderDash: [2,2],
								// drawBorder: false,
							},
							ticks: {
								autoSkip:true,
								maxRotation:0,
								minRotation:0,
								maxTicksLimit: 20,
								fontColor: gridfontcolor,
								fontSize: 12,
								beginAtZero: false,
								padding: 8,

							}
						}]
					},
					tooltips: getTootip(tooltipArr),
					legend : {display :false},
			// annotation : getAnnotation(bgArr),
		}
	});
}

// Multi Chart
function drawMulti(ctx, dataArr, labelArr, selectIndex){

	var gradient = ctx.createLinearGradient(0,0,0,300);
	gradient.addColorStop(0, '#eeeeee');
	gradient.addColorStop(1, '#eeeeee');

	var barC = {
		type: 'bar',
		data: dataArr,
		barThickness : 36,
		backgroundColor : gradient,
		hoverBackgroundColor : activecolor,
		borderColor: '#bbbbbb',
		borderWidth: 0,
	}

	var lineC = {
		type: 'line',
		data: dataArr,
		fill: false,
		pointStyle: 'circle',
		lineTension: 0,
		borderWidth: 1,
		pointBackgroundColor: '#fff',
		pointBorderColor: gridfontcolor,
		pointHoverBackgroundColor: pointcolor,
		pointHoverBorderColor: pointcolor,
		pointRadius: 3,
		pointHoverRadius: 3,
	}
	const myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels:labelArr,
			datasets: [lineC, barC],
		}, 
		options: {
			maintainAspectRatio: false,
			legend : {display :false},
			layout: {padding: {top: 50}},
			scales: {
				xAxes: [{
					offset: true,
					stacked: true,
					gridLines: {
						drawOnChartArea: false,
						lineWidth: 1,
						drawTicks: false,
						color: gridcolor,
					},
					ticks: {
						autoSkip:true,
						maxRotation:0,
						minRotation:0,
						fontColor: gridfontcolor,
						fontSize: 12,
						stepSize: 1,
						beginAtZero: false,
						padding: 8
					}
				}],
				yAxes: [{
					stacked: true, 
					gridLines: {display: false},
					ticks: {display: false}
				}]
			},
			tooltips : {enabled : false},
			hover: {animationDuration: 0},
			animation: {
				// duration: 1,
				onComplete: function () {
					var chartInstance = this.chart,
					ctx = chartInstance.ctx;
					ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
					ctx.textAlign = 'center';
					ctx.textBaseline = 'bottom';

					this.data.datasets.forEach(function (dataset, i) {
						var meta = chartInstance.controller.getDatasetMeta(i);
						meta.data.forEach(function (bar, index) {
							if ( index == selectIndex) ctx.fillStyle ='#ff612d';
							else ctx.fillStyle = '#666';
							var data = dataset.data[index];							
							ctx.fillText(data, bar._model.x, bar._model.y - 5);
						});
					});
				}
			},
		},
		plugins: [{
			afterDatasetDraw: function(chart, args, options) {
				args.meta.data.forEach(function(element) {
					var borderWidth = 3;
					var ctx = chart.ctx;
					var vm = element._view;
					var half = vm.offsetWidth / 2;
					var left = vm.x - half;
					var right = vm.x + half;
					var top = vm.y;
					var width = right - left;
					var height = chart.chartArea.bottom - top + (borderWidth / 2) - 1;
					ctx.beginPath();
					ctx.lineWidth = 1;
					ctx.strokeStyle = vm.borderColor;
					ctx.setLineDash([5, 5]);
					ctx.moveTo(left, top);
					ctx.lineTo(left, top + height);
					ctx.moveTo(left, top);
					ctx.lineTo(left + width, top);
					ctx.moveTo(left + width, top);
					ctx.lineTo(left + width, top + height);
					ctx.stroke();
					ctx.save();
				});
			}
		}]
	});
}


// Bar - color 받아오기 (target이상/이하)
function getColorArr(dataArr, target){	
	var barColors=[];
	if (target == 0) return daycolor;
	$.each(dataArr, function( index,value ) {
		if(value>target){
			if(_ctx) {
				var gradient = _ctx.createLinearGradient(0,0,0,300);
				gradient.addColorStop(0, '#ffd700');
				gradient.addColorStop(1, '#ffed00');
				barColors[index]=gradient;
			} else {
				barColors[index]=pointcolor;
				
			}
		}else{
			barColors[index]=daycolor;
		}
	});
	return barColors;
}
// Bar - 데이터 갯수 기준 넓이 조정
function getBarWidth(len) {
	var barWidth;
	if ( len <= 6 ) barWidth = 20;
	else if (len == 7) barWidth = 16;
	else if (len == 12) barWidth = 8;
	else barWidth = 4;
	return barWidth;
}
// 데이터 갯수 기준으로 일/주/월/년 분기
function getLabelText(dataArr, onlyWeek){
	var labelText;
	if ( dataArr.length <= 6 ) {
		labelText =  ['1주차', '2주차', '3주차', '4주차'];
		if ( dataArr.length >= 5 ) labelText.push('5주차');
		if ( dataArr.length >= 6 ) labelText.push('6주차');
	} else if (dataArr.length == 7) {
		labelText =  [ '월', '화', '수', '목', '금', '토', '일'];
	} else if (dataArr.length == 12) {
		if (onlyWeek) {
			labelText =  ['1주차' , '', '3주차', '', '5주차', '', '7주차', '', '9주차', '', '11주차', ''];
		} else {
			labelText =  ['1월' , '', '3월', '', '5월', '', '7월', '', '9월', '', '11월', ''];
		}
	} else {
		labelText =  ['0시', '', '', '3시', '', '', '6시', '', '', '9시', '', '', '12시', '', '', '15시', '', '', '18시', '', '','21시', '', '', ''];
	}
	return labelText;
}
// tooltip 생성
function getTootip(tooltipArr) {
	var isLast = false;
	var tooltip = {
		enabled : false,
		custom: function(tooltipModel) {
			if ( !tooltipArr ) return;
			var tooltipEl = document.getElementById('chartjs-tooltip');

			if (!tooltipEl) {
				tooltipEl = document.createElement('div');
				tooltipEl.id = 'chartjs-tooltip';
				tooltipEl.innerHTML = '<table></table>';
				document.body.appendChild(tooltipEl);
			}
			if (tooltipModel.opacity === 0) {
				tooltipEl.style.opacity = 0;
				return;
			}
			tooltipEl.classList.remove('above', 'below', 'no-transform');
			if (tooltipModel.yAlign) {
				tooltipEl.classList.add(tooltipModel.yAlign);
			} else {
				tooltipEl.classList.add('no-transform');
			}

			function getBody(bodyItem) { 
				return bodyItem.lines; 
			}
			if (tooltipModel.body) {
				var titleLines = tooltipModel.title || [];
				var bodyLines = tooltipModel.body.map(getBody);
				var tootipIdx = tooltipModel.dataPoints[0].index;
				var innerHtml = '<tbody>';
				if (tooltipArr[0].length < 2) {
					innerHtml += '<tr><td style="font-weight:700">' +  tooltipArr[tootipIdx][0] + '</td></tr>';
					innerHtml += '<tr><td style="font-weight:700">' +  tooltipArr[tootipIdx][1] + '</td></tr>';
					innerHtml += '<tr><td>' +  tooltipArr[tootipIdx][2] + '</td></tr>';
					innerHtml += '<tr><td>' +  tooltipArr[tootipIdx][3] + '</td></tr>';
					innerHtml += '<tr><td>' +  tooltipArr[tootipIdx][4] + '</td></tr>';
					innerHtml += '<tr><td>' +  tooltipArr[tootipIdx][5] + '</td></tr>';
				} else {
					if (tooltipArr[tootipIdx] != null) {
						for(var  i=0; i<tooltipArr[tootipIdx].length; i++) {

							innerHtml += '<tr><td>' +  tooltipArr[tootipIdx][i] + '</td></tr>';
						}
					}
				}
				
				innerHtml += '</tbody>';
				var tableRoot = tooltipEl.querySelector('table');
				tableRoot.innerHTML = innerHtml;
			}   

			var position = this._chart.canvas.getBoundingClientRect();
			tooltipEl.style.opacity = 1;
			tooltipEl.style.position = 'absolute';
			if (tooltipModel.caretX + 100 >= $(window).outerWidth() ) {
				$('#chartjs-tooltip').addClass('last');
				tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX -90 + 'px';
			} else {
				if ($('#chartjs-tooltip').hasClass('last'))
					$('#chartjs-tooltip').removeClass('last');
				tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
			}
			tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
			tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
			tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
			tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
			tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
			tooltipEl.style.pointerEvents = 'none';
		}
	}
	return tooltip;
}
// 혈압 - 고/저 분리
function getArr(dataArr, type){
	var array = [];
	$.each(dataArr, function( index ) {
		var datalist = dataArr[index];
		var data;
		if(type=='low') {
			data = datalist[0];
		} else {
			data = datalist[1];
		}
		array.push(data);
	});
	return array;
}
// 범위설정
function getAnnotation(bgArr){
	if (bgArr == null || bgArr.length != 2) return ""; 
	var bgmin, bgmax;
	if (bgArr) {
		bgmin = bgArr[0];
		bgmax = bgArr[1];
	} else{
		bgmin = 0;
		bgmax = 0;
	}
	var annotation = {
		drawTime: 'afterDatasetsDraw',
		annotations:[{
			type: 'box',
			yScaleID: 'y-axis-0',
			yMin: bgmin,
			yMax: bgmax,
			borderColor:linebgcolor,
			borderWidth: 0,
			backgroundColor:linebgcolor,
		}]
	}
	return annotation;
}
// 범위 최저값 설정
function getminticks(dataArr){
	var min = +Infinity;
	for (var i = 0; i < dataArr.length; ++i) {
		if (dataArr[i] > min) continue;
		if (dataArr[i] < min) min = dataArr[i];
	}
	min = min - 20;
	if (min <= 0) min = 0;
	return min;
}
// 범위 최대값 설정
function getmaxticks(dataArr){
	var max = -Infinity;
	for (var i = 0; i < dataArr.length; ++i) {
		if (dataArr[i] < max) continue;
		if (dataArr[i] > max) max = dataArr[i];
	}
	max = max + 20;
	return max; 
}

// 범위 최저값 설정
function getminticks2(dataArr){
	var min = +Infinity;
	for (var i = 0; i < dataArr.length; ++i) {
		if (dataArr[i] > min) continue;
		if (dataArr[i] < min) min = dataArr[i];
	}
	min = min - 200;
	if (min <= 0) min = 0;
	return min;
}
// 범위 최대값 설정
function getmaxticks2(dataArr){
	var max = -Infinity;
	for (var i = 0; i < dataArr.length; ++i) {
		if (dataArr[i] < max) continue;
		if (dataArr[i] > max) max = dataArr[i];
	}
	max = max;
	return max; 
}

$('.scrollBox').scroll(function(event){
	addScroll();
});

var didToolTipScroll;
//스크롤시 툴팁 제거
function addScroll(){
	if ($('#chartjs-tooltip').length == 0) return;
	didToolTipScroll = true;

	setInterval(function(){
		if (didToolTipScroll == true) {
			$("#chartjs-tooltip").css({'opacity':'0'});
			didToolTipScroll = false;
		}
	}, 100);
}


function drawRoundSlider(slider, startTime, endTime, useHandle){
	var timeVal, angle, handleSize, min, max;
	angle = -90;
	handleSize = "0";
	min = -12;
	max = 12;

	if (useHandle == true) handleSize = "+21";
	timeVal = startTime + ", " + endTime;

	slider.roundSlider({
		sliderType: "range",
		width:15,
		radius:105,
		svgMode : true,
		pathColor : "#f0f0f0", 
		borderWidth : 0,
		rangeColor:"#FFD700",
		min:min, max:max,
		step:0.5,
		value : timeVal,
		startAngle : angle,
		readOnly: !useHandle,
		handleSize : handleSize,
		showTooltip:false,
		lineCap:"round",
	});
}
