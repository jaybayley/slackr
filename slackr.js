(function( $ ){

  $.fn.slackr = function( options ) {

    var settings = $.extend( {
      'element'         : 'div.slacker',                  // element selector
      'width'           : 500,                            // default element width
      'focus'           : 'focus',                        // focus data
      'peek'            : 50,                             // Width of 'peek' amount
      'duration'        : 250,                            // Duration of animation (in ms)
      'timing'          : 'ease-in-out',                  // Animation timing function
      'error'           : 5                               // Margin of error (prevent gaps!)
    }, options);

    return this.each(function() {
  
      var el = settings.element
      var wi = settings.width
      var pk = settings.peek
      var du = settings.duration
      var ti = settings.timing
      var er = settings.error
      var fo = settings.focus

      var cw = $(this).width()                            // container width

      var ix = $(this).children('.'+fo).index()           // index of focussed element

      $(this).css('overflow', 'hidden')

      $(el).css('display', 'block')
           .css('position', 'absolute')
           .css('top', 0)
           .css('width', wi)
           .css('margin', 0)
           .css('transition-property', 'width, left')
           .css('transition-duration', (du/1000)+'s, '+(du/1000)+'s')
           .css('transition-timing-function', ti+', '+ti)
           .css('-o-transition-property', 'width, left')
           .css('-o-transition-duration', (du/1000)+'s, '+(du/1000)+'s')
           .css('-o-transition-timing-function', ti+', '+ti)
           .css('-moz-transition-property', 'width, left')
           .css('-moz-transition-duration', (du/1000)+'s, '+(du/1000)+'s')
           .css('-moz-transition-timing-function', ti+', '+ti)
           .css('-webkit-transition-property', 'width, left')
           .css('-webkit-transition-duration', (du/1000)+'s, '+(du/1000)+'s')
           .css('-webkit-transition-timing-function', ti+', '+ti)
      
      // if no focus, set first to focused and update index
      if (ix == -1) {
        $(el).first().addClass(fo)
        ix = 0
      }

      // Hide all elements one after focussed
      $(el).filter(':gt('+(ix+1)+')').css('left', (cw+(wi-pk))+'px')

      var be = $(el).filter(':lt('+ix+')')                // Elements before focus
      var ae = $(el).filter(':gt('+ix+')').first()        // Elements after focus
      var bc = be.length                                  // Count of before elements
      var ac = ae.length                                  // Count of after elements

      var os = bc ? ((cw-wi)-(ac ? pk : 0))/bc : cw-wi    // Offset from left for before focus elements

      var pw = ((bc*wi) < (cw-wi) ? ((cw-(ac ? pk : 0))-(wi*bc)) : wi)

      var di = pw > wi ? (pw - wi) : 0

      $(el).first().css('width', pw+'px')

      $(be).each(function(index) {
        $(this).css('width', os+'px')
        if ((wi*bc) > (cw-wi)-(ac ? pk : 0)) {
          $(this).css('left', (os*index)+'px')
        } else {
          if (index)
            $(this).css('left', (pw+(wi*(index-1)))+'px')
        }
      })

      $(ae).css('left', (bc > 1 ? ((os*bc)+wi) : (cw-pk))+'px')
      $(this).children('.'+fo).css('left', (bc ? ((cw-(ac ? pk : 0))-wi) : 0)+'px')

    })

  }

})( jQuery );