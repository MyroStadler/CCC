var Model = function() {
  'use strict';
  var self = this;
  
//  private
  var ensure = function(object, prop, def) {
    if(!object.hasOwnProperty(prop)){
      object[prop] = def;
    }
  };
//  public
  self.options = {};
  self.order = [];
  self.totalGames = 0;
  self.score = {p1: 0, p2: 0};
  self.choices = {p1: 0, p2: 0};
  // to make the options extensible, second param is alternating strings
  //  winningAction and onSubject
  self.addOption = function(name, winningActionOnSubjectArray){
    var option = {};
    var winningAction, onSubject;
    for(var i=0; i<winningActionOnSubjectArray.length; i+=2){
      winningAction = winningActionOnSubjectArray[i];
      onSubject = winningActionOnSubjectArray[i + 1];
      option[onSubject] = winningAction;
    }
    self.options[name] = option;
    self.order.push(name);
    return self;
  };
  self.getRandomChoice = function() {
    return Math.floor(Math.random() * self.order.length);
  };
  self.setChoiceByIndices = function(playerIndex, choiceIndex){
    self.choices['p' + (playerIndex + 1)] = choiceIndex;
  };
  self.getResults = function() {
    self.totalGames++;
    if(self.choices.p1 === self.choices.p2) {
      return 'Tie!';
    }
    var name1 = self.order[self.choices.p1];
    var option1 = self.options[name1];
    var name2 = self.order[self.choices.p2];
    var option2 = self.options[name2];
    var actor, verb, subject;
    if(option1[name2]){
      actor = name1;
      verb = option1[name2];
      subject = name2;
      self.score.p1++;
      return 'Player 1 wins: ' + actor + ' ' + verb + ' ' + subject;
    }else{
      actor = name2;
      verb = option2[name1];
      subject = name1;
      self.score.p2++;
      return 'Player 2 wins: ' + actor + ' ' + verb + ' ' + subject;
    }
  };
  // return an array of failures or true
  self.test = function() {
    var data = {keys:[], names:{}};
    var errors = [];
    var option, name, subject;
    // collect...
    for(name in self.options){
      option = self.options[name];
      data.keys.push(name);
      ensure(data.names, name, {for: 0, against: 0});
      for(subject in option){
        data.names[name].for++;
        ensure(data.names, subject, {for: 0, against: 0});
        data.names[subject].against++;
      }
    }
    // ...and validate
    var len = data.keys.length;
    var exactWeight = (len - 1) / 2;
    if(len < 3){
      errors.push('The game must have at least 3 options, you provided ' + 
          len.toString());
    }
    if(len % 2 === 0){
      errors.push('The game must have an odd number of options, you provided ' + 
          len.toString());
    }
    for(name in data.names){
      if(data.names[name].for !== exactWeight){
        errors.push(name + ' should have exactly ' + exactWeight + 
            ' weighted for it, you provided ' + data.names[name].for);
      }
      if(data.names[name].against !== exactWeight){
        errors.push(name + ' should have exactly ' + exactWeight + 
            ' weighted against it, you provided ' + data.names[name].against);
      }
    }
    // TODO: loose coupling of names as strings implies what in terms of failures?
    return errors.length ? errors : true;
  };
  
  return self;
};