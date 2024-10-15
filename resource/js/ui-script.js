$(document).ready(function(){
    //*********************** UI-Tab(tab.html) *********************** 
    const tabBtn = document.querySelectorAll('.ui-tab-item');

    tabBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        tabBtn.forEach((item) => item.setAttribute('aria-selected', 'false'));
        btn.setAttribute('aria-selected', 'true');
      });
    });

    //*********************** dropdown-catearea(dropdown.html) *********************** 
    const listSelect = $(".dropdown-menu-list[data-type='select']"); 
    const listFilter = $(".dropdown-menu-list[data-type='filter']"); 

    //공통 색상 클래스 정의
    const activeColor = "#4737df";
    const defaultColor = "#000";

    //색상 적용 함수
    function updateColors(activeType) {
      $(".menu-cate-btn").each(function() {
        const btnType = $(this).data("type");
        const color = btnType === activeType ? activeColor : defaultColor; //'btnType'과 'activeType'이 같으면 'color' 변수에 'activeColr' 그렇지 않으면 'defaultColor' 
        $(this).children("span").css("color", color);
      });
    }

    // 메뉴 버튼 클릭 이벤트
    $(".menu-cate-btn").click(function() {
      const type = $(this).data("type");
      const isSelectType = type === 'select';

      // 상태에 따라 목록 토글 및 색상 업데이트
      if(isSelectType) {
        const isVisible = listSelect.is(":visible");
        listSelect.toggle(!isVisible);   
        listFilter.hide();
      } else {
        const isVisible = listFilter.is(":visible");
        listFilter.toggle(!isVisible);
        listSelect.hide();
      }

      //색상 업데이트
      updateColors(type);
    });

    //*********************** dropdown(dropdown.html) ***********************  
    //드롭다운 버튼 클릭 시 동작
    $(".dropdown-phonenum-btn").click(function(){
      var isVisible = $(".dropdown-phonenum-list").is(":visible");//드롭다운 리스트가 현재 보이는지 확인

      if(isVisible){
        //리스트가 보일 때 : 리스트 숨기고 버튼의 border-radius 를 초기화
        $(".dropdown-phonenum-list").hide();
        $(this).css("border-radius", ".6rem");
      } else {
        //리스트가 숨겨져 있을 때 : 리스트 보이게 하고 버튼의 border-radius를 변경
        $(".dropdown-phonenum-list").show();
        $(this).css("border-radius", ".6rem .6rem 0 0");
      }
    });

    //리스트 항목 클릭 시 동작
    $(".phonenum-list-item").click(function() {
      //모든 리스트 항목의 배경색과 글자색을 초기화
      $(".phonenum-list-item").css("background-color", "#fff");
      $(".phonenum-list-txt").css("color", "#666");

      //클릭된 항목의 배경색과 글자색을 변경
      $(this).css("background-color", "#ddd");
      $(this).find(".phonenum-list-txt").css("color", "#4737df");
    });
    
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

});
