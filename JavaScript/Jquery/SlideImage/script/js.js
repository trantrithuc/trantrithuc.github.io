$(document).ready(function () {
	$('.slide img:not(:first)').hide();
	$('.slide img:first').addClass('current');
	$('.index-menu li:first').addClass('current').css('background-color','#fff');	
	var t = setInterval(switcher,1500);
	function switcher() {
		var $cur = $('img.current');
		var $next = $cur.next('img');
		var $index = $('.index-menu li.current');
		var $nindex =$index.next('li');
		if ($next.length == 0) {
			$next = $('.slide img:first');
			$nindex = $('.index-menu li:first');	
		}
			
		$cur.removeClass('current').fadeOut(1600);
		$index.removeClass('current').css('background-color','#374C83');
		$nindex.addClass('current').css('background-color','#fff');
		$next.addClass('current').fadeIn(1600);		
	}
	$('.next-btn').click(function(){
		var $next = $('img.current').next('img');
		var $nindex =$('.index-menu li.current').next('li');		
		$('img.current').removeClass('current').hide();
		$('.index-menu li.current').removeClass('current').css('background-color','#374C83');
		$nindex.addClass('current').css('background-color','#fff');
		$next.addClass('current').show(50);
		
	});
	$('.prev-btn').click(function(){
		var $prev = $('img.current').prev('img');
		var $nindex =$('.index-menu li.current').prev('li');
		$('.index-menu li.current').removeClass('current').css('background-color','#374C83');		
		$('img.current').removeClass('current').hide();
		$nindex.addClass('current').css('background-color','#fff');
		$prev.addClass('current').show(50);
		
	});
	$('.slide').hover(function(){
		clearInterval(t);
	},function() {
		t = setInterval(switcher,1500);
	});	
});
