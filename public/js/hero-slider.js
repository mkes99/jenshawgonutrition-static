(function(){
  function initOne(root){
    if (!root || root.dataset.heroInit === '1') return;
    root.dataset.heroInit = '1';

    var slides = Array.prototype.slice.call(root.querySelectorAll('.js-hero-slide'));
    if (!slides.length) return;

    var interval = parseInt(root.getAttribute('data-interval') || '6000',10);
    if (!isFinite(interval) || interval < 2000) interval = 6000;

    function activate(i){
      slides.forEach(function(s, idx){
        s.classList.toggle('is-active', idx === i);
        // ensure background-image is applied
        var bg = s.getAttribute('data-bg');
        if (bg) {
          if (bg.indexOf('url(') === -1) bg = 'url(' + bg + ')';
          s.style.backgroundImage = bg;
        }
      });
    }

    var current = 0;
    activate(current);

    if (slides.length === 1) {
      return;
    }

    var timer = setInterval(function(){
      current = (current + 1) % slides.length;
      activate(current);
    }, interval);

    // pause on hover for desktop
    root.addEventListener('mouseenter', function(){ clearInterval(timer); });
    root.addEventListener('mouseleave', function(){
      timer = setInterval(function(){
        current = (current + 1) % slides.length;
        activate(current);
      }, interval);
    });
  }

  function init(){
    document.querySelectorAll('[data-hero-slider]').forEach(initOne);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  // Astro view transitions support
  document.addEventListener('astro:page-load', init);
})();
