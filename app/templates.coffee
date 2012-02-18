class Templates
  constructor: ->
    $ =>
      @characterInfo = _.template($('#character-info-template').html())

window.TMPL = new Templates()