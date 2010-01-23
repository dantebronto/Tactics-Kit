class LevelsController < ApplicationController
  def show
    @level = params[:id] # use find
  end
end