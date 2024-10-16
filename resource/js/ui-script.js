document.addEventListener('DOMContentLoaded', function() {
    //*********************** UI-Tab(tab.html) *********************** 
    const myTab = () => {
      const tabBtn = document.querySelectorAll('.ui-tab-item');

      tabBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
          tabBtn.forEach((item) => item.setAttribute('aria-selected', 'false'));
          btn.setAttribute('aria-selected', 'true');
        });
      });
    }
    myTab();

    //*********************** acco script(inp_acco.html) ***********************
    //건강검진 정보 팝업
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
    }
    myAcco.Init();

    //*********************** input script(inp_acco.html) ***********************
    //나이키 팝업
    const agreeCheck = () => {
      const all = document.querySelector('#chkAll');

      if (!all) {
        return false
      }

      const inp = document.querySelectorAll('input[name="chk"]');
      const agreeBtn = document.querySelector('.continue-btn');
      let checkedCount  = 0;
  
      //전체선택 외 버튼 리스너
      inp.forEach(function(checkbox){
        checkbox.addEventListener("click", function(){
          checkedCount += this.checked ? 1 : -1;
          all.checked = (checkedCount === inp.length);
        });
      });
  
      //전체 선택/해제 기능
      function clickAll() {
        const isChecked  = all.checked; //'전체동의 버튼'의 상태를 저장
        inp.forEach(function(checkbox){
          checkbox.checked = isChecked; // 하위 checkbox에 checked 상태 반영
        });
        checkedCount  = isChecked ? inp.length : 0; // checkedCount  = checked 면 inp.length를 할당, 아니면
      }
      all.addEventListener("click", clickAll);
  
      //동의하고 계속하기 버튼 기능
      function agreechk() {
        inp.forEach(function(checkbox) {
            checkbox.checked = true;
        });
        checkedCount = inp.length;
        all.checked = true; //전체 선택 체크박스도 checked 상태로 변경
      }
      agreeBtn.addEventListener("click", agreechk);
      // if (agreeBtn) {agreeBtn.addEventListener("click", agreechk);} 
      // else {console.error('Element with class "continue-btn" not found');}
  
    }
    agreeCheck();

    //*********************** dropdown-catearea(dropdown.html) *********************** 
    //skt 메뉴 dropdown
    const dropdownMenu = () => {
      const menuButtons = document.querySelectorAll('.menu-cate-btn');
      const dropdownLists = {
        select: document.querySelector(".dropdown-menu-list[data-type='select']"),
        filter: document.querySelector(".dropdown-menu-list[data-type='filter']")
      }
      const activeColor = "#4737df";
      const defaultColor = "#000";

      menuButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const btnType = btn.dataset.type;

          //모든 드롭다운 리스트 숨기기
          Object.values(dropdownLists).forEach(list => list.style.display = 'none');

          //버튼 색상 초기화
          menuButtons.forEach(b => {
            b.querySelector('span').style.color = defaultColor;
          });

          //선택된 드롭다운 리스트 보여주기
          if (dropdownLists[btnType].dataset.on === 'true') {
            dropdownLists[btnType].dataset.on = 'false';
          } else {
            dropdownLists[btnType].style.display = 'block';
            dropdownLists[btnType].dataset.on = 'true';
            btn.querySelector('span').style.color = activeColor;
          }
          
        });
      });
    }
    dropdownMenu();

    //*********************** phone-dropdown(dropdown.html) ***********************  
    //핸드폰 번호 droppdown
    const phoneNumDropdown = () => {
      const dropdownBtn = document.querySelector('.dropdown-phonenum-btn');
      const dropdownList = document.querySelectorAll('.dropdown-phonenum-list');
      const phonenumItems = document.querySelectorAll('.phonenum-list-item');
    
      // 드롭다운 버튼 클릭 시 동작
      dropdownBtn.addEventListener('click', () => {
        const isVisible = dropdownList[0].style.display === 'block';
    
        dropdownList.forEach(list => {
          list.style.display = isVisible ? 'none' : 'block';
        });
    
        dropdownBtn.style.borderRadius = isVisible ? '.6rem' : '.6rem .6rem 0 0';
      });
    
      // 리스트 항목 클릭 시 동작
      phonenumItems.forEach(item => {
        item.addEventListener('click', () => {
          // 모든 리스트 항목의 배경색과 글자색 초기화
          phonenumItems.forEach(i => {
            i.style.backgroundColor = '#fff';
            const text = i.querySelector('.phonenum-list-txt');
            if (text) text.style.color = '#666';
          });
    
          // 클릭된 항목의 배경색과 글자색 변경
          item.style.backgroundColor = '#ddd';
          const text = item.querySelector('.phonenum-list-txt');
          if (text) text.style.color = '#4737df';
        });
      });
    }
    phoneNumDropdown();
});

$(document).ready(function(){
    //*********************** dropdown(dropdown.html) ***********************  
    //드롭다운 버튼 클릭 시 동작
    // $(".dropdown-phonenum-btn").click(function(){
    //   var isVisible = $(".dropdown-phonenum-list").is(":visible");//드롭다운 리스트가 현재 보이는지 확인

    //   if(isVisible){
    //     //리스트가 보일 때 : 리스트 숨기고 버튼의 border-radius 를 초기화
    //     $(".dropdown-phonenum-list").hide();
    //     $(this).css("border-radius", ".6rem");
    //   } else {
    //     //리스트가 숨겨져 있을 때 : 리스트 보이게 하고 버튼의 border-radius를 변경
    //     $(".dropdown-phonenum-list").show();
    //     $(this).css("border-radius", ".6rem .6rem 0 0");
    //   }
    // });

    // //리스트 항목 클릭 시 동작
    // $(".phonenum-list-item").click(function() {
    //   //모든 리스트 항목의 배경색과 글자색을 초기화
    //   $(".phonenum-list-item").css("background-color", "#fff");
    //   $(".phonenum-list-txt").css("color", "#666");

    //   //클릭된 항목의 배경색과 글자색을 변경
    //   $(this).css("background-color", "#ddd");
    //   $(this).find(".phonenum-list-txt").css("color", "#4737df");
    // });


    //*********************** pagination(accessibility.html) ***********************
    $('.ui-pagination .inner-pagination .link-page').click(function(){
        $('.ui-pagination .inner-pagination .link-page').removeClass('active'); //active 초기화
        $(this).addClass('active'); //click 시 active 추가
    });

    //*********************** radio checkbox(gap.html) ***********************

});

