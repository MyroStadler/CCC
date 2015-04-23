var Controls = function($pScore1, $pScore2) {
  'use strict';
  var self = this;
  
//  private
 
//  public
  self.showScore = function(score1, score2, total){
    $pScore1.html('Player 1: ' + score1.toString() + ' / ' + total.toString());
    $pScore2.html('Player 2: ' + score2.toString() + ' / ' + total.toString());
  };
  return self;
};