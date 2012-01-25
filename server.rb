require 'sinatra/base'

class MyApp < Sinatra::Base
  require 'barista'
  register Barista::Integration::Sinatra
  Barista.configure { |c| c.root = 'app' }
  
  set :views, 'app/views'
  
  get '/', do
    erb :'1.js'
  end
  
  run! if app_file == $0
end