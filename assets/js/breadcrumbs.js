/*
 * breadcrumbs generator (for corporate.epson)
 * - insert '<div class="breadcrumbs-list"></div>' in the place of breadcrumbs.
 * - add "sitemap-link" class to include the sitemap link.
 * @requires jQuery
 * @example
 * <div class="breadcrumbs-list sitemap-link">
 *   <div class="inner">
 *     <p class="link"><a href="/ja/sitemap.html#sustainability">サステナビリティサイトマップ</a></p>
 *     <ol>
 *       <li><a href="/ja/">ホーム</a></li>
 *       <li><a href="/ja/sustainability/">サステナビリティ</a></li>
 *       <li>環境</li>
 *     </ol>
 *   </div>
 * </div>
 * <script type="application/ld+json">
 * {"@context": "https://schema.org","@type": "BreadcrumbList","itemListElement": [
 * {"@type": "ListItem","position": 1,"name": "ホーム","item": "https://corporate.epson/ja/"},
 * {"@type": "ListItem","position": 2,"name": "サステナビリティ","item": "https://corporate.epson/ja/sustainability/"},
 * {"@type": "ListItem","position": 3,"name": "環境","item": "https://corporate.epson/ja/sustainability/environment/"}
 * ]}
 * </script>
 */

$(function(){
  const breadcrumbs_hometitle = {
    ja: 'ホーム',
    en: 'Home',
    template: 'ホーム'
  };
  const sitemap_title = {
    ja: 'サイトマップ',
    en: ' Sitemap',
    template: 'サイトマップ'
  };
  const TITLEDELIMIT = " | ";

  /**
   * generate breadcrumbs with ajax recursive call
   */
  function generateBreadcrumbs() {
    const pathlevel = location.pathname.split('/');
    const titleparts = $('title').text().split(TITLEDELIMIT);
    let targetPath = location.pathname;
    let categoryname = '';
    let json_ld = "";

    if (titleparts.length >= 2) {
        categoryname = titleparts[titleparts.length - 2];
    }
    $(".breadcrumbs-list").append('<div class="inner"></div>');
    $(".breadcrumbs-list.sitemap-link div").append('<p class="link"><a href="/' + pathlevel[1] + "/sitemap.html#" + pathlevel[2] + '">' + categoryname + sitemap_title[pathlevel[1]]+"</a></p>");
    $(".breadcrumbs-list.sub-sitemap-link div").append('<p class="link"><a href="/' + pathlevel.slice(0,6).join('/') + '/sitemap/">' + titleparts[titleparts.length-1] + sitemap_title[pathlevel[1]]+"</a></p>");
    $(".breadcrumbs-list div").append('<ol></ol>');

    // パンくずを下から生成
    if (pathlevel.length == 2) {
      //トップページ
      $(".breadcrumbs-list div ol").append("<li>" + breadcrumbs_hometitle[pathlevel[1]] + "</li>");
      addJsonLd(makeJsonLdString(1,breadcrumbs_hometitle[pathlevel[1]],targetPath,true));
    } else {
      // カレントページを登録
      $(".breadcrumbs-list div ol").append("<li>" + titleparts[0] + "</li>");
      json_ld = makeJsonLdString(pathlevel.length-1, titleparts[0],location.pathname,true);
      // 上の階層のパス名を生成して上階層のパンくず生成呼び出し
      var isindex = targetPath.indexOf("index.html");
      if (isindex >= 0) {
        targetPath = targetPath.substring(0, isindex);
      }
      var pos = targetPath.lastIndexOf("/");
      if (pos == targetPath.length - 1) {
        targetPath = targetPath.substring(0, pos);
        pos = targetPath.lastIndexOf("/");
      }
      targetPath = targetPath.substring(0, pos);
      addBreadCrumbLevel(targetPath, json_ld);
    }
  }
  /**
   * add 1 level breadcrumbs with ajax (recursive) 
   * @param {string} targetPath - the page analyze and add breadcrumb
   * @param {*} json_ld - json-ld string
   */
  function addBreadCrumbLevel(targetPath,json_ld) {
    const pathlevel = targetPath.split('/');
    const targetUrl = location.protocol + "//" + location.host + targetPath;
    if (pathlevel.length > 2) {// 最上位階層でない場合
      $.ajax(targetUrl, {
      type: "get",
      dataType: "html",
      })
      .done(function (data) {
        var title = data.match(/<title>(.*)<\/title>/)[1].split(TITLEDELIMIT)[0].trim();
        $(".breadcrumbs-list div ol").prepend('<li><a href="'+targetPath+'/">'+title+'</a></li>');
        json_ld = makeJsonLdString(pathlevel.length, title, targetUrl, false) + json_ld;
        var pos = targetPath.lastIndexOf("/");
        targetPath = targetPath.substring(0, pos);
        addBreadCrumbLevel(targetPath,json_ld);
      })
      .fail(function () {
        var pos = targetPath.lastIndexOf("/");
        targetPath = targetPath.substring(0, pos);
        addBreadCrumbLevel(targetPath,json_ld);
      });
    } else {
      //トップページ
      $(".breadcrumbs-list div ol").prepend('<li><a href="'+targetPath+'/">'+breadcrumbs_hometitle[pathlevel[1]] + '</li>');
      json_ld = makeJsonLdString(1, breadcrumbs_hometitle[pathlevel[1]],targetUrl,false) + json_ld;
      addJsonLd(json_ld);
    }
  }
  /**
   * add json-ld to the page(after first breadcrumbs)
   * @param {string} json_ld 
   */
  function addJsonLd(json_ld){
    const json_ld_begin = '<script type="application/ld+json">\n{"@context": "https://schema.org","@type": "BreadcrumbList","itemListElement": [\n';
    const json_ld_end = ']}\n</script>';
    $(".breadcrumbs-list").first().after(json_ld_begin+json_ld+json_ld_end);
  }
  /**
   * make json-ld element string
   * @param {number} position 
   * @param {string} name 
   * @param {string} item 
   * @param {boolean} last 
   * @returns {string} element string
   */
  function makeJsonLdString(position,name,item,last){
    let jsontext = '{"@type":"ListItem","position":'+position+',"name":"'+name+'","item": "'+item+'"}';
    if (!last){
      jsontext = jsontext + ',';
    }
    return jsontext + '\n';
  }

  generateBreadcrumbs();
});