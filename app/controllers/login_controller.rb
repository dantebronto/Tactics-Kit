class LoginController < ApplicationController
  
  layout "html"
  
  def login
    authenticate!
    redirect_to '/foo'
  end
  
  def logout
    request.env['warden'].logout
    redirect_to '/login/new'
  end
  
end