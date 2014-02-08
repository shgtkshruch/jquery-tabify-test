
/*
Copyright (c) 2013 "Takazudo" Takeshi Takatsudo
Licensed under the MIT license.
 */

(function() {
  (function($, window, document) {
    var Tab;
    Tab = (function() {
      Tab.defaults = {
        selector_tab: '.tab',
        useFade: false,
        fadeDuration: 400
      };

      function Tab($el, options) {
        this.$el = $el;
        this.options = $.extend({}, this.defaults, options);
        this._eventify();
      }

      Tab.prototype._eventify = function() {
        return this.$el.on('click', this.options.selector_tab, (function(_this) {
          return function(e) {
            e.preventDefault();
            return _this.switchFromOpener($(e.currentTarget));
          };
        })(this));
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
        var callback, cls, d;
        cls = this.options.content_activeClass;
        callback = (function(_this) {
          return function() {
            return $lastContentEl.removeClass(cls);
          };
        })(this);
        if (this.options.useFade) {
          d = this.options.fadeDuration;
          return $lastContentEl.transition({
            opacity: 0
          }, d, callback);
        } else {
          return callback();
        }
      };

      Tab.prototype.activateContentEl = function($nextContentEl) {
        var callback, cls, d;
        cls = this.options.content_activeClass;
        callback = (function(_this) {
          return function() {
            return $nextContentEl.addClass(cls);
          };
        })(this);
        if (this.options.useFade) {
          d = this.options.fadeDuration;
          return $nextContentEl.transition({
            opacity: 1
          }, d, callback);
        } else {
          return callback();
        }
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

}).call(this);
