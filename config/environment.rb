RAILS_GEM_VERSION = '2.3.5' unless defined? RAILS_GEM_VERSION

require File.join(File.dirname(__FILE__), 'boot')

Rails::Initializer.run do |config|
  config.gem 'haml',         :version => '2.2.8'
  config.gem 'curb',         :version => '0.5.4.0'
  config.gem 'yajl-ruby',    :version => '0.6.6', :lib => 'yajl'
  config.gem 'rails_warden', :version => '0.3.0'

  config.frameworks -= [ :active_record ] #, :active_resource, :action_mailer ]

  config.time_zone = 'UTC'
end