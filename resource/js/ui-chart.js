$(document).ready(function(){
      //*********************** chart(chart.html) ***********************
    //chart01
    var options = {
      animationEnabled: true,
      title: {
          text: "Mobile Phones Used For",                
          fontColor: "Peru"
      },	
      axisY: {
          tickThickness: 0,
          lineThickness: 0,
          valueFormatString: " ",
          includeZero: true,
          gridThickness: 0                    
      },
      axisX: {
          tickThickness: 0,
          lineThickness: 0,
          labelFontSize: 18,
          labelFontColor: "Peru"				
      },
      data: [{
          indexLabelFontSize: 26,
          toolTipContent: "<span style=\"color:#62C9C3\">{indexLabel}:</span> <span style=\"color:#CD853F\"><strong>{y}</strong></span>",
          indexLabelPlacement: "inside",
          indexLabelFontColor: "white",
          indexLabelFontWeight: 600,
          indexLabelFontFamily: "Verdana",
          color: "#62C9C3",
          type: "bar",
          dataPoints: [
              { y: 21, label: "21%", indexLabel: "Video" },
              { y: 25, label: "25%", indexLabel: "Dining" },
              { y: 33, label: "33%", indexLabel: "Entertainment" },
              { y: 36, label: "36%", indexLabel: "News" },
              { y: 42, label: "42%", indexLabel: "Music" },
              { y: 49, label: "49%", indexLabel: "Social Networking" },
              { y: 50, label: "50%", indexLabel: "Maps/ Search" },
              { y: 55, label: "55%", indexLabel: "Weather" },
              { y: 61, label: "61%", indexLabel: "Games" }
          ]
      }]
  };
  
  $("#chartContainer").CanvasJSChart(options);

  //chart02
  var replayBtn = document.querySelector('.replay');

  draw(80, '.pie-chart1', '#de586d');
  draw(50, '.pie-chart2', '#a2b9ee');
  draw(30, '.pie-chart3', '#f8d49b');

  function draw(max, classname, colorname){
    var i=1;
      var func1 = setInterval(function(){
      if(i<max){
        color1(i,classname,colorname);
        i++;
      } else{
        clearInterval(func1);
      }
      },10);
  }
  function color1(i, classname,colorname){
    $(classname).css({
        // "background":"conic-gradient(" + colorname +" 0%, #f2a490 "+ i +"%, #1c2135 0%, #000 100%)"
        "background":"conic-gradient(#f2a490 0%," + colorname + " " + i +"%, #1c2135 0%, #000 100%)"
    });
  }

  function replay(){
    draw(80, '.pie-chart1', '#de586d');
    draw(50, '.pie-chart2', '#a2b9ee');
    draw(30, '.pie-chart3', '#f8d49b');
  }

  replayBtn.addEventListener("click", replay);

  //counting01
  $(function(){
    var count0 = count1 = count2 = 0;

    timeCounter();

    function timeCounter(){
        id0 = setInterval(count0Fn, 12.738853);
        //12.738853=(10/785)*100
        function count0Fn() {
            count0++;
            if(count0 > 785){
                clearInterval(id0);
            }else{
                $(".number").eq(0).text(count0);
            }
        }

        id1 = setInterval(count1Fn, 10.13171226);
        //10.13171226(10/987)*1000
        function count1Fn() {
            count1++;
            if(count1 > 987){
                clearInterval(id1);
            }else{
                $(".number").eq(1).text(count1);
            }
        }

        id1 = setInterval(count2Fn, 28.57142857);
        //28.57142857=(10/350)*1000k
        function count2Fn() {
            count2++;
            if(count2 > 350){
                clearInterval(id2);
            }else{
                $(".number").eq(2).text(count2);
            }
        }
    }
  });
});
