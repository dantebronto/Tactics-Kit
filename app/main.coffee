if RPG.Level? then do ->
  try
    pathParts = _(window.location.pathname.split('/')).reject (x) -> x.length == 0
    level = Number(pathParts[pathParts.length-1])
  catch ex
    console.log ex
  
  level = $.cookie('lastLevel') or 1 if isNaN level
  $.getScript("/javascripts/levels/#{level}.js")