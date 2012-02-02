class window.Weapon
  constructor: (opts={}) ->
    @range = opts.range or 1
    @attack = opts.attack or 1
    
    # implement these
    @isRanged = opts.isRanged or false
    @deadRange = opts.deadRange or 1
    @name = opts.name or 'A Stick'