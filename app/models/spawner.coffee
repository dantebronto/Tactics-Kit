class RPG.Spawner extends RPG.Enemy
  
  constructor: (opts={}) ->
    super(opts)
    @maxSpawns = opts.maxSpawns or 20
  
  startTurn: ->
    super()
    level.queue(=> @characterSelected()).queue => @act()
  
  specialMove: (chancePct, cb) ->
    return false if chancePct > 50 or level.enemies.length > @maxSpawns
    level.queue =>
      return if @apLeft <= 0
      matrix = @findMovableNeighbors(@x, @y, 0)
      placementTarget = undefined
      matrix.each (x, y, val) =>
        placementTarget = [x, y] if val == 1 and level.canMoveTo(x, y)
    
      if placementTarget
        spawnLevel = if @level == 1 then 1 else @level - 1
        level.add new RPG.Enemy
          x: placementTarget[0], y: placementTarget[1]
          name: 'Dragon Man'
          level: spawnLevel
          sprite: '/images/dragonMan.gif'
        @endTurn()
    level.queue(5)
    true