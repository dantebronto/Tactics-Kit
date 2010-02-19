class Couch
  
  class << self
    def db
      "http://localhost:5984/rpg/"
    end
    
    def view(doc, params={})
      design, view = doc.split('/')
      query = "#{Couch.db}_design/#{design}/_view/#{view}"
      query += "?" + params.to_query unless params.blank?
      query
    end
    
    def get(uri)
      uri = "#{Couch.db}#{uri}" unless uri.include?("http://")
      Rails.logger.info("CouchDB request: #{uri}")
      res = Curl::Easy.perform(uri)
      Yajl::Parser.new.parse(res.body_str)
    end
    
    def perform(query, startkey=nil, endkey=nil)
      query = query.join('/') if query.is_a?(Array)
      query += "?startkey=#{startkey}" if startkey
      query += "&endkey=#{endkey}" if endkey
      get(query)
    rescue => e
      Rails.logger.error "CouchDB query encountered: \"#{e.message}\" (is Couch down?)"
      Rails.logger.error e.backtrace
      "{}"
    end
  end
  
end