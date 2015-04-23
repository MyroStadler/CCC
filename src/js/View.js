var View = function($game) {
  'use strict';
  // private
  var self = this;
  var renderPlayer = function(p, $player){
    if(p){
      $player.find('li a').removeClass('active');
      if(p.selected || p.selected === 0){
        $player.find('.item-' + p.selected + ' a').addClass('active');
      }
    }
  };
  // public
  self.$game = $game.html('');
  self.$p1 = $('<div class="p1"><p>Player 1 options: </p></div>');
  self.$p2 = $('<div class="p2"><p>Player 2 options: </p></div>');
  self.$message = $('<div class="message"></div>');
  self.populate = function(config){
    var name, option;
    var li = [];
    for(var i=0; i<config.order.length; i++){
      name = config.order[i];
      option = config.options[name];
      li.push('<li class="item-' + i + '"><a>' + name + '</a></li>');
    }
    self.$p1.append($('<ul>' + li.join('') + '</ul>'));
    self.$game.append(self.$p1);
    self.$p2.append($('<ul>' + li.join('') + '</ul>'));
    self.$game.append(self.$p2);
    self.$game.append(self.$message);
    return self;
  };
  self.render = function(o) {
    if(o.message){
      self.$message.html('<span>' + o.message + '</span>');
    }else{
      self.$message.html('&nbsp;');
      renderPlayer(o.p1, self.$p1);
      renderPlayer(o.p2, self.$p2);
    }
    return o;
  };
  self.activateClicks = function(playerIndex, clickedCallback){
    var $p = self['$p' + (playerIndex + 1).toString()];
    $p.find('li').click(function(){
      var $this = $(this);
      var index = Number($this.attr('class').split('item-')[1]);
      self.deactivateClicks(playerIndex);
      var command = {};
      command['p' + (playerIndex + 1).toString()] = {selected:index};
      self.render(command);
      clickedCallback.call(null, playerIndex, index);
    });
  };
  self.deactivateClicks = function(playerIndex){
    var $p = self['$p' + (playerIndex + 1).toString()];
    $p.find('li').unbind('click');
  };
  
  return self;
};