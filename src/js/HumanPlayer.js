var HumanPlayer = function(playerIndex) {
  'use strict';
  var self = this;
  self.pleaseChoose = function(game, useDelay, clickedCallback) {
    game.queue({message: 'Player 1, please choose an option'});
    game.view.activateClicks(playerIndex, clickedCallback);
  };
  return self;
};