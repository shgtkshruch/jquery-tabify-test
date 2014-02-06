###
Copyright (c) 2013 "Takazudo" Takeshi Takatsudo
Licensed under the MIT license.
###

do ($ = jQuery, window = window, document = document) ->
  ns = {}
  # Tab
  class ns.Tab
    @defaults =
      # selectores related to the container
      selector_tab: '.tab'
      selector_contentwrapper: '.tabcontentwrapper' # necessary if you use fade
      selector_content: '.tabcontentdiv'

      # visual control classNames
      tab_activeClass: null # 'tab-active'
      content_activeClass: null # 'tabcontentdiv-active'

    constructor: (@$el, options) ->
      @options = $.extend {}, @defaults, options
      @_eventify()

    _eventify: ->
      @$el.on 'click', @options.selector_tab, (e) =>
        e.preventDefault()
        @switchFromOpener $(e.currentTarget)

    switchFromOpener: ($opener) ->
      $lastContentEl = @$lastContentEl or do =>
        @$lastContentEl = @$el.find ".#{@options.content_activeClass}"
      $nextContentEl = @getRelatedContentEl $opener

      # swirch contents
      @disableContentEl $lastContentEl
      @$lastContentEl = $nextContentEl
      @activateContentEl $nextContentEl

      # swtich tab
      @disableActiveTab()
      @activateTab $opener

    # content element handlers
    activateContentEl: ($nextContentEl) ->
      $nextContentEl.addClass @options.content_activeClass

    disableContentEl: ($lastContentEl) ->
      $lastContentEl.removeClass @options.content_activeClass

    # tab element handlers
    activateTab: ($opener) ->
      $opener.addClass @options.tab_activeClass
      @$lastTab = $opener

    disableActiveTab: ->
      $tab = $(@options.selector_tab)
      $tab.removeClass @options.tab_activeClass

    # helpers
    getRelatedContentEl: ($opener) ->
      href = $opener.attr 'href'
      @$el.find href

  # jQuery bridges
  $.fn.tabify = (options) ->
    @each ->
      $el = $(@)
      tab = new ns.Tab $el, options
