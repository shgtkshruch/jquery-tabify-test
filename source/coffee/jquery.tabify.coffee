###
Copyright (c) 2013 "Takazudo" Takeshi Takatsudo
Licensed under the MIT license.
###

do ($ = jQuery, window = window, document = document) ->
  class Tab
    @defaults = 
      selector_tab: '.tab'
  
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

      # change last element
      @$lastContentEl = $nextContentEl
      @$lastTabEl = $nextTabEl

    # helper
    disableContentEl: ($lastContentEl) ->
      $lastContentEl.removeClass @options.content_activeClass

    activateContentEl: ($nextContentEl) ->
      $nextContentEl.addClass @options.content_activeClass

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
