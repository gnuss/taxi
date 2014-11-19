$(function() {

  /*Mobile Menu show-hide*/
  function animateShowHideMenuMobail(_this) {
    function animateClose(_this) {
      _this.stop();
      _this.animate({'left': '0'}, 'slow', function() {
        _this.removeClass('open');
      });
    }

    function animateShow(_this) {
      _this.stop();
      _this.animate({'left': '240'}, 'slow', function() {
        _this.addClass('open');
      });
    }

    if (_this.hasClass('open')) {
      animateClose(_this);
    } else {
      animateShow(_this);
    }
  };
  
  $('.show-mobile-menu').click(function(event) {
    event.stopPropagation();
    event.preventDefault();
    animateShowHideMenuMobail($('.wrapper'));
  });

  $(window).resize(function() {
    if($(window).width() > 719) {
      $('.wrapper').removeAttr('style').removeClass('open');
    }
  });

  /*Handmade Select with checkbox*/
  $('.select-wishes .selected-items, .select-wishes .select-arrow-wrap').click(function(event) {
    $('.select-wishes ul').toggle();
    event.stopPropagation();
  });

  $('.select-wishes ul').click(function(event) {
    event.stopPropagation();
  })

  $('.select-wishes .select-close').click(function() {
    $('.select-wishes ul').css('display', 'none');
  });

  $(document).click(function(){
    $('.select-wishes ul').css('display', 'none');
  });

  $('label').click(function() {
    selectWishes();
  });

  function selectWishes() {
    var arr = [];

    $('.select-wishes label').each(function(index, element) {
      
      if($(this).find('input').is(':checked')) {
        arr.push($(element).text());
      }
      
    })

    if(arr.length == 0) {
      $('.select-wishes .selected-items').text('Выберите что нибудь');
    } else {
      $('.select-wishes .selected-items').text(arr.join(','));
    }

  }

  selectWishes();

  /*Show-hide our app*/
  $('.our-app-wrap .close').click(function() {
    $('.our-app-wrap').slideUp();
    //$('header .show-app-block').show(1000);
    setTimeout(
      function() {
        $('header .show-app-block').show();
      },
      1000
    );
    return false;
  })

  $('header .show-app-block').click(function() {
    $('.our-app-wrap').slideDown();
    $('header .show-app-block').hide();
    return false;
  })

  /*Show-hide order table*/
  $('.show-hide-table a').click(function() {
    showHideOrderTable($(this));
    return false;
  })

  function showHideOrderTable(_this) {
    function showOrderTable(_this) {
      _this.find('span.underline').text('Скрыть');
      _this.find('span.show-table').removeClass('show-table').addClass('hide-table');
      _this.parents('.my-order-footer').find('table.order-table').addClass('open-table').show();
    }

    function hideOrderTable(_this) {
      _this.find('span.underline').text('Подробности');
      _this.find('span.hide-table').removeClass('hide-table').addClass('show-table');
      _this.parents('.my-order-footer').find('table.order-table').removeClass('open-table').hide();
    }

    if(_this.parents('.my-order-footer').find('table.order-table').hasClass('open-table')) {
      hideOrderTable(_this);
    } else {
      showOrderTable(_this);
    }
  }

  /*Show-hide input*/
  $('label.time-disabled').click(function() {
    z();
  });

  function z() {
    if($('#go-other:checked').size()) {
      $('#input-time').removeAttr('disabled');
    } else {
      $('#input-time').attr('disabled', true);
    }
  }

  z();

  /*Modal*/
  function openModalWindows() {
    var H = $("html"),
        W = $(window),
        D = $(document),
        F = function () {
          F.open.apply( this, arguments );
        };

    D.ready(function() {
      var w1, w2;

      if ( $.scrollbarWidth === undefined ) {
        // http://benalman.com/projects/jquery-misc-plugins/#scrollbarwidth
        $.scrollbarWidth = function() {
          var parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),
              child  = parent.children(),
              width  = child.innerWidth() - child.height( 99 ).innerWidth();
          parent.remove();
          return width;
        };
      }

      if ( $.support.fixedPosition === undefined ) {
        $.support.fixedPosition = (function() {
          var elem  = $('<div style="position:fixed;top:20px;"></div>').appendTo('body'),
              fixed = ( elem[0].offsetTop === 20 || elem[0].offsetTop === 15 );
          elem.remove();
          return fixed;
        }());
      }

      $.extend(F.defaults, {
        scrollbarWidth : $.scrollbarWidth(),
        fixed  : $.support.fixedPosition,
        parent : $('body')
      });

      //Get real width of page scroll-bar
      w1 = $(window).width();
      H.addClass('popup-lock-test');
      w2 = $(window).width();
      H.removeClass('popup-lock-test');
      $("<style type='text/css'>.popup-margin{margin-right:" + (w2 - w1) + "px;}</style>").appendTo("head");

    });

    var p = $('.popup-overlay');

    $('.open-popup').click(function() {
      id = $(this).attr('href');
      $(id).css('display', 'block');
      $('html').addClass('popup-lock popup-margin');
      return false
    })

    p.click(function(event) {
      e = event || window.event
      if (e.target == this) {
        $(p).css('display', 'none');
        $('html').removeClass('popup-lock popup-margin');
        return false
      }
    })

    $('.popup .close').click(function() {
      p.css('display', 'none');
      $('html').removeClass('popup-lock popup-margin');
      return false
    })
  }

  openModalWindows();

  /*Tabs*/
  $('ul.tabs-switches li').click(function() {
    if(!$(this).hasClass('active')) {
      var ul = $(this).parent();
      var prev_index = ul.find('.active').index();
      var cur_index = $(this).index();
      ul.find('li').eq(prev_index).removeClass('active');
      $(this).addClass('active');
      var box = ul.next('.tabs-wrap').children('.tabs-container');
      box.eq(prev_index).removeClass('visible');
      box.eq(cur_index).addClass('visible');
    }
    return false;
  });

});