// All the document element variables
var SVGNS = "http://www.w3.org/2000/svg",
    XLINKNS = "http://www.w3.org/1999/xlink";

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
        color : '#'+(Math.random()*0xFFFFFF<<0).toString(16) 
        //collision method?
    }
};

var initBall = function() {
    var b = makeBall();
    ballz.push(b);
    drawBall(b);
    printBallz();
};

var printBallz = function() {
    for (var i = 0; i < ballz.length; i++) {
        console.log(ballz[i]);
    }
};

var drawBall = function(b) {
    var c = document.createElementNS(SVGNS,"ball");
    c.setAttribute("cx",b.x);
    c.setAttribute("cy",b.y);
    c.setAttribute("r",2);
    c.setAttribute("fill",b.color);
    c.setAttribute("stroke","black");
    pic.appendChild(c);
}

var pic = document.getElementById("vimage"),
    ballbtn = document.getElementById("ball"),
    stopbtn = document.getElementById("stop");

var stopper = function() {
    clearAll();
    window.clearInterval(intervals[iCount - 1]);
    iCount--;
}

var clearAll = function() {
    var children = pic.children;
    for (var i = children.length - 1; i >= 0; i--) {
        pic.removeChild(children[i]);
    }
};

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
