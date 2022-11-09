window.onload = function() {
    $.ajax({
        type : "GET",
        url : "../incloud/header.html",
        dataType : "html",
        success: function(header_result){
            $("header").html($(header_result).filter(".wrap"));
        }
    });
    //*********************** menu ***********************
    const uinavs = document.querySelectorAll('.wrap .menu .ui-nav');
    console.log(uinavs)
    for(let i = 0; i < uinavs.length; i++) {
        uinavs[i].addEventListener('click', act); //click -> act()실행
    }
    function act() {
        const menu = document.querySelector('.ui-menuContent');
        this.classList.toggle('open');
        menu.classList.toggle('open');
        // const menulis = document.querySelectorAll('.menu ul li');
        // for(let i = 0; i < menulis.length; i++) {
        //     menulis[i].addEventListener('click', function(){
        //         menu.classList.remove('open');
        //     });
        // }
    }
}