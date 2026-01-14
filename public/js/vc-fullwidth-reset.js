(function vcFullWidthReset(){
  try {
    var rows = document.querySelectorAll('.vc_row[data-vc-full-width="true"]');
    if (!rows || !rows.length) return;

    // In WPBakery, these rows are "full bleed" (100vw), while content inside
    // remains aligned via nested .container/.row structures.
    // The scraped inline styles (left/width/padding) are viewport-specific and
    // will be wrong for local/dev/prod build widths.
    function containerWidth(){
      var w = window.innerWidth || document.documentElement.clientWidth || 1200;
      if (w >= 1200) return 1170;
      if (w >= 992) return 970;
      if (w >= 768) return 750;
      return w - 30;
    }

    function apply(){
      var cw = containerWidth();
      var w = window.innerWidth || document.documentElement.clientWidth || 1200;
      var pad = Math.max(15, Math.round((w - cw) / 2));
      rows.forEach(function(r){
      r.style.position = 'relative';
      r.style.left = '50%';
      r.style.right = 'auto';
      r.style.width = '100vw';
      r.style.maxWidth = '100vw';
      r.style.marginLeft = '-50vw';
      r.style.marginRight = '0';
      // mimic WPBakery inline padding that keeps inner columns aligned to container
      r.style.paddingLeft = pad + 'px';
      r.style.paddingRight = pad + 'px';
      r.setAttribute('data-vc-full-width-init', 'true');
      });
    }

    apply();
    window.addEventListener('resize', function(){
      try{ apply(); }catch(e){}
    });
  } catch(e){}
})();
