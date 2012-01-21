require 'sinatra/base'

class MyApp < Sinatra::Base

  # if ['development', 'test'].include?(ENV['RACK_ENV'])
    puts 'barista!'
    require 'barista'
    register Barista::Integration::Sinatra
    Barista.configure { |c| c.root = 'app' }
  # end
  
  set :views, 'app/views'
  
  get '/', do
    erb :'1.js'
    # erb :'1.js'
  end
  
  # start the server if ruby file executed directly
  run! if app_file == $0
end