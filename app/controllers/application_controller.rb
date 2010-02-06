# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
  helper :all
  protect_from_forgery
  filter_parameter_logging :password
  before_filter :require_user
  
  def require_user
    unless user
      #flash[:notice] = "You must be logged in to access that page"
      redirect_to '/login/new/'
      return false
    end
  end
  
end
