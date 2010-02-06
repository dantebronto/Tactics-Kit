class LevelsController < ApplicationController
  
  before_filter :authenticate!
  
  def show
    render :template => "levels/#{params[:id]}"
  end
end