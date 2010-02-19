class PartiesController < ApplicationController
  def update
    Player.save_party_and_inventory(params[:players], params[:inventory])
    render :text => 'ok'
  end
end