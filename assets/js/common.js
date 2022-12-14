;(function($) {
  'use strict';


  /* イージング
  ---------------------------------------------------- */
  jQuery.extend( jQuery.easing, {
    easeOutExpo: function (x, t, b, c, d) {
      return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    }
  });


  /* ヘッダー追従
  ---------------------------------------------------- */
  $(function() {
    const fixedClass = '-fixed-header';
    const isScrollClass = '-is-scroll';

    $(window).on('load scroll resize', function(e) {
      if($(this).scrollTop() > 0) {
        $('html').addClass(isScrollClass);
      } else {
        $('html').removeClass(isScrollClass);
      }
      if($(this).scrollTop() > 40) {
        $('html').addClass(fixedClass);
      } else {
        $('html').removeClass(fixedClass);
      }
    });
  });

  $(function(){
    ////////////from index modal links PC&SP//
    if(window.location.pathname == '/ja/'){
      $('#purpose-link_m .inner .contents-area.target-area .inner .target-btns a').click(function(){
        $(this).attr('href');
        var curLinkPC = $(this).attr('href');
        location.replace(curLinkPC);
        event.stopPropagation();
      });
      $('#drawer-purpose-link-menu .contents-area.target-area .inner a').click(function(){
        $(this).attr('href');
        var curLinkSP = $(this).attr('href');
        location.replace(curLinkSP);
        event.stopPropagation();
      });
    };
    ////////////from index links to open accordion on another page//
    if(window.location.href.indexOf('?loc=epson') > -1){
      $('#mainAcc01 .head').attr('aria-expanded', 'true');
      $('#mainAcc01 #accordion1').attr('aria-hidden', 'false').css('display', 'block');
      $('#mainAcc01 #accordion1 .accdn-box-lvl2 .head').attr('aria-expanded', 'false');
    };
    if(window.location.href.indexOf('?loc=collaborate') > -1){
      $('#mainAcc02 .head').attr('aria-expanded', 'true');
      $('#mainAcc02 #accordion2').attr('aria-hidden', 'false').css('display', 'block');
      $('#mainAcc02 #accordion2 .accdn-box-lvl2 .head').attr('aria-expanded', 'false');
    };
    if(window.location.href.indexOf('?loc=work') > -1){
      $('#mainAcc03 .head').attr('aria-expanded', 'true');
      $('#mainAcc03 #accordion3').attr('aria-hidden', 'false').css('display', 'block');
      $('#mainAcc03 #accordion3 .accdn-box-lvl2 .head').attr('aria-expanded', 'false');
    };
    if(window.location.href.indexOf('?loc=buy') > -1){
      $('#mainAcc04 .head').attr('aria-expanded', 'true');
      $('#mainAcc04 #accordion4').attr('aria-hidden', 'false').css('display', 'block');
      $('#mainAcc04 #accordion4 .accdn-box-lvl2 .head').attr('aria-expanded', 'false');
    };
    ////////////purpose link button and modal PC//
    $('.purpose-link_btn').click(function(){
      event.preventDefault();
      $('html').addClass('-header-search');
      $('#purpose-link_m').fadeIn(300);
    });
    $('#purpose-link_m') > $('.closeBtn').click(function(){
      $('html').removeClass('-header-search');
      $('#purpose-link_m').fadeOut(300);
    });
    ////////////purpose link modal links PC//
    $('#purpose-link_m .inner .contents-area.target-area .inner .target-btns a').click(function(){
      event.preventDefault();
      $('html').removeClass('-header-search');
      $('#purpose-link_m').fadeOut(300);
      var curDatid = $(this).attr('data-id');
      var curDatTar = $(this).attr('data-target');
      var curUrlPC = window.location.pathname;
      $('#' + curDatid + ' .head').attr('aria-expanded', 'true');
      $('#' + curDatid + ' #' + curDatTar).attr('aria-hidden', 'false').css('display', 'block');
      $('#' + curDatid + ' .accdn-box-lvl2 .head').attr('aria-expanded', 'false');
      if(window.location.href.indexOf('#' || '?loc=')> -1){
        var newCurUrlPC = window.location.pathname;
        window.location.replace(newCurUrlPC + '#' + curDatid);
      }else{
        window.location.replace(curUrlPC + '#' + curDatid);
      };
    });
    ////////////purpose link modal links SP//
    $('#drawer-purpose-link-menu .contents-area.target-area .inner a').click(function(){
      event.preventDefault();
      $('#drawer-purpose-link-menu').css('transform', 'translateY(0)').attr('aria-hidden', 'true');
      $('html').removeClass('-drawer-open');
      var curDatid = $(this).attr('data-id');
      var curDatTar = $(this).attr('data-target');
      var curUrlSP = window.location.pathname;
      $('#' + curDatid + ' .head').attr('aria-expanded', 'true');
      $('#' + curDatid + ' #' + curDatTar).attr('aria-hidden', 'false').css('display', 'block');
      $('#' + curDatid + ' .accdn-box-lvl2 .head').attr('aria-expanded', 'false').css('display', 'block');
      if(window.location.href.indexOf('#' || '?loc=')> -1){
        var newCurUrlSP = window.location.pathname;
        window.location.replace(newCurUrlSP + '#' + curDatid);
      }else{
        window.location.replace(curUrlSP + '#' + curDatid);
      };
    });
    ////////////for plnBtn glitch//
    $('.purplinkBtns').click(function(){
      $('#header .inner .menu-btns-sp .plBtn').css('right', '0');
    });
    $('#header .inner .menu-btns-sp .plBtn').click(function(){
      $(this).css('right', '-60px');
    });
  });
  
  /* slick initialize
  ---------------------------------------------------- */
  $(function() {
    $('div.carousel-card-list').slick({
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 1000,
          settings: "unslick",
        },
      ]
    });
    $('div.carousel-photo').slick({
      infinite: true,
      autoplay:true,
      autoplaySpeed:5000,
      slidesToShow: 1,
      slidesToScroll: 1,
    });
    $(window).on('resize orientationchange', function () {
      $('div.carousel-card-list').slick('resize');
    });
  });


  /* メガメニュー
  ---------------------------------------------------- */
  const MegaMenu = function() {
    this.delay = 150;
    this.id = null;
    this.searchClassName = '-header-search';
  };

  MegaMenu.prototype.init = function() {
    this.elements();
    this.events();
  };

  MegaMenu.prototype.elements = function() {
    this.gnav = $('div.header-menu-pc').find('nav.global-nav');
    this.anav = $('div.header-menu-pc').find('div.assist-nav');
    this.childwrap = this.gnav.children('div.childwrap');
    this.searchBox = $('#search-dialog');
  };

  MegaMenu.prototype.events = function() {
    const self = this;

    self.gnav.on('mouseenter', '.btn', function(e) {
      const id = $(this).attr('aria-controls');
      if(self.id === id) {
        clearTimeout(self.hideTimer);
      } else {
        self.showTimer = setTimeout(function() {
          self.showMenu(id);
          self.showTimer = null;
        }, self.delay);
      }
    });
    
    self.gnav.on('mouseleave', '.btn', function(e) {
      if(self.showTimer) {
        clearTimeout(self.showTimer);
        self.showTimer = null;
      } else {
        self.hideTimer = setTimeout(function() {
          self.hideMenu();
        }, self.delay);
      }
    });
    
    self.gnav.on('mouseenter', 'div.childwrap', function(e) {
      clearTimeout(self.hideTimer);
    });
    
    self.gnav.on('mouseleave', 'div.childwrap', function(e) {
      self.hideTimer = setTimeout(function() {
        self.hideMenu();
      }, self.delay);
    });
    
    self.gnav.on('click', '.closeBtn', function(e) {
      self.hideMenu();
    });

    $(window).on('scroll', function(e) {
      if(self.id) {
        self.hideMenu();
      }
    })
    
    self.anav.on('click', '.searchBtn', function(e) {
      self.searchBox.fadeIn(300);
      $('html').addClass(self.searchClassName);
      self.searchBox.find('input').eq(0).focus();
    });
    
    self.searchBox.on('click', '.closeBtn', function(e) {
      self.searchBox.fadeOut(300);
      $('html').removeClass(self.searchClassName);
    });
  };

  MegaMenu.prototype.showMenu = function(id) {
    const self = this;
    const targetHeight = $('#' + id).outerHeight();
    self.id = id;
    $('#' + id).attr('aria-hidden', false);
    self.gnav.find('a[aria-controls="' + id + '"]').attr('aria-expanded', true);
    self.childwrap.css('height', targetHeight);
  };

  MegaMenu.prototype.hideMenu = function() {
    const self = this, id = this.id;
    $('#' + id).attr('aria-hidden', true);
    self.gnav.find('a[aria-controls="' + id + '"]').attr('aria-expanded', false);
    self.childwrap.css('height', '');
    self.id = null;
  };

	$(function() {
    window._megamenu = new MegaMenu();
    window._megamenu.init();
  });


  /* ローカルナビ
  ---------------------------------------------------- */
  // added by SEC language support begin
  const SHOW_ALL_LABEL = {
    "ja":"すべて見る",
    "en":"Show All"
  }
  const CLOSE_LABEL = {
    "ja":"閉じる",
    "en":"Close"
  }
  // added by SEC language support end

  const LocalNav = function() {
    this.opened = null;
    this.defaultOpened = null;
    this.mainHeight = null;
    this.scrollDisabled = false;
    this.scrollDisabledTimer = null;
    this.resizeTimer = null;
    this.scrollSetPos = null;
    this.displayMode = null;
    this.lang = $('html').attr('lang');// added by SEC language support
  };

  LocalNav.prototype.init = function() {
    this.elements();
    this.events();
    this.initSet();
  };

  LocalNav.prototype.elements = function() {
    this.wrap = $('div.local-nav-area');
    this.area = $('[data-area="localnav"]');
    this.btn = $('[data-trigger="localnav-btn"]');
  };

  LocalNav.prototype.events = function() {
    const self = this;

    // commented out by SEC
    // self.area.on('click', '[data-trigger="localnav-btn"]', function(e) {
    //   if(self.displayMode === 'pc') {
    //     if($(this).attr('aria-expanded') !== 'true') {
    //       if(self.opened) self.hideMenu();
    //       self.showMenu($(this));
    //       self.areaHeight($(this).next().outerHeight());
    //       self.scrollDisabledSet();
    //       return false;
    //     }
    //   } else {
    //     if($(this).attr('aria-expanded') === 'true') {
    //       self.hideMenu();
    //       $(this).next().stop().slideUp(300, 'easeOutExpo');
    //     } else {
    //       self.showMenu($(this));
    //       $(this).next().stop().slideDown(300, 'easeOutExpo');
    //     }
    //     return false;
    //   }
    // });

    self.area.on('click', '[data-trigger="localnav-more"]', function(e) {
      if($(this).parent().hasClass('-open')) {
        $(this).parent().removeClass('-open');
        $(this).html(SHOW_ALL_LABEL[self.lang]); // changed by SEC language support
      } else {
        $(this).parent().addClass('-open');
        $(this).html(CLOSE_LABEL[self.lang]); // changed by SEC language support
      }
      self.areaHeight($(this).parent().outerHeight());
      self.scrollDisabledSet();
    });

    $(window).on('resize', function(e) {
      const displayMode = self.isDisplayMode();
      self.sourceReset();
      self.childLine();
      if(displayMode === 'pc') {
        if(self.defaultOpened) {
          self.showMenu(self.defaultOpened);
          self.areaHeight(self.defaultOpened.next().outerHeight());
        } else {
          self.areaHeight(0);
        }
      }
      self.displayMode = displayMode;
    })
    
    $(window).on('scroll', function(e) {
      if(self.scrollDisabled === false) {
        if($(this).scrollTop() >= self.scrollSetPos) {
          self.wrap.css('top', -self.area.outerHeight() + 'px');
        } else {
          self.wrap.css('top', '68px');
        }
        self.scrollSetPos = $(this).scrollTop();
      }
    });
  };

  LocalNav.prototype.initSet = function() {
    const self = this;
    // added by SEC 1 begin
    let pathlevel = location.pathname.split('/');
    if (pathlevel[pathlevel.length-1] == "index.html"){
      pathlevel[pathlevel.length-1] = "";
    }
    //blue area selector
    let lv3url = "";
    let lv3target = null;
    if (pathlevel[1]=="en" && pathlevel[2] == "news" && pathlevel[pathlevel.length-1]=="photos-index.html"){
      lv3url = pathlevel.slice(0,3).join('/') + "/photos-index.html";
      lv3target = $('#localnav-list>li>a[href="'+lv3url+'"]').first();
      if (lv3target.length > 0){
        lv3target.addClass("-current");
      }
    } else {
      for(let i = pathlevel.length; i > 1; i--){
        lv3url = pathlevel.slice(0,i).join('/');
        if (pathlevel.length > i){
          lv3url = lv3url+'/';
        }
        lv3target = $('#localnav-list>li>a[href="'+lv3url+'"]').first();
        if (lv3target.length > 0){
          if ($('#localnav-list>li>a[href="'+lv3url+'"]+div').length > 0 || i == pathlevel.length){
            lv3target.addClass("-current");
            break;
          } else {
            lv3target = null;
          }
        }    
      }
    }
    // added by SEC 1 end
    self.defaultOpened = lv3target;//self.area.find('.-current');
    self.displayMode = self.isDisplayMode();
    if(self.displayMode === 'pc') {
      self.childLine();
      if(self.defaultOpened) {
        self.showMenu(self.defaultOpened);
        self.areaHeight(self.defaultOpened.next().outerHeight());
      } else {
        self.areaHeight(0);
      }
    }
    // added by SEC 2 begin
    //gray area selector
    if (!!lv3target && lv3target.length > 0){
      let lv4url = "";
      let lv4target = null;
      if (pathlevel[1]=="en" && pathlevel[2] == "news" && pathlevel[pathlevel.length - 1]=="photos-index.html"){
        lv4url = location.pathname;
        lv4target = $('#localnav-list .child a[href="'+lv4url+'"]').first();
        if (lv4target.length > 0){
          lv4target.addClass("-current");
        }
      } else {
        for(let i = pathlevel.length; i > 1; i--){
          lv4url = pathlevel.slice(0,i).join('/');
          if (pathlevel.length > i){
            lv4url = lv4url+'/';
          }  
          lv4target = $('#localnav-list .child a[href="'+lv4url+'"]');
          if (lv4target.length > 0){
            lv4target.addClass("-current");
            break;
          }    
        }
      }
    }
    // added by SEC 2 end
  };


  LocalNav.prototype.sourceReset = function(el) {
    const self = this;
    self.area.css('height', '');
    self.btn.attr('aria-expanded', false);
    self.btn.next().attr('aria-hidden', true);
    self.area.find('div.child').css('display', '').removeClass('-multi -open');
    $('[aria-controls="localnav-list"]').attr('aria-expanded', false);
    $('[aria-controls="localnav-list"]').next().css('display', '').css('height', '').attr('aria-hidden', true);
    $('[data-trigger="localnav-more"]').remove();
    self.opened = null;
  };

  LocalNav.prototype.showMenu = function(el) {
    const self = this;
    self.opened = el;
    el.attr('aria-expanded', true);
    el.next().attr('aria-hidden', false);
  };

  LocalNav.prototype.hideMenu = function() {
    const self = this;
    $(self.opened).attr('aria-expanded', false);
    $(self.opened).next().attr('aria-hidden', true);
    self.opened = null;
  };

  LocalNav.prototype.areaHeight = function(height) {
    const self = this;
    self.mainHeight = $(self.area).find('ul').outerHeight();
    if($(self.opened).next().hasClass('-open') || height === 0) {
      self.area.css('height', height + self.mainHeight + 'px');
    } else if (self.opened.next().length == 0){// added by SEC
      self.area.css('height', self.mainHeight + 'px');// added by SEC
    } else {
      self.area.css('height', 56 + self.mainHeight + 'px');
    }
  };

  LocalNav.prototype.scrollDisabledSet = function() {
    const self = this;
    self.scrollDisabled = true;
    if (self.scrollDisabledTimer > 0) clearTimeout(self.scrollDisabledTimer);
    self.scrollDisabledTimer = setTimeout(function() {
      self.scrollDisabled = false;
    }, 400);
  };

  LocalNav.prototype.isDisplayMode = function() {
    return (window.matchMedia && window.matchMedia('(min-width: 1000px)').matches) ? 'pc' : 'sp';
  }

  LocalNav.prototype.childLine = function() {
    const self = this;
    self.btn.each(function() {
      const wrapWidth = $(this).next().width();
      const listWidth = $(this).next().children('ul').width();
      
      $(this).next().children('.showmore').remove();
      $(this).next().removeClass('-multi');
      if(wrapWidth - 1 <= listWidth) {
      $(this).next().prepend('<button class="showmore" data-trigger="localnav-more">'+SHOW_ALL_LABEL[self.lang]+'</button>'); // changed by SEC language support
      $(this).next().addClass('-multi');
      }
    });
  };

	$(function() {
    window._localnav = new LocalNav();
    window._localnav.init();
  });


  /* ドロワーメニュー
  ---------------------------------------------------- */
  const DrawerMenu = function() {
    this.id = null;
    this.scrollpos = 0;
    this.openClassName = '-drawer-open';
  };
  
  DrawerMenu.prototype.init = function() {
    this.elements();
    this.initset();
    this.events();
  };
  
  DrawerMenu.prototype.elements = function() {
    this.btn = $('[data-trigger="drawer"]');
    this.wrap = $('[data-target="drawer"]');
    this.overlay = $('[data-trigger="drawerClose"]');
  };
  
  DrawerMenu.prototype.initset = function() {
    const self = this;
    
    this.btn.each(function(e) {
      const id = $(this).attr('aria-controls');
      $('#' + id).css('top', self.positionSet(id));
    });
  };
  
  DrawerMenu.prototype.events = function() {
    const self = this;
    
    self.btn.on('click', function(e) {
      const id = $(this).attr('aria-controls');
      const currentId = self.id;
      if(currentId) {
        self.hideMenu();
      }
      if(currentId !== id) {
        if(!currentId) {
          self.showMenu(id);
        } else {
          setTimeout(function() {
            self.showMenu(id);
          },200);
        }
        $('#' + id).find('input').eq(0).focus();
      }
    });
    
    self.overlay.on('click', function(e) {
      self.hideMenu();
    });
    
    $(window).on('resize', function(e) {
      self.btn.each(function(e) {
        const id = $(this).attr('aria-controls');
        $('#' + id).css('top', self.positionSet(id));
      });
    });
  };

  DrawerMenu.prototype.showMenu = function(id) {
    const self = this;
    const targetHeight = $('#' + id).outerHeight();
    self.scrollpos = $(window).scrollTop();
    $('html').addClass(self.openClassName);
    $('body').css('top', -self.scrollpos);
    $('#' + id).attr('aria-hidden', false)
      .css('transform', 'translateY(' + targetHeight + 'px)');
    $('[aria-controls="' + id + '"]').attr('aria-expanded', true);
    self.id = id;
  };

  DrawerMenu.prototype.hideMenu = function() {
    const self = this, id = self.id;
    $('html').removeClass(self.openClassName);
    $('body').css('top', 0);
    $(window).scrollTop(self.scrollpos);
    $('#' + id).attr('aria-hidden', true)
      .css('top', self.positionSet(id))
      .css('transform', 'translateY(-100%)')
      .children().css('transform', 'translateY(0)');
    $('[aria-controls="' + id + '"]').attr('aria-expanded', false);
    self.id = null;
  };

  DrawerMenu.prototype.positionSet = function(id) {
    const self = this;
    const wrapHeight = self.wrap.outerHeight();
    const targetHeight = $('#' + id).outerHeight();
    return wrapHeight - targetHeight;
  };
  
  $(function() {
    window._drawerMenu = new DrawerMenu();
    window._drawerMenu.init();
  });


  /* スムーススクロール
  ---------------------------------------------------- */
  const SmoothScroll = function() {
    this.status = '';
    this.pageData = {
      windowHeight: 0,
      scrolltop: 0,
      footerPosition: 0
    };
  };

  SmoothScroll.prototype.init = function() {
    this.elements();
    this.events();
    this.getPageData();
    this.pagetopPosition();
  };

  SmoothScroll.prototype.elements = function() {
    this.pagetop = $('#pagetop');
  };

  SmoothScroll.prototype.events = function() {
    const self = this;

    $(window).on('load scroll resize', function() {
      self.getPageData();
      self.pagetopPosition();
    });

    $('a[href^="#"]').not('.noscroll').on('click',  function() {
      const adjust = -self.pageData.headerHeight;
      const speed = 600;
      const href= $(this).attr("href");
      const target = $(href == "#" || href == "" ? 'html' : href);
      let position = target.offset().top + adjust;
      position = position > 0 ? position : 0;
      $('body, html').animate({ scrollTop:position }, speed, 'easeOutExpo');
      return false;
    });
  };

  SmoothScroll.prototype.getPageData = function() {
    this.pageData.windowHeight = $(window).height();
    this.pageData.scrolltop = $(window).scrollTop();
    this.pageData.headerHeight = $('#header').height();
    this.pageData.footerPosition = $('#footer').offset().top;
  };

  SmoothScroll.prototype.pagetopPosition = function() {
    if(this.pageData.scrolltop < 100) {
      if(this.status !== 'top') {
        this.pagetop.fadeOut(200);
        this.status = 'top';
      }
    } else if(this.pageData.windowHeight + this.pageData.scrolltop < this.pageData.footerPosition) {
      if(this.status !== 'fixed') {
        this.pagetop.css({ 'position': 'fixed', 'bottom': '0' });
        this.pagetop.fadeIn(200);
        this.status = 'fixed';
      }
    } else {
      if(this.status !== 'bottom') {
        this.pagetop.css({ 'position': '', 'bottom': '' });
        this.pagetop.fadeIn(200);
        this.status = 'bottom';
      }
    }
  };

	$(function() {
    window._smoothscroll = new SmoothScroll();
    window._smoothscroll.init();
  });


  /* アコーディオン
  ---------------------------------------------------- */
  $(function() {
    const btn = $('[data-trigger="accordion"]');

    btn.on('click', function(e) {
      const target = '#' + $(this).attr('aria-controls');
      const isSelected = $(this).attr('aria-expanded');
      
      if(isSelected === 'true') {
        $(this).attr('aria-expanded', 'false');
        $(target).attr('aria-hidden', 'true');
        $(target).stop().slideUp(150, 'easeOutExpo');
        $(target).css('height', 'auto');
      } else {
        $(this).attr('aria-expanded', 'true');
        $(target).attr('aria-hidden', 'false');
        $(target).stop().slideDown(150, 'easeOutExpo');
        $(target).css('height', 'auto');
      }
    });
  });


  /* 続きを見る
  ---------------------------------------------------- */
  $(function() {
    const btn = $('[data-trigger="readmore"]');
    let timer;

    btn.on('click', function(e) {
      const target = '#' + $(this).attr('aria-controls');
      const isSelected = $(this).attr('aria-expanded');

      if(isSelected === 'true') {
        $(this).attr('aria-expanded', 'false');
        $(target).attr('aria-hidden', 'true');
        $(target).css('height', '');
        $(this).html('すべて見る');
      } else {
        const height = $(target).get(0).scrollHeight;
        $(this).attr('aria-expanded', 'true');
        $(target).attr('aria-hidden', 'false');
        $(target).css({'cssText': 'height:' + height + 'px !important;'});
        $(this).html('閉じる');
      }
    });

    $(window).on('resize', function() {
      if (timer > 0) clearTimeout(timer);
      timer = setTimeout(function() {
        btn.each(function(e) {
          if($(this).attr('aria-expanded') === 'true') {
            const target = '#' + $(this).attr('aria-controls');
            $(target).css({'cssText': 'height: auto !important;'});
            const height = $(target).get(0).scrollHeight;
            $(target).css({'cssText': 'height:' + height + 'px !important;'});
          }
        });
      }, 300);
    });
  });


  /* モーダル
  ---------------------------------------------------- */
  const Amodal = function() {
    this.activeId = '';
    this.redirectTimer = undefined;
    this.ytPlayer = null;
  };
  
  Amodal.prototype.init = function() {
    this.events();
    this.setYTscript();
  };
  
  Amodal.prototype.events = function() {
    const self = this;
  
    $(document).on('click', '[data-trigger="modalOpen"]', function(e) {
      self.showAction($(this).attr('data-id'));
      return false;
    });
    $(document).on('click', '[data-trigger="videoModalOpen"]', function(e) {
      self.showVideoAction($(this).attr('data-id'));
      return false;
    });
    $(document).on('click', '[data-trigger="modalClose"]', function(e) {
      self.hideAction();
    });
    $(document).on('click', '.modal-box', function(e) {
      self.hideAction();
    });
    $(document).on('click', '.modal-box__content', function(e) {
      e.stopPropagation();
    });
    $(document).on('transitionend', '.modal-box', function(e) {
      if (!$('html').hasClass('-modal-show')) {
        $('html').removeClass('-modal-active');
        $('#' + self.activeId).remove();
        self.ytPlayer = null;
      }
    });
  };
  
  Amodal.prototype.open = function(id) {
    this.showAction(id);
  };
  
  Amodal.prototype.showAction = function(id) {
    this.activeId = id;
    const activeElement = '#' + this.activeId;
    $('html').addClass('-modal-active')
    $('html').addClass('-modal-show');
    $(activeElement).attr('aria-hidden', 'false');
    $(activeElement).find('a, button').eq(0).focus();
    $(activeElement).scrollLeft(0);
  };
  
  Amodal.prototype.showVideoAction = function(id) {
    let html = '';
    html += '<div class="modal-box -video" id="video-modal" aria-hidden="true">';
    html += '<div class="modal-content">';
    html += '<button type="button" aria-label="閉じる" data-trigger="modalClose" class="modal-top-close"></button>';
    html += '<div class="modal-body">';
    html += '<div class="player-wrap"><div id="player"></div></div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    document.body.insertAdjacentHTML('beforeend', html);
    
    this.ytPlayer = new YT.Player('player', {
      videoId: id,
    });
    this.activeId = 'video-modal';
    const activeElement = '#' + this.activeId;
    $('html').addClass('-modal-active')
    $('html').addClass('-modal-show');
    $(activeElement).attr('aria-hidden', 'false');
    $(activeElement).find('a, button').eq(0).focus();
    $(activeElement).scrollLeft(0);
  };
  
  Amodal.prototype.hideAction = function() {
    const activeElement = '#' + this.activeId;
    $(activeElement).attr('aria-hidden', 'true');
    $('html').removeClass('-modal-show');
    $('[data-id="' + this.activeId + '"]').focus();
    if(this.ytPlayer) {
      this.ytPlayer.pauseVideo();
    }
  };
  
  Amodal.prototype.setYTscript = function(id) {
    if($('[data-trigger="videoModalOpen"]').length) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  };
  
  $(function() {
    window._amodal = new Amodal();
    window._amodal.init();
  })
})(jQuery);

// added by SEC
function popup(theURL,wWidth,wHeight) {
	const settings = "status=yes,scrollbars=yes,menubar=yes,resizable=yes,toolbar=yes,location=yes,directory=yes";
	if(!wWidth&&!wHeight){
		window.open(theURL,'',''+settings+'');
	}else if(wWidth&&!wHeight){
		window.open(theURL,'',''+settings+',width='+wWidth+'');
	}else if(!wWidth&&wHeight){
		window.open(theURL,'',''+settings+',height='+wHeight+'');
	}else{
		window.open(theURL,'',''+settings+',width='+wWidth+',height='+wHeight+'');
	}
}