$(function(){
  //画像クリック
    $('.layoutPicture').click(function(){
        var imgSrc = $(this).children('img').attr('src');
        var largeImgSrc = imgSrc.replace(".", "_large.");
        $('#layoutPictureLarge').children('img').attr('src', largeImgSrc);

        $('#layoutPictureBack').fadeIn();
        $('body,html').css('overflow-y', 'hidden');
      
        //クリック
        var ImgAlt = $(this).children('img').attr('alt');
        if(!ImgAlt.length) return false;
		else {
			dataLayer.push({'event': 'gaEvent','eventCategory' : 'jump', 'eventAction' : 'technology_design_image', 'eventLabel' : ImgAlt, });
        }
        return;      

  });

  //拡大表示後クリック
  $('#layoutPictureBack, #layoutPictureLarge, .layoutPictureCloseBtn').click(function(){
        $('#layoutPictureBack').fadeOut();
        $('body,html').css('overflow-y', 'visible');
        $('#layoutPictureLarge').children('img').attr('src', '');
  });

});