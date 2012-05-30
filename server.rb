require 'sinatra/base'
require_relative 'script_manager'

class MyApp < Sinatra::Base
  require 'barista'
  register Barista::Integration::Sinatra
  Barista.configure { |c| c.root = 'app' }
  
  set :views, 'app/views'
  set :public_folder, 'public'
  
  get '/' do
    erb :main # just the layout for now
  end
  
  run! if app_file == $0
end