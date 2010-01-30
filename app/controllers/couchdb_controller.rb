require 'curb'
require 'yajl'

class CouchdbController < ApplicationController
  
  def query
    uri = "http://localhost:5984/#{params[:query].join('/')}"
    res = Curl::Easy.perform(uri)
    json = Yajl::Parser.new.parse(res.body_str)
    render :json => json
  end
  
end