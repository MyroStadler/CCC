var SimulatedPlayer = function(playerIndex) {
  'use strict';
  var self = this;
  var timeoutId;
  self.maxDecisionSeconds = 1;
  self.pleaseChoose = function(game, useDelay, chosenCallback){
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function() {
      var index = game.getRandomChoice();
      var command = {};
      command['p' + (playerIndex + 1).toString()] = {selected: index};
      game.queue(command);
      chosenCallback.call(null, playerIndex, index);
    }, useDelay ? Math.random * self.maxDecisionSeconds * 1000 : 1);
  };
  return self;
};