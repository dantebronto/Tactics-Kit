class CouchProxy
  def self.perform(query_ara)
    uri = "http://localhost:5984/#{query_ara.join('/')}"
    res = Curl::Easy.perform(uri)
    json = Yajl::Parser.new.parse(res.body_str)
  rescue => e
    puts "CouchDB query encountered: \"#{e.message}\" (is Couch down?)"
    puts e.backtrace
    "{}"
  end
end