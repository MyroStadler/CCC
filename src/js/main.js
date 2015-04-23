$(document).ready(function(){
  'use strict';
  var game = new Game(new View($('.game')), new HumanPlayer(0), 
      new SimulatedPlayer(1), 
      new Controls($('.score.p1'), $('.score.p2')), 
      new Model()
      .addOption('Rock', ['Crushes', 'Scissors', 'Crushes', 'Lizard'])
      .addOption('Paper', ['Covers', 'Rock', 'Disproves', 'Spock'])
      .addOption('Scissors', ['Cuts', 'Paper', 'Decapitates', 'Lizard'])
      .addOption('Lizard', ['Eats', 'Paper', 'Poisons', 'Spock'])
      .addOption('Spock', ['Vaporises', 'Rock', 'Crushes', 'Scissors']));
  $('.controls button.new-game').click(function(){
    game.stop();
    game.start();
  });
  $('.controls button.human').click(function(){
    game.stop();
    game.p1 = new HumanPlayer(0);
    game.simulationMode = false;
    game.start();
  });
  $('.controls button.ai').click(function(){
    game.stop();
    game.p1 = new SimulatedPlayer(0);
    game.simulationMode = true;
    game.start();
  });
});
