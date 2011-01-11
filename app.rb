require 'sinatra'

set :views, 'levels'

get '/', do
  erb :'1.js'
end

get '/:level.html' do
  erb "#{params[:level]}.js".to_sym
end

