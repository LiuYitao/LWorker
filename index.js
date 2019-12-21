const {BrowserWindow} = require('electron').remote;
const path = require('path');
$(() => {


    const newWindowBtn = document.getElementById('historicalBtn');
    // let historicalTaskWin;
    // newWindowBtn.addEventListener('click', (event) => {
    //     if (historicalTaskWin) {
    //         historicalTaskWin.show();
    //         return;
    //     }
    //     const modalPath = path.join('file://', __dirname, 'historicalTask.html');
    //     historicalTaskWin = new BrowserWindow({frame: false});
    //
    //     historicalTaskWin.on('close', () => {
    //         historicalTaskWin = null
    //     });
    //     historicalTaskWin.loadURL(modalPath);
    //     historicalTaskWin.show();
    // });
    let $menuDiv = $("#menuDiv");
    let $showMenuBtn = $("#showMenuBtn");
    $showMenuBtn.click(() => {
        $menuDiv.removeClass("d-none");
        $menuDiv.addClass("position-fixed");
        $menuDiv.addClass("opc");
        $showMenuBtn.removeClass("d-block");
        $showMenuBtn.addClass("d-none");
        $menuDiv.on("mouseout", () => {
            setTimeout(() => {
                $menuDiv.addClass("d-none");
                $menuDiv.removeClass("position-fixed");
                $menuDiv.removeClass("opc");
                $showMenuBtn.addClass("d-block");
                $showMenuBtn.removeClass("d-none");
                $menuDiv.off("mouseout");
            }, 322);
        });
    });
});
