class ApplicationController < ActionController::Base
  helper :all
  protect_from_forgery
  filter_parameter_logging :password
  before_filter :require_user
  
  def require_user
    unless user
      flash[:notice] = "Please login"
      redirect_to '/login/new/'
      return false
    end
  end
  
end
