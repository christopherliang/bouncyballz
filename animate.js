// All the document element variables
var SVGNS = "http://www.w3.org/2000/svg",
    XLINKNS = "http://www.w3.org/1999/xlink";

var pic = document.getElementById("vimage"),
    circlebtn = document.getElementById("circle"),
    dvdbtn = document.getElementById("dvd"),
    stopbtn = document.getElementById("stop"),
    // Canvas and other variables
    radius = 0,
    growing = true,
    pColor = "red",
    stop = false,
    intervals = [],
    iCount = 0,
    intervalID,
    x = 250,
    y = 250,
    cx = 1.8,
    cy = -1;

// Draw function
var drawDot = function() {
    var c = document.createElementNS(SVGNS,"circle");
    c.setAttribute("cx",250);
    c.setAttribute("cy",250);
    c.setAttribute("r",0);
    c.setAttribute("fill","yellow");
    c.setAttribute("stroke","black");
    pic.appendChild(c);
    grow();
};

var grow = function() {
    var c = document.createElementNS(SVGNS,"circle");
    animateCode = function() {
        c = document.getElementsByTagName("circle")[0];
        radius = parseInt(c.getAttribute("r"));
        if (!stop) {
            if (growing == true) {
                if (radius < 250) {
                    radius++;
                } else {
                    growing = false;
                    pColor='#'+(Math.random()*0xFFFFFF<<0).toString(16); 
                }
            } else {
                if (radius == 0) {
                    growing = true;
                    pColor='#'+(Math.random()*0xFFFFFF<<0).toString(16); 
                } else {
                    radius--;
                }
            }
        } else {
            stop = false;
        }
        c.setAttribute("r",radius.toString());
        c.setAttribute("fill",pColor);
    }
    intervalID = window.setInterval(animateCode,16);
    intervals[iCount] = intervalID;
    iCount++;
}

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
circlebtn.addEventListener("click", drawDot);
stopbtn.addEventListener("click", stopper);
dvdbtn.addEventListener("click", logo_init);
