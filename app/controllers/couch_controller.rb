class CouchController < ApplicationController
  
  def query
    res = Couch.perform(params[:query])
    render :json => res
  end
  
end