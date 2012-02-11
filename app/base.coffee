_.templateSettings =
    interpolate: /\<\@\=(.+?)\@\>/gim
    evaluate: /\<\@(.+?)\@\>/gim
    
if console?.log?
  console.originalLog = console.log
  previousHeight = 80
  console.log = (msg) ->
    console.originalLog(msg)
    list = level.console
    li = $ "<li> #{msg} </li>"
    list.append(li).animate scrollTop: previousHeight += (li.height() + 10)