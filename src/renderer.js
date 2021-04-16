const { app, BrowserWindow, remote } = require('electron');
const path = require('path');

//const win = app.getCurrentWindow(); /* Note this is different to the
//html global `window` variable */

// When document has loaded, initialise
document.onreadystatechange = (event) => {
    if (document.readyState == "complete") {
        handleWindowControls();
    }
};

/*window.onbeforeunload = (event) => {
    /* If window is reloaded, remove win event listeners
    (DOM element listeners get auto garbage collected but not
    Electron win listeners as the win is not dereferenced unless closed) 
    window.removeAllListeners();
}
*/

function handleWindowControls() {
    // Make minimise/maximise/restore/close buttons work when they are clicked
    document.getElementById('min-btn').addEventListener("click", event => {
        console.log("Minimizing Window");
        remote.BrowserWindow.getFocusedWindow().minimize();
    });

    document.getElementById('max-btn').addEventListener("click", event => {
        console.log("Maximizing Window");
        remote.BrowserWindow.getFocusedWindow().isMaximized() ? remote.BrowserWindow.getFocusedWindow().unmaximize() : remote.BrowserWindow.getFocusedWindow().maximize();
    });

    /*document.getElementById('restore-button').addEventListener("click", event => {
        console.log("hi");
        win.unmaximize();
    }); */

    document.getElementById('close-btn').addEventListener("click", event => {
        console.log("Closing Window");
        window.close();
    });

    // Make the DIV element draggable:
//dragElement(document.getElementById("applet"));

var draggableElements = document.getElementsByClassName("applet");

for(var i = 0; i < draggableElements.length; i++){
    dragElement(draggableElements[i]);
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
    return false;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
    /*let closebtn = document.getElementById('closebtn');
    closebtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.closeCurrentWindow();
      });*/

    // Toggle maximise/restore buttons when maximisation/unmaximisation occurs
    /*toggleMaxRestoreButtons();
    window.on('maximize', toggleMaxRestoreButtons);
    window.on('unmaximize', toggleMaxRestoreButtons);

    function toggleMaxRestoreButtons() {
        if (window.isMaximized()) {
            document.body.classList.add('maximized');
        } else {
            document.body.classList.remove('maximized');
        }
    }*/
}