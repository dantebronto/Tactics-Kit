class CouchProxy
  
  def self.perform(query)
    query = query.join('/') if query.is_a?(Array)
    uri = "http://localhost:5984/#{query}"
    res = Curl::Easy.perform(uri)
    Yajl::Parser.new.parse(res.body_str) # returns if success
  rescue => e
    Rails.logger.error "CouchDB query encountered: \"#{e.message}\" (is Couch down?)"
    Rails.logger.error e.backtrace
    "{}"
  end
  
end