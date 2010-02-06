class LoginController < ApplicationController
  
  skip_before_filter :require_user, :only => [:login, :new]
  
  layout "html"
  
  def login
    authenticate!(:my_strategy)
    redirect_to '/levels/1'
  end
  
  def logout
    request.env['warden'].logout
    redirect_to '/'
  end
  
  def new
    render :action => 'unauthenticated', :layout => !request.xhr?
  end
  
  # def unauthenticated
  #   flash[:error] = "Incorrect email/password combination"
  # 
  #   redirect_to new_user_session_url
  #   return false
  # end
  
end