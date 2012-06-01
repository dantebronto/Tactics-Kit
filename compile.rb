require_relative 'script_manager'

compile_command = "cat "
ScriptManager.unminified_scripts.each do |script|
  compile_command += "public#{script} "
end

compile_command += " > public/javascripts/game.min.js"
`#{compile_command}`

compile_command = "cat "
ScriptManager.minified_scripts.each do |script|
  compile_command += "public#{script} "
end
compile_command += " | uglify/UglifyJS/bin/uglifyjs -nm >> public/javascripts/game.min.js"

`#{compile_command}`
