var Game = function(view, p1, p2, controls, model) {
  'use strict';
  var self = this;
//  private
  var taskId = 0;
  var next = true;
  var q = [];
  var qInterval;
  var clickedCallback = function(playerIndex, index) {
    model.setChoiceByIndices(playerIndex, index);
    nextTask();
  };
  var nextTask = function() {
    switch(taskId){
      case 0:
        self.p1.pleaseChoose(self, self.simulationMode, clickedCallback);
        break;
      case 1:
        self.p2.pleaseChoose(self, false, clickedCallback);
        break;
      case 2:
        self.gameOver();
        break;
      case 3:
        controls.showScore(model.score.p1, model.score.p2, model.totalGames);
        break;
    }
    taskId = (taskId + 1) % 4;
  };
//  public
  self.view = view.populate(model);
  self.p1 = p1;
  self.p2 = p2;
  self.simulationMode = false;
  self.queueIntervalSeconds = 0.25;
  self.start = function() {
    clearInterval(qInterval);
    qInterval = setInterval(function(){
      if(next && q.length){
        var command = q.shift();
        if(command.task){
          nextTask();
        }else{
          self.view.render(command);
        }
      }
    }, self.queueIntervalSeconds * 1000);
    taskId = 0;
    q = [];
    q.push({p1:{}, p2:{}});
    q.push({task:true});
    next = true;
  };
  self.stop = function() {
    clearInterval(qInterval);
    self.view.render({message: 'Welcome'});
  };
  self.queue = function(command){
    q.push(command);
  };
  self.gameOver = function() {
    self.queue({message:model.getResults()});
    self.queue({task: true});
  };
  self.getRandomChoice = function() {
    return model.getRandomChoice();
  };
  self.stop();
  return self;
};