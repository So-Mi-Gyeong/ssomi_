$(document).ready(function(){
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
