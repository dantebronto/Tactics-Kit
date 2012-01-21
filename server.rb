require 'barista'
require 'sinatra/base'

class MyApp < Sinatra::Base
  
  register Barista::Integration::Sinatra
  
  Barista.configure do |c|
    c.root = 'app/*'
  end
  
  set :views, 'levels'
  
  get '/', do
    erb :'1.js'
  end
  
  # start the server if ruby file executed directly
  run! if app_file == $0
end




# get '/:level.html' do
#   erb "#{params[:level]}.js".to_sym
# end
# 
