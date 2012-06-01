RPG.TargetingHelper = {}

RPG.TargetingHelper.closest = (toMe) ->
  araToCheck = if toMe.isTypeOf('Player') then level.enemies else level.players
  sorted = _(araToCheck).sortBy (chard) => toMe.chebyshevDistance(chard.x, chard.y)
  sorted[0]