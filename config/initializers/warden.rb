Rails.configuration.middleware.use RailsWarden::Manager do |manager|
  manager.default_strategies :my_strategy
  manager.failure_app = LoginController
end

# Setup Session Serialization
class Warden::SessionSerializer
  def serialize(player)
    player['id'] || player['_id']
  end

  def deserialize(id)
    Player.find(id)
  end
end

# Declare your strategies here
Warden::Strategies.add(:my_strategy) do
  
  def valid?
    params[:email] || params[:password]
  end
   
  def authenticate!
    p = Player.authenticate(params[:login], params[:password])
    p.nil? ? fail!("Could not log in") : success!(p)
  end
  
end