class PlayersController < ApplicationController
  
  skip_before_filter :require_user
  
  def new
    render :template => 'players/new', :layout => !request.xhr?
  end
  
  def create
    res = Player.create({ :login => params[:login], :password => params[:password] })
    if res == "not unique"
      flash[:notice] = "Login already taken. Please try again."
      render :action => 'new'
    else
      authenticate!(:my_strategy)
      redirect_to '/levels/1'
    end
  end
end