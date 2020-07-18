var scrollContainer = document.querySelector('.scroll-container')
var scrollContent = document.querySelector('.scroll-content')

function resize () {
  document.body.style.height = scrollContent.offsetHeight + 'px'
}

var scrollY = 0

function tick () {
  requestAnimationFrame(tick)
  var diff = (scrollY - document.documentElement.scrollTop)
  scrollY -= (scrollY - document.documentElement.scrollTop) * .2
  
  scrollContent.style.transform = 'translate3d(0, ' + -scrollY + 'px, 0) skew(0, '+diff*.01+'deg)'
}

tick()

resize()

window.addEventListener('resize', resize)