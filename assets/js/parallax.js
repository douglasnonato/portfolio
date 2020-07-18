var windowSel = $(window);

// parallax
function parallax(selector, speed) {
  var movement = -(windowSel.scrollTop() * (speed / 10));
  $(selector).css('transform', 'translate3d(0,' + movement + 'px, 0');
}

// parallax init
function parallaxInit(selector) {
  if ($(selector).length && window.innerWidth > 1024 && navigator.userAgent.match(/iPad/i) == null) {
    $(selector).each(function(i, el) {
      var speed = $(el).attr('data-speed');

      //init function on load
      parallax($(el), speed);

      // init function on scroll
      windowSel.on('scroll', function() {
        parallax($(el), speed);
      });
    });
  }
}

var parallaxItem = '[data-parallax]';
parallaxInit(parallaxItem);

// according to effect from this website: http://www.techstyle.com/