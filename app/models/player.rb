class Player
  
  def self.authenticate(login, pass)    
    req = Couch.view('player/authenticate', { :key => "[\"#{login}\", \"#{pass}\"]" } )
    stg = Curl::Easy.perform(req).body_str
    hsh = JSON.parse(stg)
    ( hsh['rows'] && hsh['rows'].first && hsh['rows'].first ) ? hsh['rows'].first : nil
  end
  
  def self.find(id)
    res = JSON.parse(Curl::Easy.perform("#{Couch.db}/#{id}").body_str)
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
    stg = Curl::Easy.perform(req).body_str
    JSON.parse(stg)['rows'].blank?
  end
  
end