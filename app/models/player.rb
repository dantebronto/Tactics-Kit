class Player
  
  def self.authenticate(login, pass)    
    req = Couch.view('player/authenticate', { :key => "[\"#{login}\", \"#{pass}\"]" } )
    hsh = Couch.get(req)
    ( hsh['rows'] && hsh['rows'].first && hsh['rows'].first ) ? hsh['rows'].first : nil
  end
  
  def self.find(id)
    res = Couch.get("/#{id}")
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
  
end