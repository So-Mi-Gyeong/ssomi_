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

    //*********************** input script(inp_acco.html) ***********************
    const all = document.querySelector('#chkAll');
    var inp = document.getElementsByName('chk');
    var agreeBtn = document.querySelector('.continue-btn');
    var chknum = 0;

    //전체선택 외 버튼 리스너
    for (var i =0 ; i < inp.length; i++) {
        //inp을 클릭 할 때마다 숫자를 증감시켜 전체 체크가 되었는지 파악 후 '전체동의하기'버튼에 checked
        inp[i].addEventListener("click", function () {
            if (this.checked) {chknum++;} // this에 checked가 되면 chknum 증가
            else {chknum--;} // this에 checked가 안되면 chknum 감소
            if (chknum == inp.length) {all.checked = true} // chknum이 inp.length와 같으면 '전체 동의하기'에 checked
            else {all.checked = false} // chknum이 inp.length와 같지 않으면 '전체 동의하기'에 checked 해제
        });
    }

    //전체선택/해제
    function clickAll(){
        for(var i = 0, len = inp.length; i < len; i++){ 
        if(all.checked == true){ //'전체동의 버튼'에 checked = true 이면
            inp[i].checked = true; //하위 checkbox에 checked
            chknum = inp.length // chknum에 inp.length 입력
        }else{//'전체동의 버튼'에 checked = false 이면
            inp[i].checked = false; //하위 checkbox에 checked 해제
            chknum = 0 //chknum 초기화
        }
        } 
    } 
    all.addEventListener("click", clickAll);

    //동의하고계속하기
    function agreechk(){
        for(var i = 0; i < inp.length; i++){
        all.checked = true; //전체선택 버튼 checked
        inp[i].checked = true; // 하위 checkbox checked
        chknum = inp.length; //chknum에 inp.length 입력    
        }
    }  
    agreeBtn.addEventListener("click", agreechk);

    //*********************** acco script(inp_acco.html) ***********************
    const myAcco = {
        uiWrap: null,
        allInp: null,
        uiParents: null,
        uiChild: null,
        accoBtn: null,
        startBtn: null,
        btnNum: null,
        parent_clickNum: null,
  
        Init: function () {
          uiWrap = document.querySelectorAll('.terms')
          allInp = document.querySelectorAll('.terms input')
          accoBtn = document.querySelectorAll('.accoClick');
          uiParents = document.querySelectorAll('.ui-check-parent');
          uiChild = document.querySelectorAll('.ui-check-child');
          startBtn = document.querySelector('.termsStartBtn');
          btnNum = 0;
          parent_clickNum = 0;
          const _this = this;
  
          //accordian
          for (var i = 0; i < accoBtn.length; i++) {
            accoBtn[i].addEventListener('click', function () {
              this.classList.toggle('active');
            });
          }
          //uiParents : [대분류] {서비스 이용동의, 개인정보 동의}
          uiParents.forEach(function (uiParent, idx) {
            //약관에 접근하기 위한 변수 선언
            const el_wrap = uiParents[idx].closest('.terms');
            const el_parents = el_wrap.querySelectorAll('.ui-check-parent');
            const el_child = el_wrap.querySelectorAll('.ui-check-child');
  
            let child_clickNum = 0; //개별 약관 클릭한 수 체크
            /*
             * [대분류 약관] 컨트롤러
             */
            //.ui-check-parent 클릭시 ☆현재 메뉴 또눈 내부 변수가 어떻게 바뀔지 관련된 동작☆
            uiParent.addEventListener('click', function () {
              //대분류 및 소분류 클릭수 제어
              if (this.checked) { //대분류 선택시 
                parent_clickNum++; //대분류 클릭수 증가
                child_clickNum = el_child.length //전체 선택되었으니 자식 수 크기만큼 설정
              } else { //대분류 선택 해제시
                parent_clickNum--; //대분류 클릭수 감소
                child_clickNum = 0; //전체 선택 해제되었으니 자식 수 클릭수 초기화
              }
            });
            //.ui-check-parent 클릭 시 ☆다른 메뉴들이 어떻게 변화될 지☆
            uiParent.addEventListener('change', function () {
              //(재설정) 자식 버튼 동작
              el_child.forEach(function (child, idx) {
                if (el_parents[0].checked) { //대분류 선택 시
                  child.checked = true; //자식 선택 켜기
                } else { //대분류 선택 해제 시
                  child.checked = false; //자식 선택 끄기
                }
              });
              //(재설정) start btn 동작
              if (parent_clickNum === uiParents.length) { //대분류 동의가 다 눌려졌으면
                startBtn.disabled = false;
              } else {
                startBtn.disabled = true;
              }
            });
  
            /*
             * [소분류 약관] 컨트롤러
             */
            el_child.forEach(function (child) {
              child.addEventListener('click', function () {
                //클릭될 때마다 클릭 수 체크
                if (this.checked) {
                  child_clickNum++;
                } else {
                  child_clickNum--;
                }
              })
              //c자식 클릭에 따라 변화되는 다른 메뉴를 제어할때 쓰는 이벤트리스너
              child.addEventListener('change', function () {
                //(재설정) 대분류 설정
                if (child_clickNum === el_child.length) { //자식이 다 눌려지면
                  parent_clickNum++; //대분류 클릭 수 증가
                  el_parents[0].checked = true; //대분류 선택 켜기
                } else {
                  /*
                    - 삼항연산자
                    - A = c < d ? c : d
                    - 해석 : c 가 d보다 작으면 A는 c, 아니라면 A에 d값을 넣어라
                  */
                  /*
                   * 아래 쓰임
                   * 동작 설명 : 전체 선택되어있다가 자식값 하나라도 해제되면, start btn 버튼을 비활성화해라
                   *
                   * 코드 해석
                   * el_parents[0] 변수 의미 = 대분류 체크박스
                   *
                   * 대분류 체크 켜져있을 때, 자식이 클릭이 해제면 대분류 클릭 수를 하나 줄이고
                   *    ㄴ el_parents[0].checked == true(체크됐으면)면 (parent_clickNum)-1을 넣고
                   * 대분류 체크 꺼져있을 때, 자식이 클릭이 해제면 그냥 있던 값 그대로 쓰기
                   *    ㄴ false(체크 안 됐으면) parent_clickNum을 대입해라
                   */
                  parent_clickNum = el_parents[0].checked ? (parent_clickNum - 1) : parent_clickNum
                  el_parents[0].checked = false; //대분류 선택 끄기
                }
                //(재설정) start btn 동작
                if (parent_clickNum === uiParents.length) {
                  startBtn.disabled = false;
                } else {
                  startBtn.disabled = true;
                }
              })
            }); //--el_child 이벤트 리스너 정의 끝
          }); //uiParent 이벤트 리스너 정의 끝
        } //--Init 메소드 정의 끝
      } //--mcAcco 정의 끝
      myAcco.Init();

    //*********************** pagination(accessibility.html) ***********************
    $('.ui-pagination .inner-pagination .link-page').click(function(){
        $('.ui-pagination .inner-pagination .link-page').removeClass('active'); //active 초기화
        $(this).addClass('active'); //click 시 active 추가
    });

    //*********************** radio checkbox(gap.html) ***********************
    const inpChks = document.querySelectorAll('.inp');
    for(var i = 0; i < inpChks.length; i++){
        inpChks[i].addEventListener('click', inpClick); //클릭 시 inpClick() 실행
    }
    function inpClick() {
        //inpChks 를 inp변수에 담기
        for(const inp of inpChks){
            inp.classList.remove('active');//.inp 전체 초기화
        }
        this.classList.add('active');//클릭된 input만 active 추가
    }
    var uigapStyle = document.querySelector('.gapStyle');
    var gapInp01 = document.getElementById('gap01');
    var gapInp02 = document.getElementById('gap02');
    var gapInp03 = document.getElementById('gap03');
    //input 클릭 시 .gapStyle style 변경
    gapInp01.addEventListener('click', function(){
        uigapStyle.style.gap = '0px'; // gap 스타일 변경
        uigapStyle.style.transition = '.5s'; // transition 변경
    });
    gapInp02.addEventListener('click', function(){        
        uigapStyle.style.gap = '10px';
        uigapStyle.style.transition = '.5s';
    });
    gapInp03.addEventListener('click', function(){        
        uigapStyle.style.gap = '20px';
        uigapStyle.style.transition = '.5s';
    });
});
