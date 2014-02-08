###
Copyright (c) 2013 "Takazudo" Takeshi Takatsudo
Licensed under the MIT license.
###

do ($ = jQuery, window = window, document = document) ->
  class Tab
    @defaults = 
      selector_tab: '.tab'

      # Fade
      useFade: false
      fadeDuration: 400
  
    constructor: (@$el, options) ->
      @options = $.extend {}, @defaults, options
      @_eventify()

    _eventify: ->
      @$el.on 'click', @options.selector_tab, (e) =>
        e.preventDefault()
        @switchFromOpener $(e.currentTarget)

    switchFromOpener: ($opener) ->
      $lastContentEl = @$lastContentEl or @$el.find ".#{@options.content_activeClass}"
      $nextContentEl = @getRelatedContentEl $opener
      $lastTabEl = @$lastTabEl or @$el.find ".#{@options.tab_activeClass}"
      $nextTabEl = $opener

      # switch contents
      @disableContentEl $lastContentEl
      @activateContentEl $nextContentEl

      # switch tabs
      @disableTabEl $lastTabEl 
      @activateTabEl $nextTabEl

      # save next as last
      @$lastContentEl = $nextContentEl
      @$lastTabEl = $nextTabEl

    # helper
    disableContentEl: ($lastContentEl) ->
      cls = @options.content_activeClass
      callback = =>
        $lastContentEl.removeClass cls

      if @options.useFade
        d = @options.fadeDuration
        $lastContentEl.transition {opacity: 0}, d, callback
      else
        callback()

    activateContentEl: ($nextContentEl) ->
      cls = @options.content_activeClass
      callback = =>
        $nextContentEl.addClass cls

      if @options.useFade
        d = @options.fadeDuration
        $nextContentEl.transition {opacity: 1}, d, callback
      else
        callback()

    disableTabEl: ($lastTabEl) ->
      $lastTabEl.removeClass @options.tab_activeClass

    activateTabEl: ($nextTabEl) ->
      $nextTabEl.addClass @options.tab_activeClass

    getRelatedContentEl: ($opener) ->
      href = $opener.attr 'href'
      @$el.find href

  # jQuery bridges
  $.fn.tabify = (options) ->
    @each ->
      $el = $(@)
      tab = new Tab $el, options
