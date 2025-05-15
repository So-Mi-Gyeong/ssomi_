
Chart.pluginService.register(horizonalLinePlugin);
Chart.elements.Rectangle.prototype.draw = function() {
	var ctx = this._chart.ctx;
	var vm = this._view;
	var left, right, top, bottom, signX, signY, borderSkipped, radius;
	var borderWidth = vm.borderWidth;
	// If radius is less than 0 or is large enough to cause drawing errors a max
	//      radius is imposed. If cornerRadius is not defined set it to 0.
	var cornerRadius = this._chart.config.options.cornerRadius;
	var fullCornerRadius = this._chart.config.options.fullCornerRadius;
	var stackedRounded = this._chart.config.options.stackedRounded;
	var typeOfChart = this._chart.config.type;
	// bar
	left = vm.x - vm.width / 2;
	right = vm.x + vm.width / 2;
	top = vm.y;
	bottom = vm.base;
	signX = 1;
	signY = bottom > top ? 1 : -1;
	borderSkipped = vm.borderSkipped || 'bottom';


	// Canvas doesn't allow us to stroke inside the width so we can
	// adjust the sizes to fit if we're setting a stroke on the line
	if (borderWidth) {
		// borderWidth shold be less than bar width and bar height.
		var barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
		borderWidth = borderWidth > barSize ? barSize : borderWidth;
		var halfStroke = borderWidth / 2;
		// Adjust borderWidth when bar top position is near vm.base(zero).
		var borderLeft = left + (borderSkipped !== 'left' ? halfStroke * signX : 0);
		var borderRight = right + (borderSkipped !== 'right' ? -halfStroke * signX : 0);
		var borderTop = top + (borderSkipped !== 'top' ? halfStroke * signY : 0);
		var borderBottom = bottom + (borderSkipped !== 'bottom' ? -halfStroke * signY : 0);
		// not become a vertical line?
		if (borderLeft !== borderRight) {
			top = borderTop;
			bottom = borderBottom;
		}
		// not become a horizontal line?
		if (borderTop !== borderBottom) {
			left = borderLeft;
			right = borderRight;
		}
	}

	ctx.beginPath();
	ctx.fillStyle = vm.backgroundColor;
	ctx.strokeStyle = vm.borderColor;
	ctx.lineWidth = borderWidth;

	// Corner points, from bottom-left to bottom-right clockwise
	// | 1 2 |
	// | 0 3 |
	var corners = [
	[left, bottom],
	[left, top],
	[right, top],
	[right, bottom]
	];

	// Find first (starting) corner with fallback to 'bottom'
	var borders = ['bottom', 'left', 'top', 'right'];
	var startCorner = borders.indexOf(borderSkipped, 0);
	if (startCorner === -1) {
		startCorner = 0;
	}

	function cornerAt(index) {
		return corners[(startCorner + index) % 4];
	}

	// Draw rectangle from 'startCorner'
	var corner = cornerAt(0);
	ctx.moveTo(corner[0], corner[1]);

	var nextCornerId, nextCorner, width, height, x, y;
	for (var i = 1; i < 4; i++) {
		corner = cornerAt(i);
		nextCornerId = i + 1;
		if (nextCornerId == 4) {
			nextCornerId = 0
		}

		nextCorner = cornerAt(nextCornerId);

		width = corners[2][0] - corners[1][0];
		height = corners[0][1] - corners[1][1];
		x = corners[1][0];
		y = corners[1][1];

		var radius = cornerRadius;
		// Fix radius being too large
		if (radius > Math.abs(height) / 2) {
			radius = Math.floor(Math.abs(height) / 2);
		}
		if (radius > Math.abs(width) / 2) {
			radius = Math.floor(Math.abs(width) / 2);
		}

		var x_tl, x_tr, y_tl, y_tr, x_bl, x_br, y_bl, y_br;
			// if (height < 0) {
			//   // Negative values in a standard bar chart
			//   x_tl = x;
			//   x_tr = x + width;
			//   y_tl = y + height;
			//   y_tr = y + height;s
			//   x_bl = x;
			//   x_br = x + width;
			//   y_bl = y;
			//   y_br = y;

			//   // Draw
			//   ctx.moveTo(x_bl + radius, y_bl);
			//   ctx.lineTo(x_br - radius, y_br);

			//   // bottom right
			//   ctx.quadraticCurveTo(x_br, y_br, x_br, y_br - radius);
			//   ctx.lineTo(x_tr, y_tr + radius);

			//   // top right
			//   fullCornerRadius ? ctx.quadraticCurveTo(x_tr, y_tr, x_tr - radius, y_tr) : ctx.lineTo(x_tr, y_tr, x_tr - radius, y_tr);
			//   ctx.lineTo(x_tl + radius, y_tl);

			//   // top left
			//   fullCornerRadius ? ctx.quadraticCurveTo(x_tl, y_tl, x_tl, y_tl + radius) : ctx.lineTo(x_tl, y_tl, x_tl, y_tl + radius);
			//   ctx.lineTo(x_bl, y_bl - radius);

			//   //  bottom left
			//   ctx.quadraticCurveTo(x_bl, y_bl, x_bl + radius, y_bl);
			// } else if (width < 0) {
			//   // Negative values in a horizontal bar chart
			//   x_tl = x + width;
			//   x_tr = x;
			//   y_tl = y;
			//   y_tr = y;
			//   x_bl = x + width;
			//   x_br = x;
			//   y_bl = y + height;
			//   y_br = y + height;

			//   // Draw
			//   ctx.moveTo(x_bl + radius, y_bl);
			//   ctx.lineTo(x_br - radius, y_br);

			//   //  Bottom right corner
			//   fullCornerRadius ? ctx.quadraticCurveTo(x_br, y_br, x_br, y_br - radius) : ctx.lineTo(x_br, y_br, x_br, y_br - radius);
			//   ctx.lineTo(x_tr, y_tr + radius);

			//   // top right Corner
			//   fullCornerRadius ? ctx.quadraticCurveTo(x_tr, y_tr, x_tr - radius, y_tr) : ctx.lineTo(x_tr, y_tr, x_tr - radius, y_tr);
			//   ctx.lineTo(x_tl + radius, y_tl);

			//   // top left corner
			//   ctx.quadraticCurveTo(x_tl, y_tl, x_tl, y_tl + radius);
			//   ctx.lineTo(x_bl, y_bl - radius);

			//   //  bttom left corner
			//   ctx.quadraticCurveTo(x_bl, y_bl, x_bl + radius, y_bl);
			// } else {
				var lastVisible = 0;
				for (var findLast = 0, findLastTo = this._chart.data.datasets.length; findLast < findLastTo; findLast++) {
					if (!this._chart.getDatasetMeta(findLast).hidden) {
						lastVisible = findLast;
					}
				}
				var rounded = this._datasetIndex === lastVisible;
				if (isFirstRound == true && this._index == 0  ) rounded = true;
				if (rounded) {
				//Positive Value
				ctx.moveTo(x + radius, y);
				ctx.lineTo(x + width - radius, y);
				 // top right
				 ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
				 ctx.lineTo(x + width, y + height - radius);
					// bottom right
					ctx.lineTo(x + width, y + height, x + width - radius, y + height);
					ctx.lineTo(x + radius, y + height);
					// bottom left
					ctx.lineTo(x, y + height, x, y + height - radius);
					ctx.lineTo(x, y + radius);
					// top left
					// if (fullCornerRadius || typeOfChart == 'bar')
					ctx.quadraticCurveTo(x, y, x + radius, y);
					// else
						// ctx.lineTo(x, y, x + radius, y);
					}else {
						ctx.moveTo(x, y);
						ctx.lineTo(x + width, y);
						ctx.lineTo(x + width, y + height);
						ctx.lineTo(x, y + height);
						ctx.lineTo(x, y);
					}
			// }
		}
		ctx.fill();
		if (borderWidth) {
			ctx.setLineDash([2,2]);
			ctx.stroke();
		}
	// if (isFirstRound == true) isFirstRound = false;
};



