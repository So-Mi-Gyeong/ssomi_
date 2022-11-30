$(document).ready(function () {
    /*============================================ study01 - menu(method) ============================================*/
    $('.study02-menu li').mouseenter(function(){
      $(this).children('.sub-menu').stop().slideDown();
    });
    $('.study02-menu li').mouseleave(function(){
        $(this).children('.sub-menu').stop().slideUp();
    });

    /*============================================ study02 - 키패드 ============================================*/
    var keyInsert = document.querySelectorAll('.keypad-circle i');
    var i = -1;
    var keyChecked = 0;
    
    
    //키패드 클릭 시 i태그 색상변경
    $('.security-keypad ul li').click(function(){
      //console.log($(this).find('button').data('key-number'));
      //i태그에 class 추가
      if (i < (keyInsert.length-1)){ 
          i++;
          $('.keypad-circle i').eq(i).addClass('active');
          return;
      }
    
      //색상이 전부 변경되면 class 한번에 빼기
      $('.keypad-circle i').removeClass('active');
      i=-1; //i 초기화

      //같은 예제
      // if (i >= (a.length-1)){
      //     return;
      // }
      // i++;
      // $('.keypad-circle i').eq(i).addClass('keyon');
      // console.log(i); 
    });

    //백스페이스 클릭시 class 하나씩 빼기
    $('.key-back').click(function(){
      $('.keypad-circle i').eq(i).removeClass('active');
      i--;
    });  


    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    // 배열 섞는 함수이며, 이 함수는 random() 호출할시에 arr 를 섞는다.
    //array = arr(random 함수에서 값을 받아옴) = 0,1,2,3,4,5,6,7,8,9
    var shuffleArray = function(array) {
      for (let i = 0; i < array.length; i++) {
          let j = Math.floor(Math.random() * (i + 1));
          // [array[i], array[j]] = [array[j], array[i]];
          const x = array[i];
          array[i] = array[j];
          array[j] = x;
      }
      //arr을 다 섞으면 array를 빠져나온다.
      return array;
    };
    // const shuffleArray = array => {
    // for (let i = 0; i < array.length; i++) {
    //     let j = Math.floor(Math.random() * (i + 1));
    //     // [array[i], array[j]] = [array[j], array[i]];
    //     const x = array[i];
    //     array[i] = array[j];
    //     array[j] = x;
    // }
    // return array;
    // };
    //섞인 arr 을 ul li에 뿌려주는 함수

    var random = function(){
      //arr = array
      shuffleArray(arr);
      //ul의 값을 비워준다.            
      $('.security-keypad ul').empty();
      var tmp = "";
      //받은 값을 뿌려준다.
      arr.forEach(function(i){
          tmp = "<li> <button type='button' data-key-number="+ i +">"+ i + "</button> </li>"
          //append = 받아온 값을 전부 뿌림 , text = 받아온 값을 마지막 하나만 뿌림(전에 값들을 삭제)
          $('.security-keypad ul').append(tmp);
      });
    }
    /*============================================ study02 - jquery1(프로필) ============================================*/
    $('.testimonial-pic img:first-child').addClass('active');
    $('.testimonial-pic img').click(function () {
      // $('.testimonial-pic img').removeClass('active');
      $(this).addClass('active');
      $(this).siblings().removeClass('active'); // siblings -> 누른 애의 형제들

      $('.testimonial .content').removeClass('active');
      $('#' + $(this).attr('data-alt')).addClass(
        'active') // #tab1 == $(this).attr('data-alt') -> # + tab1,2,3,4
    });

    /*============================================ study02 - jquery2(성인인증) ============================================*/
    // var num = parselnt($(.xx).val());
    // parselnt = 문자열을 정수로 변환시켜주는 함수. 소수인 경우에는 소숫점 이하를 버리고 정수만 반환.
    $('.login button').click(function () {
      var num = $('#id').val();

      //예외처리
      if (num == '') {
        alert('나이입력 하세욧')
      }

      //성인처리
      num = parseInt(num);
      if (num < 20) {
        alert('미성년이에욧')
      } else if (num >= 20) {
        alert('성인이에욧')
      } else {
        alert('자료형이 이상해요 지금!')
      }

      //?? - parseInt 를 쓰지 않아도 결과가 똑같이 나오는데 굳이 쓰는 이유는? 소숫점으로 인해?

      // $('.login button').click(function(){
      //     var num = $('#id').val();
      //     alert(typeof(num));
      //     var n = parselnt(num);

      //     if(num == '') {
      //         alert('나이를 입력하세요.')
      //     }else if(n < 20) {
      //         alert('미성년자입니다.')
      //     }else if(n >= 20){
      //         alert('성인입니다.')
      //     }else{
      //         alert('입력내용을 숫자로 넣으세요.')
      //     }
      // });
    });

    /*============================================ study02 - jquery3(별점) ============================================*/
    $('.stars .fa').click(function () {
      $(this).addClass('active');
      $(this).prevAll().addClass('active');
      $(this).nextAll().removeClass('active');

      var num = $(this).index()
      var starRate = num + 1
      //$('.print').text(starRate)

      if (starRate == 1) {
        $('.print').html('<img src="./resource/img/jquery/star-lv1.png">' + '별로에요')
      } else if (starRate == 2) {
        $('.print').html('<img src="./resource/img/jquery/star-lv2.png">' + '보통이에요')
      } else if (starRate == 3) {
        $('.print').html('<img src="../resource/img/jquery/star-lv3.png">' + '그냥 그래요')
      } else if (starRate == 4) {
        $('.print').html('<img src="../resource/img/jquery/star-lv4.png">' + '마음에 들어요')
      } else {
        $('.print').html('<img src="../resource/img/jquery/star-lv5.png">' + '아주 좋아요')
      }
    });

    //조부장님 스크립트
    // (function ($) {
    //   window.star = {};

    //   function aaa() {
    //     console.log(11111111);
    //   }

    //   aaa();

    //   window.star = {
    //     init: function (n) {
    //       var $this = $('.stars .fa').eq(n);
    //       $this.addClass('active')
    //       $this.prevAll().addClass('active')
    //       $this.nextAll().removeClass('active')

    //       var num = n;
    //       var starRate = num + 1;
    //       console.log(starRate === 3);
    //       //$('.print').text(starRate)

    //       if (starRate == 1) {
    //         $('.print').html('<img src="../image/jquery/star-lv1.png">' + '별로에요')
    //       } else if (starRate == 2) {
    //         $('.print').html('<img src="../image/jquery/star-lv2.png">' + '보통이에요')
    //       } else if (starRate == 3) {
    //         $('.print').html('<img src="../image/jquery/star-lv3.png">' + '그냥 그래요')
    //       } else if (starRate == 4) {
    //         $('.print').html('<img src="../image/jquery/star-lv4.png">' + '마음에 들어요')
    //       } else {
    //         $('.print').html('<img src="../image/jquery/star-lv5.png">' + '아주 좋아요')
    //       }


    //     },
    //     delete: function() {
          
    //     }
    //   }

    //   $('.stars .fa').click(function () {
    //     var n = $(this).index();
    //     console.log(n)
    //     window.star.init(n);
    //   });

    //   window.star.init(2);
    // })(jQuery);

    /*============================================ study02 - jquery4(클릭메뉴) ============================================*/
    //  test
    // $('.tabBtn li').click(function(){
    //     $(this).addClass('active')
    //     $(this).siblings().removeClass('active')

    //     var tab = $(this).attr('data-alt')
    //     $('.tabs div').removeClass('active')
    //     $('#' + tab).addClass('active')
    //     $('#' + tab).siblings().removeClass('active')
    // });

    $('.tabBtn li').click(function () {
      $(this).addClass('active');
      $(this).siblings().removeClass('active');

      var result = $(this).attr('data-alt');

      $('.tabs div').removeClass('active');
      $('#' + result).addClass('active');
    });

    /*============================================ study02 - jquery5(full screen menu) ============================================*/
    $('.navi li').mouseenter(function(){
      var changeImg = $(this).attr('data-image');

      $('.photo').css({
        'background-image' : 'url(' + changeImg + ')'
      });
    });
    $('.navi li').mouseleave(function(){
      $('.photo').css({
        'background-image' : ''
      });
    });

    /*============================================ study02 - jquery6(hover card) ============================================*/
    $('.size span, .color span').click(function(){
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
    });
    $('.like').click(function(){
      $(this).toggleClass('active');
    });

    /*============================================ study02 - jquery7(아코디언) ============================================*/
    $('.accotitle').click(function(){
      //title
      $(this).addClass('active');
      $(this).siblings('.accotitle').removeClass('active');

      //acco
      $(this).siblings('.desc').stop().slideUp();
      $(this).next().stop().slideDown();

      let dataImage = $(this).attr('data-image');
      $('.image img').attr('src', dataImage);
    });

    /*============================================ study02 - jquery8(뉴스레터 구독하기) ============================================*/
    $('.btn-open').click(function(){
      $('.modal, .overlay').addClass('active');
    });
    $('.btn-close, .overlay').click(function(){
      $('.modal, .overlay').removeClass('active');
    });

    /*============================================ study03 - link 이동 ============================================*/
    $('header a, .btn-gototop').click(function(e) {
      $.scrollTo(this.hash || 0, 900);
      e.prevenDefault();
    });

    /*============================================ study04 - video ============================================*/
    $('.trigger').click(function(){
      $(this).toggleClass('active');
      $('.modal-gnb').fadeToggle();
    });

    var bgm = document.getElementById('myAudio');
    bgm.volume = 0.2 //0 ~ 1

  });