class EnemiesController < ApplicationController
  def index
    render :action => 'index', :layout => false, :content_type => 'application/javascript'
  end
end