function drawRoundBar(ctx, dataArr, labelArr, selectIndex){
	isRoundRect = true;
	var selectIndex;
	var _mindata = getminticks2(dataArr);
	var _maxdata = getmaxticks2(dataArr);
	var _colorArr = [];
	var _labelArr = [];
	var stepsize = (dataArr.length > 2 ) ? 100 : 60;

	var _selectIdx = 0;
	if ( selectIndex == null || selectIndex == '' || selectIndex == 'undefined' ) {
		_selectIdx = dataArr.length;
	} else {
		_selectIdx = selectIndex;
	}

	for (var i = 0; i < dataArr.length; ++i) {
		if  ( i+1 == _selectIdx){
			_colorArr.push('rgba(255,215,0,0.6)');
			_labelArr.push('#000000');
		}else {
			_colorArr.push('rgba(215,215,215,0.3)');
			_labelArr.push('#999999');
		}
	}	


	var up = '../../img/report/icon-arrow-up.svg';
	var down = '../../img/report/icon-arrow-down.svg';
	var icon = '';

	if (dataArr[dataArr.length-1] > dataArr[dataArr.length-2]) {
		icon = up;
	} else if (dataArr[dataArr.length-1] < dataArr[dataArr.length-2]) {
		icon = down;
	}

	var barC = {
		type: 'bar',
		data: dataArr,
		barThickness : 30,
		backgroundColor : _colorArr,
		borderWidth: 0,
	}

	var lineC = {
		type: 'line',
		data: dataArr,
		fill: false,
		pointStyle: 'circle',
		lineTension: 0,
		borderWidth: 2,
		pointBackgroundColor: '#fff',
		pointBorderColor: 'rgba(255, 97, 45,1)',
		borderColor: 'rgba(255, 97, 45,1)',
		pointRadius: 3,
		pointHoverRadius: 3,
	}

	const myChart = new Chart(ctx, {
		type: 'line',
		plugins: [{
			afterDraw: chart => {
				var ctx = chart.chart.ctx;
				var xAxis = chart.scales['x-axis-0'];
				var yAxis = chart.scales['y-axis-0'];
				ctx.save();
				ctx.textAlign = 'center';
				chart.data.labels.forEach((l, i) => {
					if (i+1 == _selectIdx) {
						ctx.font = 'Bold 12px NotoSans';
					} else {
						ctx.font = '12px NotoSans';
					}
					var value = chart.data.datasets[0].data[i];
					var x = xAxis.getPixelForValue(l);        
					ctx.fillStyle = _labelArr[i];
					ctx.fillText(l, x, yAxis.bottom + 16);
				});
				ctx.restore();
			}
		}],
		data: {
			labels:labelArr,
			datasets: [lineC, barC],
		}, 
		options: {
			cornerRadius: 10, 
			fullCornerRadius: true, 
			stackedRounded: true,
			elements: {
				point: {
					radius: 10,
					hoverRadius: 10,
					pointStyle: 'rectRounded',
				}
			},			  
			maintainAspectRatio: false,
			legend : {
				position :'bottom',
			},
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
						fontSize: 12,
						stepSize: 1,
						beginAtZero: false,
						padding: 8,
							fontColor: '#fff',//_labelArr,
						},
						
					}],
					yAxes: [{
						stacked: true, 
						gridLines: {
							display: true,
							lineWidth: 1,
							color: '#e5e5e5',
							borderDash: [2,2],
							drawBorder: false,
						},
						ticks: {
							beginAtZero: true,
							min:_mindata,
							max:_maxdata,
							stepSize: stepsize,
							display: false,						
						}
					}]
				},
				tooltips : {enabled : false},
				hover: {animationDuration: 0, mode:null},
				events: [],
				animation: {
					// duration: 1,
					onComplete: function () {
						var bg = '../../img/common/chart.svg';
						var chartInstance = this.chart,
						ctx = chartInstance.ctx;
						ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
						ctx.textAlign = 'center';
						ctx.textBaseline = 'bottom';

						var mr = 7;
						if ( icon == '') mr = 0;

						this.data.datasets.forEach(function (dataset, i) {
							var meta = chartInstance.controller.getDatasetMeta(i);
							meta.data.forEach(function (bar, index) {
								var data = dataset.data[index];	
								if ( index+1 == dataArr.length) {
									let bgImg = new Image();
									bgImg.src = bg;
									bgImg.onload = () => {
										ctx.drawImage(bgImg, bar._model.x-30, bar._model.y - 40, 60, 34);
										ctx.fillStyle ='#ffffff'; 
										ctx.fillText(data + '점', bar._model.x - mr, bar._model.y - 18);

										if ( icon != '') {
											let iconImg = new Image();
											iconImg.src = icon;
											iconImg.onload = () => {
												ctx.drawImage(iconImg, bar._model.x+13, bar._model.y - 28, 10, 8);
											}
										}

									}
								} else {
									ctx.fillStyle = '#8d8d8d';	
									ctx.fillText(data + '점', bar._model.x, bar._model.y - 10);
								}
							});
						});
					}
				},
			}
		});
}
function drawRoundBar2(ctx, dataArr, labelArr, selectIndex){
	isRoundRect = true;
	console.log(hiddenH);
	isFirstRound = true;
	var allData = dataArr[0].concat(dataArr[1]);
	var selectIndex;
	var _mindata = getminticks2(allData);
	var _maxdata = getmaxticks2(allData) + 100;
	var _colorArr = [];
	var _labelArr = [];

	var _selectIdx = 0;
	if ( selectIndex == null || selectIndex == '' || selectIndex == 'undefined' ) {
		_selectIdx = dataArr[0].length;
	} else {
		_selectIdx = selectIndex;
	}

	// if ( ) hiddenH = -20;

	var __dataSecond = [];
	for (var i = 0; i < dataArr[0].length; ++i) {
		if  ( i+1 == _selectIdx){
			_colorArr.push('rgba(255,215,0,0.6)');
			_labelArr.push('#000000');
		}else {
			_colorArr.push('rgba(215,215,215,0.3)');
			_labelArr.push('#999999');
		}
		__dataSecond.push(dataArr[1][i] - dataArr[0][i]);
	}	

	var up = '../../img/report/icon-arrow-up.svg';
	var down = '../../img/report/icon-arrow-down.svg';
	var icon = '';
	const myChart = new Chart(ctx, {
		type: 'bar',
		plugins: [{
			afterDraw: chart => {
				var ctx = chart.chart.ctx;
				var xAxis = chart.scales['x-axis-0'];
				var yAxis = chart.scales['y-axis-0'];
				ctx.save();
				ctx.textAlign = 'center';
				chart.data.labels.forEach((l, i) => {
					if (i+1 == _selectIdx) {
						ctx.font = 'Bold 12px NotoSans';
					} else {
						ctx.font = '12px NotoSans';
					}
					var value = chart.data.datasets[0].data[i];
					var x = xAxis.getPixelForValue(l);        
					ctx.fillStyle = _labelArr[i];
					ctx.fillText(l, x, yAxis.bottom + 16);
				});
				ctx.restore();
			}
		}],
		data: {
			labels:labelArr,
			datasets: [{
				label : '',
				type:'line',
				data:dataArr[0],
				fill: false,
				pointStyle: 'circle',
				lineTension: 0,
				borderWidth: 2,
				pointBackgroundColor: '#fff',
				pointBorderColor: '#ff612d',
				borderColor: '#ff612d',
				pointRadius: 3,
				pointHoverRadius: 3,
			},{
				data : dataArr[0],
				label : '',
				backgroundColor :_colorArr,
				barThickness : 30,
			},{
				data:__dataSecond,
				label : '',
				backgroundColor:'rgba(255,255,255,0)',
				borderColor:'rgba(18,18,18,0.3)',
				borderDash:[2,2],
				borderWidth:1,
				barThickness : 30,
			}],
		}, 
		options: {
			cornerRadius: 10, 
			fullCornerRadius: true, 
			stackedRounded: true,
			elements: {
				point: {
					radius: 10,
					hoverRadius: 10,
					pointStyle: 'rectRounded',
				}
			},
			maintainAspectRatio: false,
			legend : {
					// display:false,
					// padding: 160,
					position :'bottom',
				},
				layout: {
					padding: {
						top: 50,
						bottom:hiddenH
					}},
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
								fontSize: 12,
								stepSize: 1,
								beginAtZero: false,
								padding: 8,
						fontColor: '#fff',//_labelArr,
					},
					
				}],
				yAxes: [{
					stacked: true,
					gridLines: {
						display: true,
						lineWidth: 1,
						color: '#e5e5e5',
						borderDash: [2,2],
						drawBorder: false,
					},
					ticks: {
						beginAtZero: true,
						min:_mindata,
						max:_maxdata,
						stepSize: 100,
						display: false,						
					}
				}]
			},
			tooltips : {enabled : false},
			hover: {animationDuration: 0, mode:null},
			events: [],
			animation: {
				// duration: 1,
				onComplete: function () {
					var bg = '../../img/common/chart.svg';
					var chartInstance = this.chart,
					ctx = chartInstance.ctx;
					ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
					ctx.textAlign = 'center';
					ctx.textBaseline = 'bottom';

					var mr = 7;
					if ( icon == '') mr = 0;

					this.data.datasets.forEach(function (dataset, i) {
						var meta = chartInstance.controller.getDatasetMeta(i);
						meta.data.forEach(function (bar, index) {
							var data = dataset.data[index];	
							if (index >= 1) {
								if (dataset.data[index] > dataset.data[index-1]) {
									icon = up;
								} else if (dataset.data[index] < dataset.data[index-1]) {
									icon = down;
								}
							}
							if ( index+1 == _selectIdx) {
								if (data != 0) {
									let bgImg = new Image();
									bgImg.src = bg;
									bgImg.onload = () => {
										ctx.drawImage(bgImg, bar._model.x-30, bar._model.y - 40, 60, 34);
										ctx.fillStyle ='#ffffff'; 
										ctx.fillText(data + '점', bar._model.x - mr, bar._model.y - 18);
									}
								}
							} else {
								ctx.fillStyle = '#8d8d8d';	
								if (data == false ) {
									ctx.fillText('',0,0);
								}	else if (dataset.data[index] =! dataArr[0][index]) {
									ctx.fillText(dataArr[1][index] + '점', bar._model.x - mr-10, bar._model.y -10);
									if ( icon != '') {
										let iconImg = new Image();
										iconImg.src = icon;
										iconImg.onload = () => {
											ctx.drawImage(iconImg, bar._model.x+9, bar._model.y -21, 10, 8);
										}
									}
								} else {
									ctx.fillText(data + '점', bar._model.x - mr-43, bar._model.y +25);
									if ( icon != '') {
										let iconImg = new Image();
										iconImg.src = icon;
										iconImg.onload = () => {
											ctx.drawImage(iconImg, bar._model.x-25, bar._model.y +13, 10, 8);
										}
									}
								}
							}
						});
					});
				}
			},
		}
	});
}