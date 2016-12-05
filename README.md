# on
function that easily adds the "on" listener to any object, in a jQuery fashion.
you can make any object to have the "on" functionality when it calls() onHandlers:
```javascript
onHandlers.call(this);
```

then you can just add the handling points in the object.
##example using HTML or making on a global
You need to modify the on.js source code, in the first line instead of being `module.exports=function(){`, it should be `onHandlers=function(){`
```html
<script src="on.js"></script>
<script>
console.log("click in the document");
//imagine we are making some sort of javascript library
var testob=(function(){
  //I make this just to get the "this" within a listener callback
  var parent=this;
  //whoever calls the onHandlers, gets the handling functionality
  onHandlers.call(this);
  document.addEventListener("click",function(){
    //by doing this single line, the testob effectively has a "clik" listener.
    parent.handle("clik");
  });
  this.do=function(){
    //by doing this single line, the testob effectively has a "doing" listener.
    this.handle("doing");
  }
  return this;
})();
//now we create the callback for the listeners.
testob.on("doing",function(){
  console.log("testob is doing!");
});
testob.on("clik",function(){
  console.log("testob is handling a click.... let's make it do()");
  testob.do();
});

</script>
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
