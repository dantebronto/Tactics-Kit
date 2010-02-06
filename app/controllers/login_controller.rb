class LoginController < ApplicationController
  
  layout "html"
  
  def login
    authenticate!
    redirect_to '/levels/1'
  end
  
  def logout
    request.env['warden'].logout
    redirect_to '/'
  end
  
  def new
    render :action => 'unauthenticated', :layout => false
  end
  
end