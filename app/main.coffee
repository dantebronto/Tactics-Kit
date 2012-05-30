if RPG.Level? then do ->
  # Determine the level to show. First from params, then cookie, then 1
  level = 1
  try
    ara = window.location.search.split("=")
    level = ara[ara.length-1]
    level = $.cookie('lastLevel') || 1 if level == ''
  catch ex
    console.log ex
  
  $.getScript("/javascripts/levels/#{level}.js")