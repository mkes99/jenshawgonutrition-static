(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    var grid = document.querySelector('[data-jsn-masonry]');
    if (!grid) return;
    if (typeof window.Isotope === 'undefined') return;

    var iso = new window.Isotope(grid, {
      itemSelector: '.jsn-masonry__item',
      percentPosition: true,
      masonry: {
        columnWidth: '.jsn-masonry__sizer',
      },
      transitionDuration: '0.2s'
    });

    // If imagesLoaded is bundled in isotope.pkgd (it is in most builds),
    // wait for images to load before final layout to avoid gaps.
    if (typeof window.imagesLoaded === 'function') {
      window.imagesLoaded(grid, function () {
        iso.layout();
      });
    } else {
      // Fallback: relayout shortly after mount.
      setTimeout(function () {
        iso.layout();
      }, 250);
    }

    // Re-layout on resize (throttled).
    var t;
    window.addEventListener('resize', function () {
      clearTimeout(t);
      t = setTimeout(function () {
        iso.layout();
      }, 150);
    });
  });
})();
