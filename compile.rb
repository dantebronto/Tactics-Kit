require_relative 'script_manager' 
puts 

compile_command = "cat "
ScriptManager.all_scripts.each do |script|
  compile_command += "public#{script} "
end

compile_command += " | uglify/UglifyJS/bin/uglifyjs > public/javascripts/game.min.js"
puts compile_command
`#{compile_command}`
