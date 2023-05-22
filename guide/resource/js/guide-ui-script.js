$(document).ready(function(){

  const myTab = () => {
    const tabList = document.querySelectorAll('.defualt_tab_list');
    //const tabItem = document.querySelectorAll('.defualt_tab_item');


    //바닐라스크립트
    // for(var i = 0; i < tabItem.length; i++){
    //   tabItem[i].querySelector('.btn').addEventListener('click', function(e){
    //     e.preventDefault();
    //     for(var j = 0; j < tabItem.length; j++){
    //       tabItem[j].classList.remove('on');
    //     }
    //     this.parentNode.classList.add('on');
    //   });
    // }
 
    //forOf
    // for (const tab of tabItem) {
    //   tab.addEventListener('click', function(e){
    //     for(let tabClick of tabItem){
    //       tabClick.classList.remove('on');
    //     }
    //     this.classList.add('on');
    //   });
    // }

    //tabAct에 넣은 forOf
    for(const tabArea of tabList){

      tabArea.addEventListener('click', function(){
        let tabChild = this.children;//클릭한 ul의 자식요소

        for(const tabClick of tabChild){
          tabClick.addEventListener('click', function(){//클릭한 li
            let elePrent = this.parentElement;
            let silblingEle = elePrent.firstElementChild;
            let eleNext = this.nextElementSibling;
            let siblings = [];

            //let elePrev = this.previousElementSibling;

           for(const silbl of tabChild){
            siblings.push(silblingEle); //siblings에 첫번째 자식요소 push
            silblingEle = silblingEle.nextElementSibling; //다음 형제요소 찾기
           }

           this.classList.add('on');

          });   
        }

      });

    }


    // const tabAct = (e) => {

  
    //   for (const tabArea of tabItem){
    //     tabArea.addEventListener('click', function(e){
    //       if(this.classList.contains('on')){
    //         this.classList.remove('on');
    //       }else{
    //         this.classList.add('on');
    //       }
    //       for(let tabClick of tabItem){
    //         tabClick.classList.remove('on');
    //       }
    //       this.classList.add('on');
    //     });
    //   }
    // }

    // for (const tab of tabList) {
    //   tab.addEventListener('click', tabAct);
    // }
  }
  myTab();
});
