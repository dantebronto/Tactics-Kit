namespace :couch do
  desc "Create CouchDB views from db"
  task :create_views do
    files = Dir.glob("#{Rails.root}/db/views/*.json") # all json views
    
    files.each do |file|
      design = file.gsub(/^.*\//, '').gsub('.json', '')
      `curl -X PUT -H 'Content-Type: application/json' -d @#{file} "http://localhost:5984/rpg/_design/#{design}"`
    end
    
  end
end