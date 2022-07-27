/*
 * local navigation position selector (for corporate.epson)
 * add "-current" class to current position
 * @requires jQuery
 */

$(function (){
  function selectCurrentLocalNav(){
    let pathlevel = location.pathname.split('/');
    if (pathlevel[pathlevel.length-1] == "" || pathlevel[pathlevel.length-1] == "index.html"){
      pathlevel = pathlevel.slice(0,pathlevel.length)
    }
    // 青帯の選択
    let lv3url = pathlevel.slice(0,4).join('/');
    if (pathlevel.length > 4){
      lv3url = lv3url + '/';
    }
    const lv3target = $('#localnav-list a[href="'+lv3url+'"]');
    if (lv3target){
      lv3target.addClass("-current");
      lv3target.attr("aria-expanded","true");
      $('#localnav-list a.-current+div').attr("aria-hidden",false);
    }
    //グレー帯の選択
    if (pathlevel.length > 4){
      let lv4url = pathlevel.slice(0,5).join('/');
      if (pathlevel.length > 5){
        lv4url = lv4url + '/';
      }
      const lv4target = $('#localnav-list a[href="'+lv4url+'"]');
      if (lv4target){
        lv4target.addClass("-current");
      }
    }
  }
  selectCurrentLocalNav();
});