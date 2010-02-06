class LoginController < ApplicationController
  
  skip_before_filter :require_user, :only => [:login, :new, :unauthenticated]
  
  def login
    authenticate!(:my_strategy)
    redirect_to '/levels/1'
  end
  
  def logout
    warden.logout
    redirect_to '/'
  end
  
  def new
    render :action => 'new', :layout => !request.xhr?
  end
  
  def unauthenticated
    flash[:notice] = "Incorrect login/password combination"
  
    redirect_to '/login/new/'
    return false
  end
  
end