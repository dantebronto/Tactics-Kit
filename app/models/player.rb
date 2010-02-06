class Player
  
  def self.authenticate(login, pass)    
    req = Couch.view('player/authenticate', { :key => "[\"#{login}\", \"#{pass}\"]" } )
    stg = Curl::Easy.perform(req).body_str
    hsh = JSON.parse(stg)
    ( hsh['rows'] && hsh['rows'].first && hsh['rows'].first ) ? hsh['rows'].first : nil
  end
  
  def find(id)
    res = JSON.parse(Curl::Easy.perform("#{Couch.db}/#{id}"))
    res['error'] ? nil : res
  end
  
end