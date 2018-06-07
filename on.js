/*
you make the onHandlers.call(this) in the object that needs to have handlers.
then you can create a function callback for that object using object.on("handlerName.optionalName",callbackFunction(){});
the object can run the handle callbacks by using this.handle("handlerName",parametersToFeed);
*/
var OnHandlers=function() {
  var eventVerbose=false;
  var self=this;
  var CallbackObject=function(callback){
    this.callback=callback;
  }
  if (!this.ons) {
    this.ons = [];
  }
  this.on = function(name, callback) {
    var name = name.split(" ");
    if (typeof callback === 'function') {
      if (name.length == 0) {
        throw ("sorry, you gave an invalid event name");
        return false;
      } else if (name.length > 0) {
        var unique=new CallbackObject(callback);
        for(var evtName of name){
          if (!self.ons[evtName]) self.ons[evtName] = [];
          self.ons[evtName].push(unique);
        }
        return unique;
      }
    } else {
      throw ("error at mouse.on, provided callback that is not a function");
      return false;
    }
  }
  this.off = function(name) {
    if (typeof name == "string") {
      var nameList=name.split(" ");
      for(var name of nameList){
        this.ons[name] = [];
      }
    } else if (name instanceof CallbackObject) {
      //console.log("off by ref");
      for(var evtListNameItem in self.ons){
        //console.log(evtListNameItem)
        for(var evtNum in self.ons[evtListNameItem]){
          //console.log(evtNum);
          if(name===self.ons[evtListNameItem][evtNum]) self.ons[evtListNameItem].splice(evtNum,1);
        }
      }
    } else {
      throw ("sorry, you gave an invalid listener reference: ",name);
    }
  }
  this.handle = function(fname, params) {
    if(eventVerbose) console.log("Event "+fname+":",{caller:this,params:params});
    if (self.ons[fname]) {
      for (var n in self.ons[fname]) {
        // console.log(self.ons[fname][n][1]);
        self.ons[fname][n].callback(params);
      }
    }
  }
};
module.exports=OnHanlders;
