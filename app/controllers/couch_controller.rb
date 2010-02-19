class CouchController < ApplicationController
  def query
    render :json => Couch.perform(params[:query], params[:startkey], params[:endkey])
  end
end