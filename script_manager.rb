class ScriptManager
  
  def self.minified_scripts
    all_scripts[2..-1]
  end
  
  def self.unminified_scripts
    all_scripts[0..1]
  end
  
  def self.all_scripts
    [
      '/javascripts/jquery.min.js',
      '/javascripts/jquery-ui.min.js',
      '/javascripts/jquery.cookie.js',
      '/javascripts/underscore.min.js',
      '/javascripts/base.js',
      '/javascripts/templates.js',
      '/javascripts/models/inventory.js',
      '/javascripts/models/burstable.js',
      '/javascripts/models/weapon.js',
      '/javascripts/models/level.js',
      '/javascripts/models/level/matrix.js',
      '/javascripts/models/level/map.js',
      '/javascripts/models/character/experience.js',
      '/javascripts/models/character/life_force.js',
      '/javascripts/models/character/actionable.js',
      '/javascripts/models/character/movable.js',
      '/javascripts/models/character/attacking.js',
      '/javascripts/models/character/path_finding.js',
      '/javascripts/models/character/special.js',
      '/javascripts/models/character.js',
      '/javascripts/models/player.js',
      '/javascripts/models/enemy.js',
      '/javascripts/models/engineer.js',
      '/javascripts/models/medic.js',
      '/javascripts/models/spawner.js',
      '/javascripts/models/wolf.js',
      '/javascripts/helpers/targeting_helper.js',
      '/javascripts/helpers/animation_helper.js',
      '/javascripts/main.js'
    ]
  end
end
