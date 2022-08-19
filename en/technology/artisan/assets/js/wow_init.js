$(function($) {
	$('.jsWowDuration01').attr({'data-wow-duration': '0.1s',});
	$('.jsWowDuration02').attr({'data-wow-duration': '0.2s',});
	$('.jsWowDuration03').attr({'data-wow-duration': '0.3s',});
	$('.jsWowDuration04').attr({'data-wow-duration': '0.4s',});
	$('.jsWowDuration05').attr({'data-wow-duration': '0.5s',});
	$('.jsWowDelay01').attr({'data-wow-delay': '0.1s',});
	$('.jsWowDelay02').attr({'data-wow-delay': '0.2s',});
	$('.jsWowDelay03').attr({'data-wow-delay': '0.3s',});
	$('.jsWowDelay04').attr({'data-wow-delay': '0.4s',});
	$('.jsWowDelay05').attr({'data-wow-delay': '0.5s',});
	setTimeout(function(){new WOW().init();},1000);
});