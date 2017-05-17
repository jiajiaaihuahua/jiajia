 var positions
$(document).ready(function() {
  var totWidth = 0;
  positions = new Array();
  var pwidth = $("#gallery").width();
  $("#downloadwrap").css('visibility', 'hidden');
  $(".slide").width(pwidth);
  $('#slides .slide').each(function(i) {
    positions[i] = totWidth;
    var f = pwidth - 980;
    totWidth += (980 + f);
    if (!$(this).width()) {
      return false;
    }
  });
  $('#slides').width(totWidth);
  var timer = null;
  function onSecondDelay(callback) {
    clearTimeout(timer);
    timer = setTimeout(callback, 100);
  }

  $('.switch ul li div').mouseover(function(e) {
    clear();
    var pos = $(this).parent().prevAll('.menuItem').length;
	$('.slide-tip').css({'background':'#e2f2fc'});
	$('.switch ul li:eq('+ pos +')').find(':first').css({'background':'#0099ff'});
    $('#slides').stop().animate({
      marginLeft: -positions[pos] + 'px'
    },
    450);
    e.preventDefault();
  }).mouseout(function(){
	  set();
  });
  
});

var auto;
var index = 1;
function set() { //自动切换
	auto = setInterval(function() {
    active();
    index++;
    if(index == $('.switch ul li').length){
  	  index = 0;
    }
  },6000);
};

$(document).ready(function() {

  window.active = function() {
	$('.slide-tip').css({'background':'#e2f2fc'});
	$('.switch ul li:eq('+ index +')').find(':first').css({'background':'#0099ff'});
    $('#slides').animate({
      marginLeft: -positions[index] + 'px'
    },
    450);
  };

  
  window.clear = function() { //清楚自动切换
    clearInterval(auto);
  };
  
  if ($("#storeimgs li").length > 1) {
    set();
  }
});