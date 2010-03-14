namespace :couch do
  
  desc "Create the CouchDB database"
  task :create_db do
    res = `curl -s http://localhost:5984`
    if $?.to_i != 0
      puts "CouchDB expected to be running but not found on http://localhost:5984"
      exit
    end
    
    res = `curl -s http://localhost:5984/rpg`
    if res =~ /not_found/
      `curl -s -X PUT "http://localhost:5984/rpg"`
      puts "CouchDB database created on http://localhost:5984/rpg"
    else
      puts "Database alreay exists"
    end
    
    Rake::Task[ "couch:create_views" ].execute
    
  end
  
  desc "Create CouchDB views from db"
  task :create_views do
    
    files = Dir.glob("#{Rails.root}/db/views/*.json") # all json views
    
    files.each do |file|
      design = file.gsub(/^.*\//, '').gsub('.json', '')
      `curl -s -X PUT -H 'Content-Type: application/json' -d @#{file} "http://localhost:5984/rpg/_design/#{design}"`
    end
    puts "Done"
  end
end