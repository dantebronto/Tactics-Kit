class window.Weapon
  constructor: (opts={}) ->
    @range = opts.range || 1
    @attack = opts.attack || 1