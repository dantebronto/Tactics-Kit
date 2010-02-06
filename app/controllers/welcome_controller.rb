class WelcomeController < ApplicationController
  
  skip_before_filter :require_user
  
  layout false
  
  def index; end
end