class Player
  
  def self.authenticate(login, pass)    
    req = "http://localhost:5984/rpg/_design/player/_view/authenticate?key=[\"#{login}\",\"#{pass}\"]"
    stg = Curl::Easy.perform(req).body_str
    hsh = JSON.parse(stg)
    ( hsh['rows'] && hsh['rows'].first && hsh['rows'].first ) ? hsh['rows'].first : nil
  end
  
  def find(id)
    res = JSON.parse(Curl::Easy.perform("http://localhost:5984/rpg/#{id}"))
    res['error'] ? nil : res
  end
  
end