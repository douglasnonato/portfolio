(function() {
	var triggerBttn = document.getElementById( 'trigger-overlay' ),
		overlay = document.querySelector( 'div.menu-overlay' ),
		closeBttn = document.getElementById( 'trigger-close-overlay' ),
		slide = document.getElementById('slide-effect');
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = { transitions : Modernizr.csstransitions };

	function toggleOverlay() {
		if( classie.has( overlay, 'open' ) ) {
			classie.remove( overlay, 'open' );
			classie.add( overlay, 'close' );
			var onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				classie.remove( overlay, 'close' );
			};
			if( support.transitions ) {
				overlay.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
		else if( !classie.has( overlay, 'close' ) ) {
			classie.add( overlay, 'open' );
		}
	}

	triggerBttn.addEventListener( 'click', toggleOverlay );
	closeBttn.addEventListener( 'click', toggleOverlay );

})();


// Disable scroll and animation trigers


// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

document.getElementById("trigger-overlay").onclick = function() {
	if (window.addEventListener) // older FF
	  window.addEventListener('DOMMouseScroll', preventDefault, false);
	window.onwheel = preventDefault; // modern standard
	window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
	window.ontouchmove  = preventDefault; // mobile
	document.onkeydown  = preventDefaultForScrollKeys;
	$('strong.animated').removeClass('slideOutLeft').addClass('slideInLeft')
	$('.call.animated').removeClass('slideOutDown').addClass('slideInUp')
	$('span.animated').removeClass('slideOutDown').addClass('slideInUp')
	$('#trigger-overlay').css({ opacity: "0" });
	setTimeout(function(){
	   $("nav").addClass("hide");
	   $("nav.backup").addClass("show");
	}, 1050);
};


document.getElementById("trigger-close-overlay").onclick = function() {
	if (window.removeEventListener)
	    window.removeEventListener('DOMMouseScroll', preventDefault, false);
	window.onmousewheel = document.onmousewheel = null; 
	window.onwheel = null; 
	window.ontouchmove = null;  
	document.onkeydown = null; 
	$('strong.animated').removeClass('slideInLeft').addClass('slideOutLeft')
	$('.call.animated').removeClass('slideInUp').addClass('slideOutDown')
	$('span.animated').removeClass('slideInUp').addClass('slideOutDown') 
	$('#trigger-overlay').css({ opacity: "1" });
	setTimeout(function(){
	   $("nav").removeClass("hide");
	   $("nav.backup").removeClass("show");
	}, 1050);
}
