(function(){
  function applyBg(el){
    var bg = el.getAttribute('data-bg');
    if (!bg) return;
    // expected format: url(...)
    if (bg.indexOf('url(') === -1) bg = 'url(' + bg + ')';
    el.style.backgroundImage = bg;
    el.classList.add('bg-loaded');
  }

  function init(){
    document.querySelectorAll('[data-bg]').forEach(applyBg);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  // Astro view transitions
  document.addEventListener('astro:page-load', init);
})();
