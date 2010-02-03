class LevelsController < ApplicationController
  def show
    #@level = params[:id] # use find
    render :template => "levels/#{params[:id]}"
  end
end