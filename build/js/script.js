(function() {
  (function($, window, document) {
    var Tab;
    Tab = (function() {
      Tab.defaults = {
        selector_tab: '.tab'
      };

      function Tab($el, options) {
        this.$el = $el;
        this.options = $.extend({}, this.defaults, options);
        this._eventify();
      }

      Tab.prototype._eventify = function() {
        var _this = this;
        return this.$el.on('click', this.options.selector_tab, function(e) {
          e.preventDefault();
          return _this.switchFromOpener($(e.currentTarget));
        });
      };

      Tab.prototype.switchFromOpener = function($opener) {
        var $lastContentEl, $lastTabEl, $nextContentEl, $nextTabEl;
        $lastContentEl = this.$lastContentEl || this.$el.find("." + this.options.content_activeClass);
        $nextContentEl = this.getRelatedContentEl($opener);
        $lastTabEl = this.$lastTabEl || this.$el.find("." + this.options.tab_activeClass);
        $nextTabEl = $opener;
        this.disableContentEl($lastContentEl);
        this.activateContentEl($nextContentEl);
        this.disableTabEl($lastTabEl);
        this.activateTabEl($nextTabEl);
        this.$lastContentEl = $nextContentEl;
        return this.$lastTabEl = $nextTabEl;
      };

      Tab.prototype.disableContentEl = function($lastContentEl) {
        return $lastContentEl.removeClass(this.options.content_activeClass);
      };

      Tab.prototype.activateContentEl = function($nextContentEl) {
        return $nextContentEl.addClass(this.options.content_activeClass);
      };

      Tab.prototype.disableTabEl = function($lastTabEl) {
        return $lastTabEl.removeClass(this.options.tab_activeClass);
      };

      Tab.prototype.activateTabEl = function($nextTabEl) {
        return $nextTabEl.addClass(this.options.tab_activeClass);
      };

      Tab.prototype.getRelatedContentEl = function($opener) {
        var href;
        href = $opener.attr('href');
        return this.$el.find(href);
      };

      return Tab;

    })();
    return $.fn.tabify = function(options) {
      return this.each(function() {
        var $el, tab;
        $el = $(this);
        return tab = new Tab($el, options);
      });
    };
  })(jQuery, window, document);

  $(function() {
    var $tabset;
    $tabset = $('.tabset');
    return $tabset.tabify({
      selector_tab: '.tab',
      selector_contet: '.tabcontentdiv',
      tab_activeClass: 'tab-active',
      content_activeClass: 'tabcontentdiv-active'
    });
  });

}).call(this);
