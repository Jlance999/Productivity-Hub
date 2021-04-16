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