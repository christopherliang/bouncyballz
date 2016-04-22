// All the document element variables
var SVGNS = "http://www.w3.org/2000/svg",
    XLINKNS = "http://www.w3.org/1999/xlink";

// Buttons
var makeButton = document.getElementById("makeBall");
var stopButton = document.getElementById("stop");
var startButton = document.getElementById("start");
var clearButton = document.getElementById("clear");

var intervalID;

var ballz = []

var makeBall = function() {
    return {
        //random int between 0 and 500
        x : Math.floor(Math.random() * (500 - 0 + 1)) + 0,
        y : Math.floor(Math.random() * (500 - 0 + 1)) + 0,
        //random int between -3 and 3
        dx : Math.floor(Math.random() * (3 - (-3) + 1)) -3,
        dy : Math.floor(Math.random() * (3 - (-3) + 1)) -3,
        //random color
        color : '#'+(Math.random()*0xFFFFFF<<0).toString(16),
	//random size
	r : Math.floor(Math.random() * (20)) + 2,
        //calculates new vel. Needs adjustment so that if x or y 
	//goes past 500 by too much, 
	calcVel : function() {
	    if (this.x == 0 || this.x == 500 - this.r) {
		this.dx *= -1;
            } if (this.y == 0 || this.y == 500 - this.r) {
		this.dy *= -1;
            }
	    
	}
    }
};

//Initializes ball
var initBall = function(e) {
    var b = makeBall();
    ballz.push(b);
    drawBall(b);
    printBallz();
};

//Prints ballz to console
var printBallz = function() {
    for (var i = 0; i < ballz.length; i++) {
        console.log(ballz[i]);
    }
};

//Ball Animation
var animateBallz = function(e) {
    window.clearInterval(intervalID);
    //Erasing old balls doesn't seem to work
    while (pic.lastChild) {
	pic.removeChild(pic.lastChild);
    };
    //Function that moves ball
    var animateCode = function() {
	for (var i = 0; i < ballz.length; i++) {
	    var ball = ballz[i];
	    ball.calcVel();
	    ball.x += ball.dx
	    ball.y += ball.dy
	    drawBall(ball);
	}
    };
    //Animattion
    intervalID = window.setInterval(animateCode, 16);
};

//Function to draw ball to svg
var drawBall = function(b) {
    var c = document.createElementNS(SVGNS,"circle");
    c.setAttribute("cx",b.x);
    c.setAttribute("cy",b.y);
    c.setAttribute("r",b.r);
    c.setAttribute("fill",b.color);
    c.setAttribute("stroke","black");
    pic.appendChild(c);
}

var pic = document.getElementById("vimage")

//Stops svg
var stopper = function(e) {
    //clearAll();
    window.clearInterval(intervalID);
    //iCount--;
}

var clearAll = function(e) {
    var children = pic.children;
    for (var i = children.length - 1; i >= 0; i--) {
        pic.removeChild(children[i]);
    }
};

makeButton.addEventListener("click", initBall);
startButton.addEventListener("click", animateBallz);
stopButton.addEventListener("click", stopper);
clearButton.addEventListener("click", clearAll);
//Initializes DVD animation
var logo_init = function() {
    var c = document.createElementNS(SVGNS,"image");
    clearAll();

    //Propulsion mechanism
    var bounce = function() {
        if (!stop) {
            if ((x >= 430) || (x <= -10)) {
                cx = -cx;
            }
            if ((y >= 460) || (y <= -10)) {
                cy = -cy;
            }
            x += cx;
            y += cy;
        } else {
            stop = false;
        }
        c.setAttribute("x",x);
        c.setAttribute("y",y);
        c.setAttribute("width","80");
        c.setAttribute("height","45");
        c.setAttributeNS(XLINKNS,"href","dvd_logo.jpg");
        
        pic.appendChild(c);
    }
    intervalID = window.setInterval(bounce,16);
    intervals[iCount] = intervalID;
    iCount++;
}

//Event listeners
