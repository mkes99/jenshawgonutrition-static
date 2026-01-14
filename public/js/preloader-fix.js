(function(){
  function hide(){
    var el = document.querySelector('.load__wrapper');
    if (!el) return;
    el.style.opacity = '0';
    el.style.pointerEvents = 'none';
    setTimeout(function(){
      try { el.parentNode && el.parentNode.removeChild(el); } catch(e){}
    }, 250);
  }

  window.addEventListener('load', function(){
    setTimeout(hide, 250);
  });

  // Safety: if 'load' never fires (some SPA-ish transitions), hide after 4s.
  setTimeout(hide, 4000);
})();
