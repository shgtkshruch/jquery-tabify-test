/*
Copyright (c) 2013 "Takazudo" Takeshi Takatsudo
Licensed under the MIT license.
*/


(function() {
  (function($, window, document) {
    var ns;
    ns = {};
    ns.Tab = (function() {
      Tab.defaults = {
        selector_tab: '.tab',
        selector_contentwrapper: '.tabcontentwrapper',
        selector_content: '.tabcontentdiv',
        tab_activeClass: null,
        content_activeClass: null
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
        var $lastContentEl, $nextContentEl,
          _this = this;
        $lastContentEl = this.$lastContentEl || (function() {
          return _this.$lastContentEl = _this.$el.find("." + _this.options.content_activeClass);
        })();
        $nextContentEl = this.getRelatedContentEl($opener);
        this.disableContentEl($lastContentEl);
        this.$lastContentEl = $nextContentEl;
        this.activateContentEl($nextContentEl);
        this.disableActiveTab();
        return this.activateTab($opener);
      };

      Tab.prototype.activateContentEl = function($nextContentEl) {
        return $nextContentEl.addClass(this.options.content_activeClass);
      };

      Tab.prototype.disableContentEl = function($lastContentEl) {
        return $lastContentEl.removeClass(this.options.content_activeClass);
      };

      Tab.prototype.activateTab = function($opener) {
        $opener.addClass(this.options.tab_activeClass);
        return this.$lastTab = $opener;
      };

      Tab.prototype.disableActiveTab = function() {
        var $tab;
        $tab = $(this.options.selector_tab);
        return $tab.removeClass(this.options.tab_activeClass);
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
        return tab = new ns.Tab($el, options);
      });
    };
  })(jQuery, window, document);

}).call(this);
