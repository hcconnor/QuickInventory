 document.addEventListener("DOMContentLoaded", function(event){
    var canvas = document.getElementById('QuickInventory');
    var context = canvas.getContext('2d');
    var myElement = document.getElementById('myElement');

    // Warn if overriding existing method
    if(Array.prototype.equals)
        console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
    // attach the .equals method to Array's prototype to call it on any array
    Array.prototype.equals = function (array) {
        // if the other array is a falsy value, return
        if (!array)
            return false;

        // compare lengths - can save a lot of time
        if (this.length != array.length)
            return false;

        for (var i = 0, l=this.length; i < l; i++) {
            // Check if we have nested arrays
            if (this[i] instanceof Array && array[i] instanceof Array) {
                // recurse into the nested arrays
                if (!this[i].equals(array[i]))
                    return false;
            }
            else if (this[i] != array[i]) {
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }
        }
        return true;
    }
    // Hide method from for-in loops
    Object.defineProperty(Array.prototype, "equals", {enumerable: false});

    // var downD = false;
    // var downU = false;
    // var upL = false;
    // var upR = false;
    // var up = false;
    // var down = false;
    // var right = false;
    // var left = false;

    var combo1 = ["right", "up"];

    var timer = 0;
    var timerStart = false;

    var actions = [];


// create a simple instance
// by default, it only adds horizontal recognizers
    var mc = new Hammer(myElement);

// listen to events...
    mc.get("swipe").set({threshold: 100, direction: Hammer.DIRECTION_ALL });
    mc.on("swipe", function(eventObject) {
        var angle = eventObject.angle;
        if(angle < -100 && angle > -170) {
            timerStart = true;
            actions.push("upL")
            console.log("UPL");
            timer = 0;
        }
        else if (angle < -80 && angle > -100) {
            timerStart = true;
            actions.push("up")
            console.log("UP");
            timer = 0;
        }
        else if(angle < 20 && angle > - 20) {
            timerStart = true;
            actions.push("right")
            console.log("right");
            timer = 0;
        } else if(angle < 90) {
        //DOWN-RIGHT SWIPE...
        } else {
            //DOWN-LEFT SWIPE...
        }
        });

    function draw()
    {
        canvas.width = canvas.width; //clears the canvas
    }
    function update()
    {
        //console.log(timer);
        if(timerStart)
        {
            timer++;
        }
        if (timer > 30)
        {
            timer = 0;
            timerStart = false;
            if (actions.equals(combo1))
            {
                console.log("combo complete");
            }
            console.log("reset");
            resetDirections();
        }
        //resetDirections();
    }
    function game_loop()
    {
       update();
       draw();
    }
    function resetDirections()
    {
        actions = [];
    }

    setInterval(game_loop, 30);
});
