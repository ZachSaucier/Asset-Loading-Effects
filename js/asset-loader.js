// For more check out zachsaucier.com

// Detect browser agent animation ability
var UA = window.navigator.userAgent,
    isIE = UA.indexOf("MSIE") > 0 || UA.indexOf("Trident") > 0,
    isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0,
    assetElems = document.querySelectorAll(".ale"), // The elements that are the to be used for the asset
    urlCreator = window.URL || window.webkitURL, // For URL creator usage later
    count = 0;

// Add the asset loading effect for each element
[].forEach.call(assetElems, loadAsset);

// Load the asset in the way specified by the data attribute
function loadAsset(elem) {
    // Determine which loader to create
    var type = elem.getAttribute("data-ale-type"), // Must be before getProgressBarElem()
        progressBarElem = getProgressBarElem(),
        assetLoc = elem.getAttribute("data-ale-src"),
        isVid = elem.getAttribute("data-ale-is-vid") != undefined ? elem.getAttribute("data-ale-is-vid") : false,
        mySVG, // Keep a scoped reference so we don't have to get it in the animation loop
        myInnerShape;

    // Change the video location for Safari if need be
    if(isVid 
       && isMac 
       && elem.getAttribute("data-ale-src-backup") != undefined
       && !/chrome/.test(UA.toLowerCase()))
        assetLoc = elem.getAttribute("data-ale-src-backup");

    // Load the asset via XHR so that we can track the progress    
    var req = new XMLHttpRequest();
    // Attach the finished load listener
    req.onload = loadFinished;
    // Attach the progress listener
    req.onprogress = loading; 
    // Actually make the request
    req.open('GET', assetLoc + '?' + Math.random(), true); // REMOVE `+ '?' + Math.random()` IN PRODUCTION!
    req.responseType = 'blob'; // This must be after the open - FF can't handle do it before https://bugzilla.mozilla.org/show_bug.cgi?id=1110761
    req.send();

    // Determine which progress bar to use given the data attribute and return it
    function getProgressBarElem() {
        // Choose the progress bar type based on the ale-type
        if (type === "line-top" 
            || type === "line-flat-top" 
            || type === "fill-left" 
            || type === "diagonal") {
            var line = new ProgressBar.Line(elem);

            // Fix an IE issue
            if (type === "line-top") 
                line.svg.setAttribute("preserveAspectRatio", "xMinYMin");
            else if (type === "diagonal") 
                line.svg.setAttribute("preserveAspectRatio", "xMinYMid");
            return line;
        } else if(elem.style.clipPath === "" 
                  && !isIE 
                  && !/chrome/.test(UA.toLowerCase())) {

            // Fix a Safari rendering issue
            elem.style.webkitTransform = "translateZ(1px)";

            if (type === "square") {            
                // Set the clip path to the one dynamically generated
                var IDNum = createSquareSVG();
                elem.setAttribute("data-ale-svgid", "squareSVG" + IDNum);
                elem.style.webkitClipPath = "url(#clipPath" + IDNum + ")";
                elem.style.clipPath = "url(#clipPath" + IDNum + ")";
            } else if(type === "ring") {
                // Set the clip path to the one dynamically generated
                var IDNum = createCircleSVG();
                elem.setAttribute("data-ale-svgid", "circleSVG" + IDNum);
                elem.style.webkitClipPath = "url(#clipPath" + IDNum + ")";
                elem.style.clipPath = "url(#clipPath" + IDNum + ")";
            }
        }

        // IE doesn't support any type of clip path on HTML content, so we need to fall back
        if(isIE && elem.className.indexOf("isIE") <= 0)
            elem.className += " isIE";

        if(type === "square") {
            return new ProgressBar.Square(elem, {
                strokeWidth: 10
            });
        } else if (type === "ring" || type === "corner-ring") {
            var ring = new ProgressBar.Circle(elem, {
                strokeWidth: 10
            });
            // Fix another IE issue
            ring.svg.setAttribute("preserveAspectRatio", "xMidYMid");
            return ring;
        } else 
            console.log("The given type ", type, " is unrecognized.");
    }

    // Update the progress bar with the current value
    var toggle = true;

    function loading(evt) {
        if (evt.lengthComputable) {
            // ProgressBar.js animates using 0.0-1.0 as a range, so we need the progress in terms of that
            progressBarElem.animate(evt.loaded / evt.total);
            if(isIE) {
                // Force subtle background change to fix an IE rendering issue
                document.body.style.backgroundColor = toggle ? '#F7F6E2' : '#F7F5E2';
                toggle = !toggle;
            }
        }
    }

    // Add the completed class when the asset is done loading and show the asset
    function loadFinished() {
        // Currently, if it's not a video it's an image
        if(!isVid) {
            // Create a URL for the given response
            var imgUrl = urlCreator.createObjectURL(req.response);
            // Set that URL as the background of the element given
            elem.style.backgroundImage = 'url(' + imgUrl + ')';
        } else {
            var video = document.createElement('video');
            video.controls = true;
            video.src = urlCreator.createObjectURL(req.response);
            elem.appendChild(video); // Append the video since we can't do a background-video
        }

        // Finish the animation
        progressBarElem.animate(1, function () {
            // An SVG fallback is only needed for these types
            if((type === "ring" || type === "square")
                && !isIE // If it's not IE
                && elem.hasAttribute("data-ale-svgid")) { // If has its own SVG
                
                // If the variable isn't set yet
                if(mySVG === undefined) {
                    // Set the variable to the SVG
                    mySVG = document.getElementById(elem.getAttribute("data-ale-svgid"));

                    // Also set the inner shape based on the type to make animating perform better
                    if(type === "ring") {
                        myInnerShape = mySVG.getElementsByTagName("ellipse")[0];
                        // Call the animation function with our given animation, duration, and easing
                        animate(animateCircleClipPath, transDur * 2, BezierEasing(0.42, 0.0, 1.00, 1.0));
                    } else {
                        myInnerShape = mySVG.getElementsByTagName("rect")[0];
                        // Call the animation function with our given animation, duration, and easing
                        animate(animateSquareClipPath, transDur, BezierEasing(0.42, 0.0, 1.00, 1.0));
                    }
                } 
            }

            // Add the "complete" class to show it's done 
            elem.classList.add("complete");
        });
    }
    
    // The start and end values for the ring animation
    var rStartXVal = 0.074, 
        rStartYVal = 0.111,
        rEndXVal = 1,
        rEndYVal = 1.5,
        rDiffXVal = rEndXVal - rStartXVal,
        rDiffYVal = rEndYVal - rStartYVal;

    function animateCircleClipPath(p) { // p move from 0 to 1
        // Animate the rx and ry of the ellipse with easing
        myInnerShape.setAttribute("rx", rStartXVal + p*rDiffXVal);
        myInnerShape.setAttribute("ry", rStartYVal + p*rDiffYVal);
    }

    // The start and end values for the square animation
    var sStartXVal = 0.4255, 
        sStartYVal = 0.387,
        sStartWVal = 0.149,
        sStartHVal = 0.225,
        // We want it to take up the full object when it's done
        sEndXVal = 0,
        sEndYVal = 0,
        sEndWVal = 1,
        sEndHVal = 1,
        sDiffXVal = sEndXVal - sStartXVal,
        sDiffYVal = sEndYVal - sStartYVal,
        sDiffWVal = sEndWVal - sStartWVal,
        sDiffHVal = sEndHVal - sStartHVal;

    function animateSquareClipPath(p) { // p move from 0 to 1
        // Animate the rx and ry of the ellipse with easing
        myInnerShape.setAttribute("x", sStartXVal + p*sDiffXVal);
        myInnerShape.setAttribute("y", sStartYVal + p*sDiffYVal);
        myInnerShape.setAttribute("width", sStartWVal + p*sDiffWVal);
        myInnerShape.setAttribute("height", sStartHVal + p*sDiffHVal);
    }
}

