# on
function that easily adds the "on" listener to any object, in a jQuery fashion.
you can make any object to have the "on" functionality when it calls() onHandlers:
```javascript
OnHandlers.call(this);
```

then you can just add the handling points in the object.
##example using HTML or making on a global
You need to modify the on.js source code, in the first line instead of being `module.exports=function(){`, it should be `onHandlers=function(){`
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>On example</title>
  </head>
  <body>
    
      click in the document.
    <div id="console">

    </div>
 </body>
  <script src="on.js"></script>
  <script>
  console.log("click in the document");
  var consoleEl=document.getElementById('console');
  var testob=(function(){
    var self=this;
    this.count=10;
    OnHandlers.call(this);
    document.addEventListener("click",function(e){
      e.preventDefault();
      self.handle("click");
      count--;
    });
    this.do=function(){
      this.handle("doing");
    }
    return this;
  })();
  
  testob.on("click",function(){
    consoleEl.innerHTML+="<br>testob is handling a click. "+testob.count+" clicks to disable by name";
    if(testob.count<1){
      //you can disable events by event name, affecting every listener under that name
      testob.off("click");
    }
  });

  var refListener=testob.on("click",function(){
    // you can also disable events by reference, which will not affect the other events
    consoleEl.innerHTML+="<br>testob handler 2. "+(testob.count-5)+" clicks to disable by reference";
    if(testob.count<6){
      testob.off(refListener);
    }
  });

  </script>
</html>
```
##example using modular syntax
```javascript
let eemiter=require('onhandlers');
function myPrototype(){
  eemiter.call(this);
  //example of binding an event to this object
  this.on('creation', function(){console.log("I was created!");});
  //example of triggering an event, from the object.
  this.handle('creation');
}
let a = new myPrototype();
```
