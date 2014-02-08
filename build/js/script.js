(function() {
  $(function() {
    var $tabset;
    $tabset = $('.tabset');
    return $tabset.tabify({
      selector_tab: '.tab',
      selector_contet: '.tabcontentdiv',
      tab_activeClass: 'tab-active',
      content_activeClass: 'tabcontentdiv-active',
      useFade: true,
      fadeDuration: 400
    });
  });

}).call(this);
