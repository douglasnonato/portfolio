$(function() {
  var prefix = function() {
    var a = window.getComputedStyle(document.documentElement, ""),
      b = (Array.prototype.slice.call(a).join("").match(/-(moz|webkit|ms)-/) || "" === a.OLink && ["", "o"])[1];
    return "WebKit|Moz|MS|O".match(new RegExp("(" + b + ")", "i"))[1], "-" + b + "-"
  }();
  $(document).mousemove(function(e) {
    mouseX = e.pageX + 15;
    mouseY = e.pageY - $(window).scrollTop() + 15;
    $('.cursor-outer').attr('style', prefix + 'transform:translate(' + mouseX + 'px,' + mouseY + 'px)');
  });

  $(document).on('mouseenter', 'a', function() {
    $('.cursor').addClass('zooming');
  }).on('mouseleave', 'a', function() {
    $(".cursor").removeClass("zooming")
  });

  $(document).on('mouseenter', 'button', function() {
    $('.cursor').addClass('zooming');
  }).on('mouseleave', 'button', function() {
    $(".cursor").removeClass("zooming")
  });
})