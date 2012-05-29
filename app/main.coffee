if RPG.Level? then do ->
  try
    ara = window.location.search.split("=")
    level = ara[ara.length-1]
    level = 1 if level == ''
  catch ex
    console.log ex
  
  level = $.cookie('lastLevel') or 1 if isNaN level
  $.getScript("/javascripts/levels/#{level}.js")