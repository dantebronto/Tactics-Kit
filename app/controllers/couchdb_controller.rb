require 'curb'
require 'yajl'

class CouchdbController < ApplicationController
  
  def query
    res = CouchProxy.perform(params[:query])
    render :json => res
  end
  
end