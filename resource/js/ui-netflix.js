var slideBox = document.getElementsByClassName('slideBox');


  
// for
var str = '';
$.ajax({
    type:"GET",
    url:"https://api.themoviedb.org/3/trending/all/week?api_key=f1228d4db6602e21b94e0decb9cb6abf&language=en-US",
    data : '',
    dataType : "json",
    success: function(data) {
        console.table(data.results);

        data.results.forEach(function (data) {
           // console.log(data);
            //console.log(data.title + ' : ' + data.poster_path);
            str += '<li class="btnNet">';
            str += '<span><img src="https://image.tmdb.org/t/p/original/' + data.poster_path + '"/></span>';
            str += '<p class="title titleStyle">' + data.title + '</p>';
            str += '<p class="title">' + data.release_date + '</p>';
            str += '</li>';

        });
        document.querySelector('#insertHtml').innerHTML= str;

     
       //console.log(data.results.original_title + ' : ' + data.results.poster_path);
    }
    ,error: function(xhr, status, error) {
        alert(error);
    }
});

var moviestr = '';
$.ajax({
    type:"GET",
    url:"https://api.themoviedb.org/3/trending/movie/week?api_key=f1228d4db6602e21b94e0decb9cb6abf&language=en-US",
    data : '',
    dataType : "json",
    success: function(data) {
        console.table(data.results);

        data.results.forEach(function (data) {
           // console.log(data);
            //console.log(data.title + ' : ' + data.poster_path);
            moviestr += '<li class="btnNet">';
            moviestr += '<span><img src="https://image.tmdb.org/t/p/original/' + data.poster_path + '"/></span>';
            moviestr += '<p class="title titleStyle">' + data.title + '</p>';
            moviestr += '<p class="title">' + data.release_date + '</p>';
            moviestr += '</li>';

        });
        document.querySelector('#movie').innerHTML= moviestr;

     
       //console.log(data.results.original_title + ' : ' + data.results.poster_path);
    }
    ,error: function(xhr, status, error) {
        alert(error);
    }
});

var tvstr = '';
$.ajax({
    type:"GET",
    url:"https://api.themoviedb.org/3/trending/tv/week?api_key=f1228d4db6602e21b94e0decb9cb6abf&language=en-US",
    data : '',
    dataType : "json",
    success: function(data) {
        console.table(data.results);

        data.results.forEach(function (data) {
           // console.log(data);
            //console.log(data.title + ' : ' + data.poster_path);
            tvstr += '<li class="btnNet">';
            tvstr += '<span><img src="https://image.tmdb.org/t/p/original/' + data.poster_path + '"/></span>';
            tvstr += '<p class="title titleStyle">' + data.name + '</p>';
            tvstr += '<p class="title">' + data.first_air_date + '</p>';
            tvstr += '</li>';

        });
        document.querySelector('#tv').innerHTML= tvstr;

     
       //console.log(data.results.original_title + ' : ' + data.results.poster_path);
    }
    ,error: function(xhr, status, error) {
        alert(error);
    }
});

var personstr = '';
$.ajax({
    type:"GET",
    url:"https://api.themoviedb.org/3/trending/tv/week?api_key=f1228d4db6602e21b94e0decb9cb6abf&language=en-US",
    data : '',
    dataType : "json",
    success: function(data) {
        console.table(data.results);

        data.results.forEach(function (data) {
           // console.log(data);
            //console.log(data.title + ' : ' + data.poster_path);
            personstr += '<li class="btnNet">';
            personstr += '<span><img src="https://image.tmdb.org/t/p/original/' + data.poster_path + '"/></span>';
            personstr += '<p class="title titleStyle">' + data.name + '</p>';
            personstr += '<p class="title">' + data.first_air_date + '</p>';
            personstr += '</li>';

        });
        document.querySelector('#person').innerHTML= personstr;

     
       //console.log(data.results.original_title + ' : ' + data.results.poster_path);
    }
    ,error: function(xhr, status, error) {
        alert(error);
    }
});




// var n = 1;
// if(n <= 10){
//     console.log(n + 'nnn');
//     n++;
//     console.log(n + 'nnn');
// }



new ScrollBooster({
    viewport: document.querySelector(".aa"),
    content: document.querySelector("#insertHtml"),
    direction: "horizontal",
    scrollMode: "transform"
});
new ScrollBooster({
    viewport: document.querySelector(".bb"),
    content: document.querySelector("#movie"),
    direction: "horizontal",
    scrollMode: "transform"
});
new ScrollBooster({
    viewport: document.querySelector(".cc"),
    content: document.querySelector("#tv"),
    direction: "horizontal",
    scrollMode: "transform"
});
new ScrollBooster({
    viewport: document.querySelector(".dd"),
    content: document.querySelector("#person"),
    direction: "horizontal",
    scrollMode: "transform"
});