var transDur = 500;
// Our animation function that uses RAF to animate as smoothly as possible
function animate(render, duration, easing) {
    // Render the initial state for Safari
    var start = Date.now();
    var pinit = (Date.now() - start) / duration;
    render(easing(pinit));
    
    // Delay our animation by the transition duration to get the same effect as in Chrome
    setTimeout(function() {
        // Animate using the given function as smoothly as possible in the duration given
        // using the given easing
        start = Date.now();
        (function loop() {
            var p = (Date.now() - start) / duration;
            if (p > 1) {
                render(1);
            } else {
                requestAnimationFrame(loop);
                render(easing(p));
            }
        }());
    }, transDur); // Delay the clip path animation until the ring is faded out
}

function createCircleSVG() {
    // Create the SVG element and set its attributes
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttributeNS(null, 'width', '0');
    svg.setAttributeNS(null, 'height', '0');
    svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
    svg.setAttributeNS(null, "id", "circleSVG" + count);

    // Create the inner elements and give them the proper attributes
    var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

    var clipPath = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
    clipPath.setAttribute("clipPathUnits", "objectBoundingBox");
    clipPath.setAttribute("id", "clipPath" + count);

    var ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    ellipse.setAttribute("cx", "0.5");
    ellipse.setAttribute("cy", "0.5");
    ellipse.setAttribute("rx", "0.074");
    ellipse.setAttribute("ry", "0.111");

    clipPath.appendChild(ellipse);

    defs.appendChild(clipPath);

    svg.appendChild(defs);

    document.body.appendChild(svg);

    // Return the number in the ID for reference
    return count++;
}

function createSquareSVG() {
    // Create the SVG element and set its attributes
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttributeNS(null, 'width', '0');
    svg.setAttributeNS(null, 'height', '0');
    svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
    svg.setAttributeNS(null, "id", "squareSVG" + count);

    // Create the inner elements and give them the proper attributes
    var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

    var clipPath = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
    clipPath.setAttribute("clipPathUnits", "objectBoundingBox");
    clipPath.setAttribute("id", "clipPath" + count);

    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("width", "0.149");
    rect.setAttribute("height", "0.225");
    rect.setAttribute("x", "0.4255");
    rect.setAttribute("y", "0.387");

    clipPath.appendChild(rect);

    defs.appendChild(clipPath);

    svg.appendChild(defs);

    document.body.appendChild(svg);

    // Return the number in the ID for reference
    return count++;
}
