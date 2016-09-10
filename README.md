# on
function that easily adds the "on" listener to any object, in a jQuery fashion.
you can make any object to have the "on" functionality when it calls() onHandlers:
```javascript
onHandlers.call(this);
```
then you can just add the handling points in the object.
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
some more purposeful examples may be displayed in future pushes
