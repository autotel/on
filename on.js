/*
repository of this module is at
https://github.com/autotel/on
*/
module.exports=function() {
  var eventVerbose=false;
  var debugVerbose=false;
  var owner=this;
  if (!this.ons) {
    //this.ons[evtName][evtSurname|0]=[evt]
    //evt=[removeFlag,callback]
    this.ons = [];
  }
  this.on = function(name, callback) {
    var sname = name.split(".");
    if (typeof callback === 'function') {
      if (sname.length == 0) {
        throw ("sorry, you gave an invalid event name");
      } else if (sname.length == 1) {
        if (!this.ons[name]) this.ons[name] = [];
        if (!this.ons[name][0]) this.ons[name][0] = [];
        this.ons[name][0].push([false, callback]);
        if(debugVerbose) console.log("add"+name+"[0]",callback,this.ons[name]);
      } else if (sname.length > 1) {
        if (!this.ons[sname[0]]) this.ons[sname[0]] = [];
        if (!this.ons[sname[0]][sname[1]]) this.ons[sname[0]][sname[1]] = [];
        this.ons[sname[0]][sname[1]].push([false, callback]);
        if(debugVerbose) console.log("add"+sname[0]+"["+sname[1]+"]",callback,this.ons[name]);
      }
      // console.log(this.ons);
    } else {
      throw ("error at event handler, provided callback that is not a function");
    }
    return this;
  }
  // this.once = function(name, callback) {
  //   var name = name.split(".");
  //   if (typeof callback === 'function') {
  //     if (name.length == 0) {
  //       throw ("sorry, you gave an invalid event name");
  //     } else if (name.length > 0) {
  //       if (!this.ons[name[0]]) this.ons[name[0]] = [];
  //       this.ons[name[0]].push([true, callback]);
  //     }
  //     // console.log(this.ons);
  //   } else {
  //     throw ("error at mouse.on, provided callback that is not a function");
  //   }
  //   return this;
  // }
  this.off = function(name) {
    var sname = name.split(".");
    if (name.length == 1) {
      delete this.ons[sname[0]][0];
    } else if (name.length > 1) {
      //remove all events that have been attached by addding name such as mouseover.ball
      delete this.ons[sname[0]][sname[1]];
    } else {
      throw ("sorry, you gave an invalid event name: " + name);
    }
    if(debugVerbose) console.log("rm",name,this.ons);
  }
  this.handle = function(fname, params) {
    if(eventVerbose) console.log("Event "+fname+":",{caller:this,params:params});
    if (this.ons[fname]) {
      for (var surname in this.ons[fname]) {
        for(var n in this.ons[fname][surname]){
          //pendant: how to make a better error handling? otherwise the function is bubbling the error to the handle() caller!!
          try{
            // console.log(this.ons[fname][n][1]);
            this.ons[fname][surname][n][1].call(owner,params);
            //if the flag is set to do once
            if(this.ons[fname][surname][n][0]){
              this.ons[fname][surname].splice(this.ons[fname][surname][n], 1);
            }
          }catch(e){
            throw ("onHandler: error with "+fname+" callback:",e);
          }
        }
      }
    }
  }
};
