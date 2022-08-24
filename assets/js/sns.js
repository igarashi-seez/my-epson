/*
 * sns settings(for corporate.epson)
 * - add 'share_xxxxxx' class to anchor tag then set href and onclick
 * @requires jQuery
 */

function initSNS(){
    let classlist = ['facebook','twitter','instagram','linkedin'];
    const hrefObj = {
        facebook:	'http://www.facebook.com/share.php?u={{url}}',
        twitter:	'http://twitter.com/share?text={{title}}&url={{url}}&via={{via}}',
        instagram: '',
        linkedin:	"http://www.linkedin.com/shareArticle?mini=true&url={{url}}",
        line:		'http://line.naver.jp/R/msg/text/?{{title}}%20{{url}}',
        mixi:		'http://mixi.jp/share.pl?u={{url}}&k=11264cfbb999736c622238fefa5894ab32905da7',
        mail:		'mailto:?subject={{title}}&;body={{url}}'
        };
    const onclickevent = {
        facebook:	'openWin(this.href, 470, 490);return false;',
        twitter:	'openWin(this.href, 570, 510);return false;',
        instagram: '',
        linkedin:	'openWin(this.href, 670, 530);return false;',
        mixi:		'',
        line:		'openWin(this.href, 670, 530);return false;'
    };
    const url	= location.href;
    let title = $("meta[property='og:title']").attr("content");
    if ( typeof title === "undefined" ) {
        title = $("title").html();
    }
    classlist.forEach(function(targetclass){
         let href = hrefObj[targetclass].replace("{{url}}", encodeURI(url));
         href = href.replace("{{title}}", encodeURI(title));
        $('.share_'+targetclass).attr("href",href);
		if (onclickevent[targetclass].length){
			$('.share_'+targetclass).attr("onclick",onclickevent[targetclass]);
		}
    });
}

/*
 * openWin
 */
function openWin(url, width, height, option, windowName ){
	if (!width) var width = window.innerWidth || document.documentElement.clientWidth;
	if (!height) var height = window.innerHeight || document.documentElement.clientHeight;
	if (!option) var option = 'menubar=no, titlebar=no, toolbar=no, status=no, scrollbars=yes, resizable=yes';
	if (!windowName) var windowName = 'newWindow';
	var x = ( screen.availWidth - width )/2;
	var y = ( screen.availHeight - height )/2;
	var o = option+', width='+width+', height='+height+', left='+x+', top='+y;
	var blockMessage = 'ポップアップがブロックされました。\nブラウザのポップアップブロックを解除してください。';
	if ($("html").attr("lang")=="en"){
		blockMessage = 'Pop-ups blocked. Allow pop-ups in your browser.';
	}
	var win = window.open( url, windowName, o );
	if ( win ) {
		win.focus();
	} else {
		alert( blockMessage );
	}
}

$(function(){
    initSNS();
});
