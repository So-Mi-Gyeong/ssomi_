$(document).ready(function(){
  //*********************** textSlide(slide.html) *********************** 
  setInterval(function () {
    const slideTxt = document.querySelectorAll('.mask span');
    const show = document.querySelector('.mask span[data-show]');
    const next = show.nextElementSibling || document.querySelector('.mask span:first-child');
    const up = document.querySelector('.mask span[data-up]');
    
    if (up) {
        up.removeAttribute('data-up')
    }
    
    show.removeAttribute('data-show')
    show.setAttribute('data-up', '')
    
    next.setAttribute('data-show', '')
    }, 2000);

  //*********************** slidetest(slide.html) *********************** 
  // var slider = ('.slideTest_content'),
  //     imgs = $('.slideTest_content div'),
  //     sliderWidth = 0,
  //     windowWidth = $(window).width(),
  //     startImg,
  //     startPos,
  //     prev = $('#prev'),
  //     next = $('#next'),
  //     totalSlides = 3,
  //     clickTotal = 0;
      
  // for (var i = 0; i < imgs.length; i++) {
  //   sliderWidth += $(imgs[i]).outerWidth();
  // }

  // imgs.filter(':first').addClass('start');
      
  // startImg = $('.start').outerWidth();
  // startPos = -((sliderWidth * 2) - (windowWidth / 2) + (startImg / 2));

  // $(slider).css('width', sliderWidth * 4);

  // imgs.filter(':first').before(imgs.clone());
  // imgs.filter(':first').before(imgs.clone());
  // imgs.filter(':last').after(imgs.clone());

  // $(slider).css('left', startPos);

  // prev.click(function(e) {
  //   e.preventDefault();
  //   clickTotal--;
  //   $(slider).animate({
  //     left: '+=' + sliderWidth / totalSlides
  //   }, 500, function() {
  //     if (clickTotal == -totalSlides) {
  //       clickTotal = 0;
  //       $(slider).css('left', startPos);
  //     }
  //   });
  // });

  // next.click(function(e) {
  //   e.preventDefault();
  //   clickTotal++;
  //   $(slider).animate({
  //     left: '-=' + sliderWidth / totalSlides
  //   }, 500, function() {
  //     if (clickTotal == totalSlides) {
  //       clickTotal = 0;
  //       $(slider).css('left', startPos);
  //     }
  //   });
  // });

  //*********************** slide(slide.html) *********************** 
  (function () {
    const slideList = document.querySelector('.slide_list');  // Slide parent dom
    const slideContents = document.querySelectorAll('.slide_content');  // each slide dom
    const slideBtnNext = document.querySelector('.slide_btn_next'); // next button
    const slideBtnPrev = document.querySelector('.slide_btn_prev'); // prev button
    const pagination = document.querySelector('.slide_pagination');
    const slideLen = slideContents.length;  // slide length
    const slideWidth = 400; // slide width
    const slideSpeed = 300; // slide speed
    const startNum = 0; // initial slide index (0 ~ 4)
    
    slideList.style.width = slideWidth * (slideLen + 2) + "px";
    
    // Copy first and last slide
    let firstChild = slideList.firstElementChild;
    let lastChild = slideList.lastElementChild;
    let clonedFirst = firstChild.cloneNode(true);
    let clonedLast = lastChild.cloneNode(true);

    // Add copied Slides
    slideList.appendChild(clonedFirst);
    slideList.insertBefore(clonedLast, slideList.firstElementChild);

    // Add pagination dynamically
    let pageChild = '';
    for (var i = 0; i < slideLen; i++) {
      pageChild += '<li class="dot';
      pageChild += (i === startNum) ? ' dot_active' : '';
      pageChild += '" data-index="' + i + '"><a href="#"></a></li>';
    }
    pagination.innerHTML = pageChild;
    const pageDots = document.querySelectorAll('.dot'); // each dot from pagination

    slideList.style.transform = "translate3d(-" + (slideWidth * (startNum + 1)) + "px, 0px, 0px)";

    let curIndex = startNum; // current slide index (except copied slide)
    let curSlide = slideContents[curIndex]; // current slide dom
    curSlide.classList.add('slide_active');

    /** Next Button Event */
    slideBtnNext.addEventListener('click', function() {
      if (curIndex <= slideLen - 1) {
        slideList.style.transition = slideSpeed + "ms";
        slideList.style.transform = "translate3d(-" + (slideWidth * (curIndex + 2)) + "px, 0px, 0px)";
      }
      if (curIndex === slideLen - 1) {
        setTimeout(function() {
          slideList.style.transition = "0ms";
          slideList.style.transform = "translate3d(-" + slideWidth + "px, 0px, 0px)";
        }, slideSpeed);
        curIndex = -1;
      }
      curSlide.classList.remove('slide_active');
      pageDots[(curIndex === -1) ? slideLen - 1 : curIndex].classList.remove('dot_active');
      curSlide = slideContents[++curIndex];
      curSlide.classList.add('slide_active');
      pageDots[curIndex].classList.add('dot_active');
    });

    /** Prev Button Event */
    slideBtnPrev.addEventListener('click', function() {
      if (curIndex >= 0) {
        slideList.style.transition = slideSpeed + "ms";
        slideList.style.transform = "translate3d(-" + (slideWidth * curIndex) + "px, 0px, 0px)";
      }
      if (curIndex === 0) {
        setTimeout(function() {
          slideList.style.transition = "0ms";
          slideList.style.transform = "translate3d(-" + (slideWidth * slideLen) + "px, 0px, 0px)";
        }, slideSpeed);
        curIndex = slideLen;
      }
      curSlide.classList.remove('slide_active');
      pageDots[(curIndex === slideLen) ? 0 : curIndex].classList.remove('dot_active');
      curSlide = slideContents[--curIndex];
      curSlide.classList.add('slide_active');
      pageDots[curIndex].classList.add('dot_active');
    });

    /** Pagination Button Event */
    let curDot;
    Array.prototype.forEach.call(pageDots, function (dot, i) {
      dot.addEventListener('click', function (e) {
        e.preventDefault();
        curDot = document.querySelector('.dot_active');
        curDot.classList.remove('dot_active');
        
        curDot = this;
        this.classList.add('dot_active');

        curSlide.classList.remove('slide_active');
        curIndex = Number(this.getAttribute('data-index'));
        curSlide = slideContents[curIndex];
        curSlide.classList.add('slide_active');
        slideList.style.transition = slideSpeed + "ms";
        slideList.style.transform = "translate3d(-" + (slideWidth * (curIndex + 1)) + "px, 0px, 0px)";
      });
    });
  })();

  //*********************** slide(slide.html) *********************** 
  var i = 0; // 사진 인덱스를 저장할 변수
  $(".pre").click(function() { // img 크기만큼 왼쪽으로 이동
      if (i > 0) {
          i = i - 1;
          $(".imgSlide").stop().animate({
          "left": -100 * i + "%"
          }, "slow");
      }
  });
  $(".next").click(function() { // img 크기만큼 오른쪽으로 이동
      if (i < 2) {
          i = i + 1;
          $(".imgSlide").stop().animate({
          "left": -100 * i + "%"
          }, "slow");
      }
  });
});