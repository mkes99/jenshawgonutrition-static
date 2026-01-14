(function(){
  function fix(){
    try{
      // Fix protocol-relative wp-content paths
      document.querySelectorAll('img[src^="//wp-content/"]').forEach(function(img){
        img.src = img.src.replace(/^\/\/wp-content\//, '/wp-content/');
      });

      // Fix the two common broken hostnames seen in migrated CSS/html
      document.querySelectorAll('img[src^="//"]').forEach(function(img){
        var src = img.getAttribute('src') || '';
        if (/^\/\/dotted-pattern-large\.png$/i.test(src)) {
          img.setAttribute('src','/wp-content/uploads/2024/06/dotted-pattern-large.png');
        }
        if (/^\/\/5\.jpg$/i.test(src)) {
          img.setAttribute('src','/wp-content/uploads/2024/05/5.jpg');
        }
      });

      document.querySelectorAll('[style*="url(//"], [style*="URL(//"], [style*="Url(//"]').forEach(function(el){
        var s = el.getAttribute('style');
        if (!s) return;
        s = s.replace(/url\(\s*\/\/wp-content\//gi, 'url(/wp-content/');
        s = s.replace(/url\(\s*\/\/dotted-pattern-large\.png\s*\)/gi, 'url(/wp-content/uploads/2024/06/dotted-pattern-large.png)');
        s = s.replace(/url\(\s*\/\/5\.jpg\s*\)/gi, 'url(/wp-content/uploads/2024/05/5.jpg)');
        el.setAttribute('style', s);
      });
    }catch(e){}
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fix);
  else fix();
  document.addEventListener('astro:page-load', fix);
})();
