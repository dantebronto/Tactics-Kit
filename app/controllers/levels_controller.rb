class LevelsController < ApplicationController
  
  layout "game"
  
  def show
    render :template => "levels/#{params[:id]}"
  end
  
end