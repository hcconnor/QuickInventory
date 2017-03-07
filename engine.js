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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var startHP = true;

    var combo1 = ["dR", "upR"];
    var c1 = false;
    var combo2 = ["dL", "right", "upL"];
    var c2 = false;
    var combo3 = ["right", "down", "left", "upR"]
    var c3 = false;
    var combo4 = ["upR", "upR", "upR", "dR"];
    var c4 = false;
    var combo5 = ["down", "dR", "left", "upR"];
    var c5 = false;

    var timer = 0;
    var timerStart = false;

    var actions = [];


// create a simple instance
// by default, it only adds horizontal recognizers
    var options = {
        preventDefault: true,
        dragLockToAxis: true,
        dragBlockHorizontal: true
    };
    var mc = new Hammer(QuickInventory, options);

// listen to events...
    mc.get("swipe").set({threshold: 100, direction: Hammer.DIRECTION_ALL });
    mc.on("swipe", function(eventObject) {
        var angle = eventObject.angle;
        if(angle < -110 && angle > -170) {
            timerStart = true;
            actions.push("upL")
            console.log("UPL");
            timer = 0;
        }
        else if (angle < -80 && angle > -110) {
            timerStart = true;
            actions.push("up")
            console.log("UP");
            timer = 0;
        }
        else if(angle < 20 && angle > - 20) {
            timerStart = true;
            actions.push("right");
            console.log("right");
            timer = 0;
        }
        else if(angle > 110 && angle < 160) {
            //DOWN-left SWIPE...
            timerStart = true;
            actions.push("dL");
            console.log("Down Left");
            timer = 0;
        }
        else if(angle < -20 && angle > -170) {
            //Up-right SWIPE...
            timerStart = true;
            actions.push("upR");
            console.log("Up Right");
            timer = 0;
        }
        else if(angle < 70 && angle > 20) {
            //dR SWIPE...
            timerStart = true;
            actions.push("dR");
            console.log("Down Right");
            timer = 0;
        }
        else if(angle > 70 && angle < 110){
            //DOWN...
            timerStart = true;
            actions.push("down");
            console.log("down");
            timer = 0;
        }
        else {
            //left
            timerStart = true;
            actions.push("left");
            console.log("left");
            timer = 0;
        }
        });

    function draw()
    {
        canvas.width = canvas.width; //clears the canvas

        context.drawImage(background, background.X, background.Y, background.width, background.height);
        context.drawImage(character, character.X, character.Y, character.width, character.height);
        if (startHP)
        {
                context.drawImage(lowHP, lowHP.X, lowHP.Y, lowHP.width, lowHP.height);
        }
        if(c2)
        {
            context.drawImage(clothes, clothes.X, clothes.Y, clothes.width, clothes.height);
        }
        if(c3)
        {
            context.drawImage(boots, boots.X, boots.Y, boots.width, boots.height);
        }
        if(c4)
        {
            context.drawImage(gloves, gloves.X, gloves.Y, gloves.width, gloves.height);
        }
        if(c1)
        {
            context.drawImage(swordL, swordL.X, swordL.Y, swordL.width, swordL.height);
            context.drawImage(swordR, swordR.X,swordR.Y, swordR.width, swordR.height);
        }
        if (c5)
        {
            context.drawImage(highHP, highHP.X, highHP.Y, highHP.width, highHP.height);
            context.drawImage(potionGlow, potionGlow.X, potionGlow.Y, potionGlow.width, potionGlow.height);
        }
        context.font = "30px Arial";
        context.fillText("V. 0.86",800,50);
    }
    function update()
    {
        if(timerStart)
        {
            timer++;
        }
        if (timer > 15)
        {
            timer = 0;
            timerStart = false;
            if (actions.equals(combo1))
            {
                console.log("combo complete");
                c1 = true;
            }
            if (actions.equals(combo2))
            {
                console.log("combo complete");
                c2 = true;
            }
            if (actions.equals(combo3))
            {
                console.log("combo complete");
                c3 = true;
            }
            if (actions.equals(combo4))
            {
                console.log("combo complete");
                c4 = true;
            }
            if (actions.equals(combo5))
            {
                startHP = false;
                console.log("combo complete");
                c5 = true;
            }
            console.log("reset");
            resetDirections();
        }
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
