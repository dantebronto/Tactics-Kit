# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_js_game_session',
  :secret      => 'b543333f2ece3e0b81fe993ad69fd98d86321dad2215ec2d73676de8182db12db965919e9ea85a6daa0136de6818e1c5713b449b88e8106141226b6aefb61475'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
