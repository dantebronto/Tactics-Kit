class LevelsController < ApplicationController
  
  def show
    render :template => "levels/#{params[:id]}"
  end
  
end