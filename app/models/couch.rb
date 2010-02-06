class Couch
  
  class << self
    def db
      "http://localhost:5984/rpg"
    end
    
    def view(doc, params={})
      design, view = doc.split('/')
      query = "#{Couch.db}/_design/#{design}/_view/#{view}"
      query += "?" + params.to_query unless params.blank?
      query
    end
    
    def perform(query)
      query = query.join('/') if query.is_a?(Array)
      uri = "#{Couch.db}/#{query}"
      res = Curl::Easy.perform(uri)
      Yajl::Parser.new.parse(res.body_str) # returns if success
    rescue => e
      Rails.logger.error "CouchDB query encountered: \"#{e.message}\" (is Couch down?)"
      Rails.logger.error e.backtrace
      "{}"
    end
  end
  
end