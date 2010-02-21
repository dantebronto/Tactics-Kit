class Player
  
  def self.authenticate(login, pass)    
    req = Couch.view('player/authenticate', { :key => "[\"#{login}\", \"#{pass}\"]" } )
    hsh = Couch.get(req)
    ( hsh['rows'] && hsh['rows'].first && hsh['rows'].first ) ? hsh['rows'].first : nil
  end
  
  def self.find(id)
    res = Couch.get("#{id}")
    res['error'] ? nil : res
  end
  
  def self.create(hsh)
    return "not unique" unless Player.login_unique?(hsh[:login])
    player = Curl::Easy.new(Couch.db)
    hsh.merge!(:type => 'player')
    player.http_post(hsh.to_json)
  end
  
  def self.login_unique?(login)
    req = Couch.view('player/authenticate', { :startkey => "[\"#{login}\"]", :endkey => "[\"#{login}\", {}]" } )
    res = Couch.get(req)
    res['rows'].blank?
  end
  
  def self.save_party_and_inventory(party, inventory)
    player_id = ''
    
    party.each do |char|
      p_hash = JSON.parse(char)
      player_id = p_hash['player_id']
      if p_hash['_id']
        Curl::Easy.http_put("#{Couch.db}#{p_hash['_id']}", char)
      else
        Curl::Easy.http_post("#{Couch.db}", char)
      end
    end
    
    # get the inventory's id
    req = Couch.view('inventory/by_player_id', {:key => "\"#{player_id}\""})
    res = Curl::Easy.perform(req).body_str
    old_inventory = JSON.parse(res)['rows'].first
    
    if old_inventory
      old_inventory = old_inventory['value']
      inventory_id = old_inventory['_id']
      old_inventory['inventory'] = JSON.parse(inventory)
      Curl::Easy.http_put("#{Couch.db}#{inventory_id}", old_inventory.to_json)
    else
      Curl::Easy.http_post("#{Couch.db}", { 
        'player_id' => player_id, 
        'inventory' => JSON.parse(inventory) 
      }.to_json)
    end
  end
  
end