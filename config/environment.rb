RAILS_GEM_VERSION = '2.3.8' unless defined? RAILS_GEM_VERSION

require File.join(File.dirname(__FILE__), 'boot')

Rails::Initializer.run do |config|
  config.gem 'haml', :version => '2.2.8'
  config.gem 'curb'
  config.gem 'warden', :version => '0.9.0'
  config.gem 'rails_warden', :version => '0.3.0'

  config.frameworks -= [ :active_record ] #, :active_resource, :action_mailer ]

  config.time_zone = 'UTC'
end
